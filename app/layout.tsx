import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Weltek Limited | EPC Company in Nigeria",
    template: "%s | Weltek Limited",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "EPC company in Nigeria",
    "Engineering Procurement and Construction Nigeria",
    "Oil and Gas EPC contractor Nigeria",
    "Instrumentation and Electrical contractor Nigeria",
    "Power systems contractor Nigeria",
    "Automation services Nigeria",
    "Brownfield rejuvenation Nigeria",
    "Offshore topside facilities contractor",
    "Wellhead control panels Nigeria",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: site.url,
    siteName: site.name,
    title: "Weltek Limited | EPC Company in Nigeria",
    description: site.description,
    images: [{ url: "/images/og-default.svg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weltek Limited | EPC Company in Nigeria",
    description: site.description,
    images: ["/images/og-default.svg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0e2a3b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-surface">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <OrganizationJsonLd />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
