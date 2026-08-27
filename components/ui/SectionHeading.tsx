import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "onLight",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "onLight" | "onDark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-3 text-bronze", tone === "onDark" && "text-gold")}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-[1.9rem] sm:text-section",
          tone === "onDark" && "text-white"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 text-body leading-relaxed",
            tone === "onDark" ? "text-white/75" : "text-steel"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
