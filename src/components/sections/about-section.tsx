"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Layers3,
  Search,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { type MouseEvent } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SnapSection } from "./snap-section";

type AboutSectionProps = {
  onNavigate: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
  playKey: number;
};

const credibilityPointKeys = ["point1", "point2", "point3", "point4"] as const;
const credibilityPointIcons: LucideIcon[] = [
  ShieldCheck,
  Factory,
  Building2,
  CheckCircle2,
];

const processStepKeys = ["step1", "step2", "step3", "step4"] as const;
const processStepIcons: LucideIcon[] = [Search, Layers3, Wrench, CheckCircle2];

export function AboutSection({ onNavigate, playKey }: AboutSectionProps) {
  const t = useTranslations("ScrollSnap.sections.section3");
  const reduceMotion = useReducedMotion();

  return (
    <SnapSection id="about" tone="about" className="h-auto min-h-screen">
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

      <SiteShell className="relative flex w-full items-start py-24 sm:py-28">
        <motion.div
          key={`about-shell-${playKey}`}
          initial={
            reduceMotion || playKey === 0
              ? false
              : { opacity: 0, x: 240, y: 22 }
          }
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const }
          }
          className="w-full rounded-[2rem] border border-border/70 bg-background-elevated/80 p-6 shadow-panel backdrop-blur-xl will-change-transform lg:p-7"
        >
          <div className="max-w-[46rem]">
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-primary/78">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-[2.35rem] font-semibold leading-[0.95] tracking-[-0.055em] text-foreground sm:text-[2.8rem] xl:text-[3.05rem]">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-[42rem] text-[0.98rem] leading-7 text-foreground/72">
              {t("intro")}
            </p>
          </div>

          <div className="mt-8">
            <div className="rounded-[1.45rem] border border-border/70 bg-surface/72 p-5 shadow-soft sm:p-6">
              <p className="text-[1.02rem] font-semibold tracking-[-0.02em] text-foreground">
                {t("credibility.title")}
              </p>
              <p className="mt-3 max-w-[50rem] text-[0.92rem] leading-7 text-foreground/70">
                {t("credibility.body")}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {credibilityPointKeys.map((pointKey, index) => {
                  const Icon = credibilityPointIcons[index];

                  return (
                    <div
                      key={pointKey}
                      className="flex gap-3 rounded-[1.05rem] border border-border/65 bg-white/84 px-3.5 py-3"
                    >
                      <div className="rounded-full bg-primary/6 p-2 text-primary/72 h-fit">
                        <Icon className="size-3.5" aria-hidden />
                      </div>
                      <p className="text-[0.82rem] font-medium leading-6 text-foreground/76">
                        {t(`credibility.points.${pointKey}`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-[1.45rem] border border-border/70 bg-surface/66 p-5 shadow-soft sm:p-6">
              <p className="text-[0.96rem] font-semibold tracking-[-0.02em] text-foreground">
                {t("process.title")}
              </p>
              <p className="mt-2 max-w-[49rem] text-[0.9rem] leading-7 text-foreground/70">
                {t("process.description")}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {processStepKeys.map((stepKey, index) => {
                  const Icon = processStepIcons[index];

                  return (
                    <div
                      key={stepKey}
                      className="rounded-[1.1rem] border border-border/65 bg-background/74 p-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex size-7 items-center justify-center rounded-full border border-border/70 bg-white/90 text-[0.73rem] font-semibold text-primary">
                          {index + 1}
                        </span>
                        <div className="rounded-full bg-primary/6 p-1.5 text-primary/72">
                          <Icon className="size-3.5" aria-hidden />
                        </div>
                        <p className="text-[0.89rem] font-semibold tracking-[-0.02em] text-foreground">
                          {t(`process.${stepKey}.title`)}
                        </p>
                      </div>
                      <p className="mt-2 text-[0.83rem] leading-6 text-foreground/70">
                        {t(`process.${stepKey}.description`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-start border-t border-border/70 pt-5 sm:justify-end">
            <a
              href="#contact"
              onClick={onNavigate("#contact")}
              className={cn(
                buttonVariants({ variant: "primary" }),
                "h-11 px-6 text-[0.76rem] font-semibold uppercase tracking-[0.2em]",
              )}
            >
              {t("ctaLabel")}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </motion.div>
      </SiteShell>
    </SnapSection>
  );
}
