"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNav, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 safe-px bg-surface transition-colors duration-200",
        scrolled || open ? "border-b border-border" : "border-b border-transparent"
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative py-2 text-[0.9rem] font-medium transition-colors",
                isActive(item.href)
                  ? "text-navy"
                  : "text-steel hover:text-navy"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] bg-bronze" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Button href={site.capabilityStatement} download variant="secondary">
            Capability Statement
          </Button>
          <Button href="/contact" variant="primary">
            Request a Proposal
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center xl:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute left-0 block h-[2px] w-6 bg-navy transition-all duration-200",
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 block h-[2px] w-6 -translate-y-1/2 bg-navy transition-opacity duration-200",
                open ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-[2px] w-6 bg-navy transition-all duration-200",
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              )}
            />
          </span>
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] z-40 xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-navy/40 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <nav
          aria-label="Mobile"
          className={cn(
            "absolute inset-0 flex flex-col bg-surface transition-transform duration-200",
            open ? "translate-y-0" : "-translate-y-4 opacity-0"
          )}
        >
          <div className="flex-1 overflow-y-auto px-5 py-2">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-[56px] items-center border-b border-border text-[1.1rem] font-medium",
                  isActive(item.href) ? "text-bronze" : "text-navy"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="safe-pb grid gap-3 border-t border-border bg-surface-alt px-5 py-4">
            <Button
              href="/contact"
              variant="primary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Request a Proposal
            </Button>
            <Button
              href={site.capabilityStatement}
              download
              variant="secondary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Download Capability Statement
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
