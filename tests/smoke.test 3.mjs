/**
 * Smoke tests against a running build.
 *
 *   npm run test           builds, serves, tests, tears down
 *   BASE_URL=... npm run test:only    tests an already-running origin
 *
 * Uses node:test so the project gains no dependency. These are deliberately
 * not unit tests: every case here guards a defect this site has actually
 * shipped, which is a better use of the effort than coverage for its own sake.
 */
import { test, describe, before } from "node:test";
import assert from "node:assert/strict";

const BASE = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");

const PAGES = [
  "/", "/about", "/services", "/projects", "/industries",
  "/hse-quality", "/careers", "/contact", "/vendors",
];
const SERVICES = [
  "offshore-topside-facilities", "brownfield-rejuvenation", "power-systems",
  "instrumentation-electrical", "automation", "wellhead-control-panels",
];
const PROJECTS = [
  "ebendo-integrated-metering-system", "wellhead-control-panels-oml-111-65",
  "cawthorne-channel-flow-station-revamp", "topsides-facilities-snepco",
  "lekki-power-system-upgrade", "wellhead-control-panel-asasa-va",
  "cao-scada-instrumentation-system", "gph-33kva-power-supply",
];
const ALL = [...PAGES, ...SERVICES.map(s => `/services/${s}`), ...PROJECTS.map(p => `/projects/${p}`)];

const get = (path, init) => fetch(`${BASE}${path}`, init);
const text = async (path) => (await get(path)).text();

before(async () => {
  const res = await get("/").catch(() => null);
  if (!res?.ok) throw new Error(`No server at ${BASE}. Start one, or use npm run test.`);
});

describe("routing", () => {
  for (const path of ALL) {
    test(`200 ${path}`, async () => {
      assert.equal((await get(path)).status, 200);
    });
  }

  test("unknown URL returns a real 404, not a soft 200", async () => {
    assert.equal((await get("/no-such-page-xyz")).status, 404);
  });

  test("trailing slash redirects to the canonical path", async () => {
    const res = await get("/about/", { redirect: "manual" });
    assert.equal(res.status, 308);
  });
});

describe("content integrity", () => {
  test("no unfinished [CONFIRM] placeholder reaches any page", async () => {
    for (const path of ALL) {
      assert.ok(!(await text(path)).includes("[CONFIRM]"), `[CONFIRM] leaked on ${path}`);
    }
  });

  test("tenure claim is derived, never a stale literal", async () => {
    const html = await text("/");
    assert.ok(!/30\+ year|thirty years|three decades/i.test(html), "stale tenure claim is back");
  });

  test("stat figures are in the HTML before JavaScript runs", async () => {
    // Regression guard: these once server-rendered as 0 and 0+.
    const html = await text("/");
    const strip = html.slice(html.lastIndexOf("<section", html.indexOf("Years of delivery")));
    for (const fig of ["100+", "850+"]) {
      assert.ok(strip.includes(`>${fig}<`), `stat ${fig} missing from server HTML`);
    }
    assert.ok(!/>0\+</.test(strip), "a stat is server-rendering as zero again");
  });

  test("homepage content is not hidden behind JavaScript", async () => {
    // Regression guard: Reveal once shipped opacity-0, hiding 37% of the page.
    const html = await text("/");
    const body = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, "");
    assert.ok(
      !/transition-\[opacity,translate\]/.test(body),
      "Reveal is server-rendering its animated state again"
    );
  });
});

describe("assets clients actually download", () => {
  test("capability statement is reachable and is not an empty file", async () => {
    const res = await get("/weltek-capability-statement.pdf");
    assert.equal(res.status, 200);
    const size = (await res.arrayBuffer()).byteLength;
    // The placeholder was 830 bytes with no text. A real statement is far larger.
    assert.ok(size > 20_000, `capability statement is only ${size} bytes: still a placeholder?`);
  });

  test("Open Graph image exists and is a real raster", async () => {
    const res = await get("/images/og-default.jpg");
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") || "", /image\/jpeg/);
  });

  test("framework boilerplate is not served", async () => {
    for (const f of ["/next.svg", "/vercel.svg", "/file.svg", "/globe.svg", "/window.svg"]) {
      assert.equal((await get(f)).status, 404, `${f} is public again`);
    }
  });
});

describe("SEO", () => {
  test("every page has a unique title and a description", async () => {
    const titles = new Set();
    for (const path of ALL) {
      const html = await text(path);
      const title = html.match(/<title[^>]*>([^<]*)</)?.[1];
      assert.ok(title, `no title on ${path}`);
      assert.ok(!titles.has(title), `duplicate title on ${path}: ${title}`);
      titles.add(title);
      assert.match(html, /name="description"/, `no description on ${path}`);
      assert.match(html, /rel="canonical"/, `no canonical on ${path}`);
    }
  });

  test("exactly one h1 per page", async () => {
    for (const path of ALL) {
      const count = ((await text(path)).match(/<h1[\s>]/g) || []).length;
      assert.equal(count, 1, `${path} has ${count} h1 elements`);
    }
  });

  test("sitemap lists every public route", async () => {
    const xml = await text("/sitemap.xml");
    for (const path of ALL) {
      const suffix = path === "/" ? "" : path;
      assert.ok(xml.includes(`${suffix}</loc>`), `sitemap is missing ${path}`);
    }
  });

  test("detail pages carry BreadcrumbList structured data", async () => {
    const html = await text("/services/automation");
    assert.ok(html.includes("BreadcrumbList"), "breadcrumb schema missing");
  });
});

describe("security headers", () => {
  const REQUIRED = [
    "content-security-policy",
    "x-frame-options",
    "x-content-type-options",
    "referrer-policy",
    "permissions-policy",
  ];
  test("all protective headers are present", async () => {
    const res = await get("/");
    for (const h of REQUIRED) {
      assert.ok(res.headers.get(h), `missing header: ${h}`);
    }
  });
});

describe("contact endpoint", () => {
  const post = (body, headers = {}) =>
    get("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });

  // A distinct address per case keeps the rate limiter out of the way.
  const ip = (n) => ({ "x-forwarded-for": `203.0.113.${n}` });

  test("rejects malformed JSON", async () => {
    const res = await get("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...ip(21) },
      body: "not json",
    });
    assert.equal(res.status, 400);
  });

  test("rejects a submission that fails validation", async () => {
    const res = await post({ name: "a", email: "bad", message: "x" }, ip(22));
    assert.equal(res.status, 422);
  });

  test("rejects an over-long message", async () => {
    const res = await post({ name: "Test", email: "a@b.co", message: "x".repeat(6000) }, ip(23));
    assert.equal(res.status, 422);
  });

  test("rejects an oversized body before parsing it", async () => {
    const res = await post({ name: "Test", email: "a@b.co", message: "x".repeat(200_000) }, ip(24));
    assert.equal(res.status, 413);
  });

  test("rate limits a burst from one address", async () => {
    const codes = [];
    for (let i = 0; i < 7; i++) {
      codes.push((await post({ name: "Burst Test", email: "a@b.co", message: "a valid message" }, ip(25))).status);
    }
    assert.ok(codes.includes(429), `expected a 429 in ${codes.join(",")}`);
  });

  test("honeypot is accepted silently rather than erroring", async () => {
    const res = await post(
      { company_website: "bot", name: "Bot", email: "b@o.t", message: "spam spam spam" },
      ip(26)
    );
    assert.equal(res.status, 200);
  });
});
