import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

/** Five submissions per address per ten minutes. Generous for a human. */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

/** Reject oversized bodies before parsing rather than after. */
const MAX_BODY_BYTES = 32 * 1024;

/**
 * Per-field caps. Without these a single request can carry megabytes into the
 * outbound email. 254 on email is the RFC 5321 maximum.
 */
const MAX = {
  name: 120,
  email: 254,
  message: 5000,
  other: 200,
} as const;

// Simple email shape check. Server-side validation is the source of truth;
// the client form validates too, but never trust the client.
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = Record<string, string | undefined> & {
  formType?: string;
  company_website?: string; // honeypot
  name?: string;
  email?: string;
  message?: string;
};

const FORM_LABELS: Record<string, string> = {
  general: "General / Project enquiry",
  careers: "Careers application",
  vendor: "Vendor / Partner registration",
};

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const limited = rateLimit(clientKey(request), { limit: LIMIT, windowMs: WINDOW_MS });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many messages from this address. Please try again shortly, or email info@weltekng.com." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
    );
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "That message is too long." }, { status: 413 });
  }

  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();

  const errors: string[] = [];
  if (name.length < 2) errors.push("A name is required.");
  if (name.length > MAX.name) errors.push("That name is too long.");
  if (!emailRe.test(email)) errors.push("A valid email is required.");
  if (email.length > MAX.email) errors.push("That email address is too long.");
  if (message.length < 10) errors.push("Please include a short message.");
  if (message.length > MAX.message)
    errors.push(`Please keep the message under ${MAX.message} characters.`);
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  const formType = data.formType && FORM_LABELS[data.formType] ? data.formType : "general";

  // Assemble the detail rows from the known fields for this form type.
  const rowKeys = [
    "name",
    "email",
    "phone",
    "organisation",
    "enquiryType",
    "service",
    "roleFamily",
    "category",
  ];
  const rows = rowKeys
    .filter((k) => (data[k] || "").trim())
    .map((k) => {
      const v = String(data[k]).trim();
      return [k, v.length > MAX.other ? `${v.slice(0, MAX.other)}...` : v] as const;
    })
    .map(([k, v]) => ({ k, v }))
    .map(
      ({ k, v }) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6b7a82;text-transform:capitalize">${k}</td><td style="padding:4px 0;color:#14232e">${esc(v)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px">
      <p style="font-weight:bold;color:#0e2a3b">New ${FORM_LABELS[formType]} from weltekng.com</p>
      <table style="border-collapse:collapse;margin:12px 0">${rows}</table>
      <p style="color:#6b7a82;margin:0 0 4px">Message</p>
      <p style="color:#14232e;white-space:pre-wrap">${esc(message)}</p>
    </div>`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "info@weltekng.com";
  // Must be a verified sender/domain in Resend. Placeholder until configured.
  const from = process.env.CONTACT_FROM || "Weltek Website <onboarding@resend.dev>";

  if (!apiKey) {
    // Fail loudly and honestly rather than silently dropping the message.
    console.error("[contact] RESEND_API_KEY is not set. Message NOT sent:", {
      formType,
      name,
      email,
    });
    return NextResponse.json(
      { error: "Our contact service is being configured. Please email info@weltekng.com in the meantime." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[${FORM_LABELS[formType]}] ${name.replace(/[\r\n]+/g, " ")}`,
      html,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "We could not send your message. Please try again or email info@weltekng.com." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "We could not send your message. Please try again later." },
      { status: 500 }
    );
  }
}
