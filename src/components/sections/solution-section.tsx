"use client";

import {
  ArrowRight,
  Building2,
  Droplets,
  Flame,
  Leaf,
  ShieldCheck,
  Wind,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { type MouseEvent } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { BeforeAfterSlider } from "./before-after-slider";
import { SnapSection } from "./snap-section";
import { useSectionInView } from "./use-section-in-view";

type SolutionSectionProps = {
  onNavigate: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
};

const valueCardKeys = [
  "benefit1",
  "benefit2",
  "benefit3",
  "benefit4",
  "technical2",
  "technical3",
] as const;
const valueCardIcons = [
  Flame,
  Wind,
  Droplets,
  Building2,
  Leaf,
  ShieldCheck,
] as const;

const BEFORE_IMAGE = {
  src: "/before.png",
} as const;

const AFTER_IMAGE = {
  src: "/after.png",
} as const;

export function SolutionSection({ onNavigate }: SolutionSectionProps) {
  const t = useTranslations("ScrollSnap.sections.section2");
  const reduceMotion = useReducedMotion();
  const { isInView, sectionRef } = useSectionInView({ threshold: 0.35 });

  const leftCardTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const };

  const rightCardTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <SnapSection id="solution" tone="about">
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
        <div
          ref={sectionRef}
          className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)] lg:items-stretch xl:gap-10"
        >
          <div className="h-full">
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -180,
                      y: 26,
                      scale: 0.97,
                      filter: "blur(10px)",
                    }
              }
              animate={
                isInView || reduceMotion
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }
                  : undefined
              }
              transition={leftCardTransition}
              className="flex h-full flex-col rounded-[2rem] border border-border/70 bg-background-elevated/80 p-6 shadow-panel backdrop-blur-xl lg:p-7"
            >
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-primary/78">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 max-w-[34rem] text-[2.45rem] font-semibold leading-[0.94] tracking-[-0.056em] text-foreground sm:text-[2.85rem] xl:text-[3.15rem]">
                {t("title")}
              </h2>

              <div className="mt-5 max-w-[32rem] space-y-4 text-[0.98rem] leading-7 text-foreground/82">
                <p>{t("problem")}</p>
                <p>{t("product")}</p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {valueCardKeys.map((key, index) => {
                  const Icon = valueCardIcons[index];

                  return (
                    <div
                      key={key}
                      className="rounded-[1.35rem] border border-border/70 bg-surface/74 p-4 shadow-soft"
                    >
                      <div className="rounded-full bg-primary/6 p-2 text-primary/72 w-fit">
                        <Icon className="size-4" aria-hidden />
                      </div>
                      <p className="mt-2 text-[0.95rem] font-semibold tracking-[-0.02em] text-foreground">
                        {t(`${key}.title`)}
                      </p>
                      <p className="mt-1 text-[0.84rem] leading-6 text-foreground/68">
                        {t(`${key}.description`)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-7">
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
          </div>

          <div className="relative min-h-0">
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 180,
                      y: 26,
                      scale: 0.97,
                      filter: "blur(10px)",
                    }
              }
              animate={
                isInView || reduceMotion
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }
                  : undefined
              }
              transition={rightCardTransition}
              className="flex h-full min-h-0 flex-col rounded-[2.1rem] border border-border/70 bg-white/94 p-5 shadow-panel lg:p-6"
            >
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-primary/78">
                {t("comparisonEyebrow")}
              </p>
              <h3 className="mt-2 text-[1.24rem] font-semibold tracking-[-0.03em] text-foreground sm:text-[1.4rem]">
                {t("comparisonTitle")}
              </h3>
              <p className="mt-2 max-w-[27rem] text-[0.88rem] leading-6 text-foreground/68">
                {t("comparisonHelper")}
              </p>

              <BeforeAfterSlider
                className="mt-5 flex-1 min-h-[20rem] aspect-auto sm:min-h-[24rem]"
                before={{
                  ...BEFORE_IMAGE,
                  alt: t("comparisonBeforeAlt"),
                }}
                after={{
                  ...AFTER_IMAGE,
                  alt: t("comparisonAfterAlt"),
                }}
                beforeLabel={t("comparisonWithoutLabel")}
                afterLabel={t("comparisonWithLabel")}
                ariaLabel={t("comparisonAriaLabel")}
                keyboardHint={t("comparisonKeyboardHint")}
              />
            </motion.div>
          </div>
        </div>
      </SiteShell>
    </SnapSection>
  );
}
