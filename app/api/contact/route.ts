import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

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
  if (!emailRe.test(email)) errors.push("A valid email is required.");
  if (message.length < 10) errors.push("Please include a short message.");
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
    .map(
      (k) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6b7a82;text-transform:capitalize">${k}</td><td style="padding:4px 0;color:#14232e">${esc(String(data[k]))}</td></tr>`
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
      subject: `[${FORM_LABELS[formType]}] ${name}`,
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
