import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { footerNav, site } from "@/lib/site";
import { services } from "@/content/services";

export function Footer() {
  // Derived at build time. A literal here silently goes wrong every January.
  const year = new Date().getFullYear();
  const company = footerNav.find((c) => c.title === "Company");

  return (
    <footer className="safe-px tech-grid relative mt-auto bg-navy-900 text-white/80">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_0.9fr_1.3fr]">
          {/* Brand + capability CTA */}
          <div>
            <Logo tone="onDark" tagline={false} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
              A Nigerian EPC company delivering offshore, onshore and swamp
              projects for the oil and gas, power and process industries to a
              global standard.
            </p>
            <a
              href={site.capabilityStatement}
              download
              className="mt-7 inline-flex items-center gap-2 border border-border-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-bronze hover:text-gold"
            >
              Download Capability Statement
              <span aria-hidden>↓</span>
            </a>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="eyebrow text-white/60">Services</h2>
            <ul className="mt-5 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex min-h-[28px] items-center text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          {company && (
            <nav aria-label="Company">
              <h2 className="eyebrow text-white/60">Company</h2>
              <ul className="mt-5 space-y-1">
                {company.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[28px] items-center text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/projects"
                    className="inline-flex min-h-[28px] items-center text-sm text-white/70 transition-colors hover:text-white"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industries"
                    className="inline-flex min-h-[28px] items-center text-sm text-white/70 transition-colors hover:text-white"
                  >
                    Industries
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          {/* Contact */}
          <div>
            <h2 className="eyebrow text-white/60">Contact</h2>
            <ul className="mt-5 space-y-5 text-sm">
              {site.offices.map((office) => (
                <li key={office.label}>
                  <p className="font-semibold text-white">{office.label}</p>
                  <address className="mt-1 not-italic leading-relaxed text-white/65">
                    {office.lines.join(", ")}
                  </address>
                  <p className="mt-1 text-white/65">{office.phones.join(" · ")}</p>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-gold transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border-dark pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Weltek Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <Link href="/vendors" className="transition-colors hover:text-white">
              Vendors &amp; Partners
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
