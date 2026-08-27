"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

type Variant = "general" | "careers" | "vendor";

const roleFamilies = [
  "Engineering",
  "Project Management",
  "Procurement",
  "Field / Construction",
  "HSE",
  "Instrumentation & Electrical",
  "Automation",
  "Administration",
];

const vendorCategories = [
  "Equipment & Materials",
  "Instrumentation & Electrical",
  "Fabrication",
  "Logistics",
  "Inspection & Testing",
  "Other Services",
];

const enquiryTypes = ["Project enquiry", "Vendor / Partner", "General enquiry"];

const inputBase =
  "w-full rounded-card border border-border-strong bg-surface px-4 py-3.5 text-[16px] text-ink " +
  "transition-colors placeholder:text-graphite hover:border-graphite " +
  "focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/30";
const labelBase = "mb-2 block text-sm font-semibold text-navy";
const req = <span className="text-bronze"> *</span>;

export function ContactForm({ variant = "general" }: { variant?: Variant }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const confirmationRef = useRef<HTMLDivElement | null>(null);

  // The form unmounts on success, so focus would otherwise fall to <body> and
  // the confirmation would never be announced. Move focus to it instead.
  useEffect(() => {
    if (status === "ok") confirmationRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // The honeypot is checked server-side only. Short-circuiting here showed
    // "Message received" without ever calling the API, so if a password
    // manager or an aggressive autofill ever populated a field named
    // company_website, a real enquiry would be discarded while the sender was
    // told it had arrived. Let the server decide; it already handles this.
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: variant, ...data }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <div
        ref={confirmationRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="border border-border bg-surface-alt p-8 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze"
      >
        <p className="font-heading text-lg font-bold text-navy">Message received</p>
        <p className="mt-2 text-sm text-steel">
          Thank you. A member of the Weltek team will be in touch shortly. For
          urgent enquiries, call the numbers listed on this page.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-bronze hover:text-bronze-strong"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      {/* Honeypot */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Do not fill this field</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            {variant === "careers" ? "Full name" : "Contact name"}
            {req}
          </label>
          <input id="name" name="name" required autoComplete="name" className={inputBase} />
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            Email
            {req}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            className={inputBase}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {variant !== "careers" && (
          <div>
            <label htmlFor="organisation" className={labelBase}>
              Company / Organisation
            </label>
            <input
              id="organisation"
              name="organisation"
              autoComplete="organization"
              className={inputBase}
            />
          </div>
        )}
        <div>
          <label htmlFor="phone" className={labelBase}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputBase}
          />
        </div>
      </div>

      {variant === "general" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="enquiryType" className={labelBase}>
              Enquiry type
            </label>
            <select id="enquiryType" name="enquiryType" className={inputBase} defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              {enquiryTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="service" className={labelBase}>
              Service of interest
            </label>
            <select id="service" name="service" className={inputBase} defaultValue="">
              <option value="">Not sure yet</option>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {variant === "careers" && (
        <div>
          <label htmlFor="roleFamily" className={labelBase}>
            Role family
          </label>
          <select id="roleFamily" name="roleFamily" className={inputBase} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {roleFamilies.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      )}

      {variant === "vendor" && (
        <div>
          <label htmlFor="category" className={labelBase}>
            Supply category
          </label>
          <select id="category" name="category" className={inputBase} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {vendorCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="message" className={labelBase}>
          {variant === "careers"
            ? "Tell us about your experience"
            : variant === "vendor"
              ? "What do you supply?"
              : "How can we help?"}
          {req}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(inputBase, "resize-y")}
        />
      </div>

      {variant === "careers" && (
        <p className="text-xs text-graphite">
          To include a CV, add a link to it in your message (for example a
          shared drive link).
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          className="rounded-card border-l-2 border-bronze bg-bronze/5 px-4 py-3 text-sm font-medium text-bronze-strong"
        >
          {errorMsg}
        </p>
      )}

      <div className="flex flex-col-reverse items-start gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-graphite">
          Fields marked <span className="text-bronze">*</span> are required.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-card bg-bronze px-8 text-small font-semibold text-white transition-[background-color,scale] duration-150 ease-out-strong hover:bg-bronze-strong active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending..." : "Send message"}
          {status !== "sending" && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}
