"use client";

import { useEffect, useRef, useState } from "react";
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

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * Make the drawer behave like the modal it looks like.
   *
   * Previously it was a visual overlay only: focus stayed on the body, all 41
   * focusable elements on the page behind stayed in the tab order, and Escape
   * did nothing. A keyboard or screen-reader user opening the menu tabbed
   * straight into content hidden behind the scrim.
   *
   * Rather than hand-roll a focus trap, the page behind is made inert. The
   * header row itself stays reachable on purpose: the drawer opens below it, so
   * the toggle is still visible and must remain operable to close the menu.
   */
  useEffect(() => {
    if (!open) return;

    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  /** Return focus to the control that opened it, but not on first mount. */
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 safe-px transition-shadow duration-200",
        scrolled || open
          ? "border-b border-border shadow-[0_10px_30px_-24px_rgba(14,42,59,0.5)]"
          : "border-b border-transparent"
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-surface backdrop-blur-md transition-colors duration-200"
      />
      <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-bronze" />
      {/* Tighter gutters at lg: the row needs 945px of a 960px container there,
          so 15px of slack is one longer nav label away from collapsing. From xl
          up there is 100px spare, so the roomier gap is kept. */}
      <Container className="flex h-[72px] items-center justify-between gap-4 xl:gap-6">
        <Logo tagline={false} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-9" aria-label="Primary">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex items-center whitespace-nowrap py-3 text-small font-medium tracking-[0.01em] transition-colors",
                  active ? "text-navy" : "text-steel hover:text-navy"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-bronze transition-transform duration-200 ease-out",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* One primary action only. A second desktop button pushed the row 31px
            past the 1200px container, squeezing the logo into the nav. */}
        <div className="hidden items-center lg:flex">
          <Button href="/contact" variant="primary">
            Request a Proposal
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          ref={toggleRef}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute left-0 top-0 block h-[2px] w-6 bg-navy transition-transform duration-200 ease-out-strong",
                open && "translate-y-[7px] rotate-45"
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
                "absolute bottom-0 left-0 block h-[2px] w-6 bg-navy transition-transform duration-200 ease-out-strong",
                open && "-translate-y-[7px] -rotate-45"
              )}
            />
          </span>
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-navy/40 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <nav
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
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
                  "flex min-h-[56px] items-center border-b border-border text-card font-medium",
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
