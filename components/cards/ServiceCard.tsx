import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";

export function ServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden border border-border bg-surface shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze",
        featured && "sm:col-span-2 sm:flex-row"
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden bg-navy",
          featured && "sm:aspect-auto sm:w-1/2"
        )}
      >
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 460px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <span className="absolute left-0 top-0 h-[3px] w-12 bg-bronze transition-all duration-300 group-hover:w-full" />
      </div>
      <div
        className={cn(
          "flex flex-1 flex-col p-6",
          featured && "sm:justify-center sm:p-9"
        )}
      >
        <p className="eyebrow text-bronze">{service.sector}</p>
        <h3 className="mt-2 text-card font-bold text-navy">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-steel">{service.short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-bronze">
          View capability
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
