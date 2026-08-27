"use client";

import { useEffect } from "react";

/**
 * Last resort. This replaces the root layout entirely, so it cannot use the
 * site's components, fonts or tokens: if the layout itself is what failed,
 * anything it provides is unavailable. Hence the inline styles and system
 * font stack. It should be plain, honest and always render.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error.digest ?? "(no digest)", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#071722",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontSize: "12px",
              fontWeight: 600,
              color: "#c6a052",
              margin: 0,
            }}
          >
            Weltek Limited
          </p>
          <h1
            style={{
              fontSize: "2rem",
              lineHeight: 1.1,
              margin: "16px 0 0",
              fontWeight: 650,
            }}
          >
            The site could not be loaded.
          </h1>
          <p style={{ margin: "18px 0 0", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
            Please try again. If it keeps happening, email{" "}
            <a href="mailto:info@weltekng.com" style={{ color: "#c68a52" }}>
              info@weltekng.com
            </a>
            .
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "28px",
              minHeight: "48px",
              padding: "0 24px",
              background: "#9c561f",
              color: "#fff",
              border: 0,
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {error.digest && (
            <p style={{ marginTop: "28px", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
              Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
