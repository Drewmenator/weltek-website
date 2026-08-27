import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Web app manifest. Not a PWA: there is no service worker and no offline
 * behaviour, and a corporate marketing site does not need either. This exists
 * so that a device saving the site to a home screen gets the Weltek mark and
 * name rather than a screenshot and a URL fragment.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#f6f4ef",
    theme_color: "#0e2a3b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
