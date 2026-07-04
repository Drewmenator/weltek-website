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
        "group flex flex-col overflow-hidden border border-border bg-surface transition-colors hover:border-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze",
        featured && "sm:col-span-2 sm:flex-row"
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden",
          featured && "sm:aspect-auto sm:w-1/2"
        )}
      >
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-0 top-0 h-[3px] w-0 bg-bronze transition-all duration-300 group-hover:w-full" />
      </div>
      <div className={cn("flex flex-1 flex-col p-6", featured && "sm:justify-center sm:p-8")}>
        <p className="overline text-bronze">{service.sector}</p>
        <h3 className="mt-2 text-[1.2rem] text-navy">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-steel">{service.short}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-bronze">
          View capability
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
