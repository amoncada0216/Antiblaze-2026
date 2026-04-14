"use client";

import { SiteShell } from "@/components/layout/site-shell";

import { SnapSection } from "./snap-section";

type EmptySectionProps = {
  id: string;
  isLast?: boolean;
  title: string;
  tone: "about" | "product" | "contact";
};

export function EmptySection({
  id,
  isLast = false,
  title,
  tone,
}: EmptySectionProps) {
  return (
    <SnapSection id={id} isLast={isLast} tone={tone}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(8,11,122,0.1),transparent_30%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[18%] h-52 w-52 rounded-full bg-white/26 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[22%] h-60 w-60 rounded-full bg-primary/8 blur-3xl"
      />

      <SiteShell className="relative flex h-full items-center py-24 sm:py-28">
        <div className="max-w-[67.2rem]">
          <h2 className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-8xl">
            {title}
          </h2>
        </div>
      </SiteShell>
    </SnapSection>
  );
}
