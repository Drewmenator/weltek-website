import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const year = 2026; // static build; update annually [CONFIRM cadence]
  return (
    <footer className="safe-px mt-auto bg-navy text-white/80">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo tone="onDark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              A Nigerian EPC company delivering offshore, onshore and swamp
              projects for the oil and gas, power and process industries to a
              global standard.
            </p>
            <a
              href={site.capabilityStatement}
              download
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-white"
            >
              Download Capability Statement
              <span aria-hidden>↓</span>
            </a>
          </div>

          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="overline text-white/50">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/75 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="overline text-white/50">Contact</h2>
            <ul className="mt-4 space-y-5 text-sm">
              {site.offices.map((office) => (
                <li key={office.label}>
                  <p className="font-semibold text-white">{office.label}</p>
                  <address className="mt-1 not-italic leading-relaxed text-white/70">
                    {office.lines.join(", ")}
                  </address>
                  <p className="mt-1 text-white/70">{office.phones.join(" · ")}</p>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-gold hover:text-white"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border-dark pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Weltek Limited. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
            <Link href="/vendors" className="hover:text-white">
              Vendors &amp; Partners
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
