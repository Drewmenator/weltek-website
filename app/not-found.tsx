import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="safe-px bg-navy text-white">
      <Container className="flex min-h-[70vh] flex-col justify-center py-24">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="mt-4 max-w-2xl text-[2rem] text-white sm:text-[2.8rem]">
          That page could not be found.
        </h1>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/80">
          The page may have moved or the link may be out of date. Use the links
          below, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            Back to home
          </Button>
          <Button href="/contact" variant="secondary" tone="onDark">
            Contact us
          </Button>
        </div>
        <nav aria-label="Site" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-border-dark pt-6">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/70 hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
