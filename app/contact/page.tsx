import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Request a Proposal from Weltek Nigeria",
  description:
    "Contact Weltek Limited in Port Harcourt, Nigeria. Request a proposal, discuss a project, or reach the team by phone or email. Offices in Port Harcourt and Texas.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's discuss your project"
        intro="Send us your scope and we will respond with the right engineering and field team. For proposals, project enquiries, vendor registration or careers, use the form or the details below."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-surface">
        <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:py-24">
          {/* Details */}
          <div>
            <h2 className="text-[1.4rem]">Our offices</h2>
            <div className="mt-6 space-y-8">
              {site.offices.map((office) => (
                <div key={office.label} className="border-t border-border pt-5">
                  <h3 className="overline text-bronze">{office.label}</h3>
                  <address className="mt-2 not-italic leading-relaxed text-navy">
                    {office.lines.join(", ")}
                  </address>
                  <p className="mt-2 text-steel">
                    {office.phones.map((p, i) => (
                      <span key={p}>
                        <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-bronze">
                          {p}
                        </a>
                        {i < office.phones.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
              <div className="border-t border-border pt-5">
                <h3 className="overline text-bronze">Email</h3>
                <p className="mt-2">
                  <a href={`mailto:${site.email}`} className="text-navy hover:text-bronze">
                    {site.email}
                  </a>
                </p>
                <h3 className="overline mt-5 text-bronze">LinkedIn</h3>
                <p className="mt-2">
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy hover:text-bronze"
                  >
                    /company/weltek-limited
                  </a>
                </p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 flex aspect-[16/10] items-center justify-center border border-dashed border-border bg-surface-alt text-center text-sm text-graphite">
              [CONFIRM] Embed map of Plot 307 Danjuma Drive,
              <br />
              Trans Amadi, Port Harcourt
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-[1.4rem]">Send a message</h2>
            <p className="mt-2 text-steel">
              Fields marked as required must be completed. We aim to respond
              within two business days.
            </p>
            <div className="mt-6">
              <ContactForm variant="general" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
