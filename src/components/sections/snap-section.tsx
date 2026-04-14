import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const sectionThemes = {
  home:
    "bg-[linear-gradient(180deg,var(--section-1-start)_0%,var(--section-1-end)_100%)] text-foreground",
  about:
    "bg-[linear-gradient(180deg,var(--section-2-start)_0%,var(--section-2-end)_100%)] text-foreground",
  product:
    "bg-[linear-gradient(180deg,var(--section-2-start)_0%,var(--section-2-end)_100%)] text-foreground",
  contact:
    "bg-[linear-gradient(180deg,var(--section-2-start)_0%,var(--section-2-end)_100%)] text-foreground",
} as const;

type SnapSectionTone = keyof typeof sectionThemes;

type SnapSectionProps = {
  children: ReactNode;
  className?: string;
  id: string;
  isLast?: boolean;
  tone: SnapSectionTone;
};

export function SnapSection({
  children,
  className,
  id,
  isLast = false,
  tone,
}: SnapSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex w-full items-center overflow-hidden snap-start",
        isLast ? "min-h-screen" : "h-screen snap-always",
        sectionThemes[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
