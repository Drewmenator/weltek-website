"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Route-level error boundary. Without this, a runtime error in any client
 * component shows Next's default screen in development and a blank page in
 * production. A visitor who hits a bug should still see a way forward and a
 * way to reach us, because on this site the whole point is getting in touch.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in Vercel's function logs. Swap for a monitoring service when
    // one is configured; the digest is what ties this to the server-side trace.
    console.error("[error-boundary]", error.digest ?? "(no digest)", error);
  }, [error]);

  return (
    <section className="safe-px bg-navy-900 text-white">
      <Container className="flex min-h-[70vh] flex-col justify-center py-24">
        <p className="eyebrow text-gold">Something went wrong</p>
        <h1 className="mt-4 max-w-2xl text-[2rem] text-white sm:text-title">
          That page could not be displayed.
        </h1>
        <p className="mt-5 max-w-xl text-lead leading-relaxed text-white/80">
          The problem has been logged. You can try again, or reach the team
          directly and we will pick it up from there.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button href="/contact" variant="secondary" tone="onDark">
            Contact Weltek
          </Button>
        </div>
        {error.digest && (
          <p className="mt-8 text-micro text-white/60">
            Reference: <span className="tnum">{error.digest}</span>
          </p>
        )}
      </Container>
    </section>
  );
}
