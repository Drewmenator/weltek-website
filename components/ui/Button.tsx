import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "onLight" | "onDark";

const base =
  "inline-flex items-center justify-center gap-2 min-h-[48px] px-6 text-[0.95rem] font-semibold rounded-[4px] " +
  "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-bronze focus-visible:ring-offset-surface disabled:opacity-60 disabled:pointer-events-none";

function styles(variant: Variant, tone: Tone) {
  if (variant === "primary") {
    return "bg-bronze text-white hover:bg-bronze-strong focus-visible:ring-offset-2";
  }
  if (variant === "secondary") {
    return tone === "onDark"
      ? "border border-white/60 text-white hover:bg-white/10"
      : "border border-navy/30 text-navy hover:bg-navy/[0.06]";
  }
  // ghost
  return tone === "onDark"
    ? "text-white hover:text-gold px-0 min-h-0"
    : "text-navy hover:text-bronze px-0 min-h-0";
}

type CommonProps = {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  tone = "onLight",
  className,
  children,
  download,
  target,
  rel,
  type = "button",
  ...rest
}: CommonProps & {
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
}) {
  const cls = cn(base, styles(variant, tone), className);

  if (href) {
    const external = href.startsWith("http") || Boolean(download);
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          download={download}
          target={target}
          rel={rel}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
