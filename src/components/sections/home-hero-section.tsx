"use client";

import { animate } from "motion";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, type MouseEvent } from "react";

import heroImage from "../../../public/hero.jpg";
import { SiteShell } from "@/components/layout/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

import { SnapSection } from "./snap-section";

type HomeHeroSectionProps = {
  onNavigate: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
};

function parseCounterValue(value: string) {
  const target = Number(value.replace(/[^\d]/g, ""));
  const suffix = value.replace(/[\d.,\s]/g, "");

  return {
    suffix,
    target,
  };
}

type AnimatedStatValueProps = {
  delay: number;
  locale: string;
  reduceMotion: boolean | null;
  value: string;
};

function AnimatedStatValue({
  delay,
  locale,
  reduceMotion,
  value,
}: AnimatedStatValueProps) {
  const { suffix, target } = parseCounterValue(value);
  const [displayValue, setDisplayValue] = useState(0);
  const prefersReducedMotion = Boolean(reduceMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const controls = animate(0, target, {
      delay,
      duration: 1.25,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => {
      controls.stop();
    };
  }, [delay, prefersReducedMotion, target]);

  return (
    <>
      {new Intl.NumberFormat(locale).format(
        prefersReducedMotion ? target : displayValue,
      )}
      {suffix}
    </>
  );
}

export function HomeHeroSection({ onNavigate }: HomeHeroSectionProps) {
  const t = useTranslations("ScrollSnap.sections.section1");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const heroStats = [
    {
      description: t("stats.stat1.description"),
      label: t("stats.stat1.label"),
      value: t("stats.stat1.value"),
    },
    {
      description: t("stats.stat2.description"),
      label: t("stats.stat2.label"),
      value: t("stats.stat2.value"),
    },
    {
      description: t("stats.stat3.description"),
      label: t("stats.stat3.label"),
      value: t("stats.stat3.value"),
    },
    {
      description: t("stats.stat4.description"),
      label: t("stats.stat4.label"),
      value: t("stats.stat4.value"),
    },
  ];

  const contentTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const };

  const imageTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <SnapSection id="home" tone="home">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={imageTransition}
        className="absolute inset-0"
      >
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={imageTransition}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,95,0.74)_0%,rgba(8,11,122,0.66)_24%,rgba(8,11,122,0.38)_46%,rgba(8,11,122,0.14)_62%,transparent_78%),linear-gradient(0deg,rgba(5,8,95,0.84)_0%,rgba(8,11,122,0.62)_16%,rgba(8,11,122,0.24)_34%,transparent_58%)]"
      />
      <motion.div
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ...imageTransition,
          delay: reduceMotion ? 0 : 0.08,
        }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(75,99,255,0.22),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(140,162,255,0.12),transparent_20%),radial-gradient(circle_at_78%_78%,rgba(8,11,122,0.22),transparent_28%),linear-gradient(180deg,rgba(7,11,28,0.04)_0%,rgba(7,11,28,0.28)_100%)]"
      />
      <motion.div
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          ...imageTransition,
          delay: reduceMotion ? 0 : 0.14,
        }}
        className="pointer-events-none absolute left-[58%] top-[14%] h-56 w-56 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          ...imageTransition,
          delay: reduceMotion ? 0 : 0.2,
        }}
        className="pointer-events-none absolute bottom-[8%] left-[10%] h-40 w-40 rounded-full bg-accent/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          ...imageTransition,
          delay: reduceMotion ? 0 : 0.26,
        }}
        className="pointer-events-none absolute -bottom-10 right-[8%] h-56 w-56 rounded-full bg-primary-soft/10 blur-3xl"
      />

      <SiteShell className="relative flex h-full items-center py-20 sm:py-24">
        <motion.div
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0, x: -18, scaleY: 0.84 }}
          animate={{ opacity: 1, x: 0, scaleY: 1 }}
          transition={{
            ...contentTransition,
            delay: reduceMotion ? 0 : 0.18,
          }}
          className="pointer-events-none absolute left-[-4%] top-1/2 h-[30rem] w-[34rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(7,12,82,0.34)_0%,rgba(7,12,82,0.18)_42%,transparent_74%)] blur-3xl"
        />
        <div className="flex h-full w-full items-center justify-start">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: reduceMotion
                  ? { staggerChildren: 0 }
                  : { delayChildren: 0.12, staggerChildren: 0.1 },
              },
            }}
            className="relative max-w-[54rem] pl-5 sm:pl-6 md:pl-8 lg:pl-6 xl:pl-8"
          >
            <motion.div
              aria-hidden
              variants={{
                hidden: { opacity: 0, y: 18, scaleY: 0.8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scaleY: 1,
                  transition: contentTransition,
                },
              }}
              className="absolute left-0 top-4 h-[76%] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.2)_58%,transparent_100%)]"
            />
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: contentTransition,
                },
              }}
              className="mt-7 max-w-[60rem] text-balance text-[3.55rem] font-semibold leading-[0.96] tracking-[-0.04em] text-primary-foreground drop-shadow-[0_18px_42px_rgba(7,11,28,0.34)] sm:mt-8 sm:text-[4.4rem] md:text-[5.15rem] lg:text-[6.35rem] 2xl:max-w-[66rem]"
            >
              <Image
                src={withBasePath("/antiblaze.svg")}
                alt={t("titleLogoAlt")}
                width={500}
                height={109}
                priority
                className="mr-3 inline-block h-[1.06em] w-auto align-[-0.08em] brightness-0 invert drop-shadow-[0_12px_30px_rgba(7,11,28,0.2)] sm:mr-4"
              />
              <span>{t("title")}</span>
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: contentTransition,
                },
              }}
              className="mt-10 max-w-[34.2rem] whitespace-pre-line text-[0.98rem] leading-[1.95] text-primary-foreground/88 sm:mt-11 sm:text-base xl:text-[1.05rem]"
            >
              {t.rich("description", {
                brand: (chunks) => (
                  <strong className="font-semibold text-primary-foreground">
                    {chunks}
                  </strong>
                ),
              })}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: contentTransition,
                },
              }}
              className="mt-14 flex flex-col gap-3 sm:mt-16 sm:flex-row"
            >
              <a
                href="#contact"
                onClick={onNavigate("#contact")}
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "h-[2.8rem] px-[1.5rem] text-[0.75rem] font-semibold uppercase tracking-[0.24em] shadow-[0_16px_34px_-18px_rgba(40,68,255,0.92)]",
                )}
              >
                {t("primaryCta")}
              </a>
              <a
                href="#solution"
                onClick={onNavigate("#solution")}
                className="inline-flex h-[2.8rem] items-center justify-center gap-2 rounded-full border border-white/24 bg-white/10 px-[1.5rem] text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-colors hover:border-white/34 hover:bg-white/14 focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t("secondaryCta")}
                <ArrowRight className="size-[0.9rem]" aria-hidden />
              </a>
            </motion.div>

          </motion.div>
        </div>
      </SiteShell>

      <motion.div
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: reduceMotion
              ? { staggerChildren: 0 }
              : { delayChildren: 0.42, staggerChildren: 0.08 },
          },
        }}
        className="absolute inset-x-0 bottom-0 z-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(7,11,28,0.12)_28%,rgba(7,11,28,0.5)_100%)]" />
        <SiteShell className="relative pb-5 sm:pb-7">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: contentTransition,
              },
            }}
            className="border-t border-white/16 pt-4 sm:pt-5"
          >
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-9">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={`${stat.value}-${stat.label}`}
                  variants={{
                    hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        ...contentTransition,
                        delay: reduceMotion ? 0 : index * 0.02,
                      },
                    },
                  }}
                  className="max-w-[13.5rem] text-primary-foreground"
                >
                  <p className="text-[2rem] font-semibold tracking-[-0.05em] sm:text-[2.9rem]">
                    <AnimatedStatValue
                      delay={reduceMotion ? 0 : 0.68 + index * 0.08}
                      locale={locale}
                      reduceMotion={reduceMotion}
                      value={stat.value}
                    />
                  </p>
                  <p className="mt-2 text-[0.92rem] font-semibold leading-5 text-primary-foreground/92 sm:text-[1rem]">
                    {stat.label}
                  </p>
                  {stat.description ? (
                    <p className="mt-1 text-[0.8rem] leading-5 text-primary-foreground/72 sm:text-[0.85rem]">
                      {stat.description}
                    </p>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SiteShell>
      </motion.div>
    </SnapSection>
  );
}
