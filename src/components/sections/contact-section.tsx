"use client";

import {
  Building2,
  Mail,
  Send,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { type FormEvent } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

import { SnapSection } from "./snap-section";

type ContactItemKey = "exclusiveRep" | "whatsapp" | "email";
type ContactItemIcon = LucideIcon | "whatsapp";

const contactItems: Array<{
  icon: ContactItemIcon;
  key: ContactItemKey;
}> = [
  {
    icon: Building2,
    key: "exclusiveRep",
  },
  {
    icon: "whatsapp",
    key: "whatsapp",
  },
  {
    icon: Mail,
    key: "email",
  },
];

type ContactSectionProps = {
  playKey: number;
};

export function ContactSection({ playKey }: ContactSectionProps) {
  const t = useTranslations("ScrollSnap.sections.section4");
  const reduceMotion = useReducedMotion();
  const leftCardTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const };
  const rightCardTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subject = company
      ? `${t("mailSubject")} - ${company}`
      : `${t("mailSubject")} - ${name}`;

    const body = [
      `${t("form.name")}: ${name}`,
      `${t("form.company")}: ${company || "-"}`,
      `${t("form.email")}: ${email}`,
      `${t("form.phone")}: ${phone || "-"}`,
      "",
      `${t("form.message")}:`,
      message,
    ].join("\n");

    window.location.href = `mailto:info@antiblaze.com.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <SnapSection id="contact" tone="contact" isLast>
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
          className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch xl:gap-10"
        >
          <motion.div
            key={`contact-left-${playKey}`}
            initial={
              reduceMotion || playKey === 0
                ? false
                : {
                    opacity: 0,
                    x: -140,
                    y: 20,
                  }
            }
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={leftCardTransition}
            className="rounded-[2rem] border border-border/70 bg-background-elevated/80 p-6 shadow-panel backdrop-blur-xl will-change-transform lg:p-7"
          >
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-primary/78">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 max-w-[34rem] text-[2.6rem] font-semibold leading-[0.94] tracking-[-0.06em] text-foreground sm:text-[3rem] xl:text-[3.28rem]">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-[33rem] text-[1rem] leading-7 text-foreground/72">
              {t("description")}
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground-soft/64"
                  >
                    {t("form.name")}
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    placeholder={t("form.namePlaceholder")}
                    className="h-12 rounded-[1.2rem] border-border/70 bg-background/72 text-foreground placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/30"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-company"
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground-soft/64"
                  >
                    {t("form.company")}
                  </label>
                  <Input
                    id="contact-company"
                    name="company"
                    placeholder={t("form.companyPlaceholder")}
                    className="h-12 rounded-[1.2rem] border-border/70 bg-background/72 text-foreground placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/30"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground-soft/64"
                  >
                    {t("form.email")}
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("form.emailPlaceholder")}
                    className="h-12 rounded-[1.2rem] border-border/70 bg-background/72 text-foreground placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/30"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-phone"
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground-soft/64"
                  >
                    {t("form.phone")}
                  </label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder={t("form.phonePlaceholder")}
                    className="h-12 rounded-[1.2rem] border-border/70 bg-background/72 text-foreground placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground-soft/64"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder={t("form.messagePlaceholder")}
                  className="min-h-[10.5rem] w-full resize-none rounded-[1.4rem] border border-border/70 bg-background/72 px-4 py-3 text-sm leading-6 text-foreground shadow-soft transition-colors placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className={cn(
                    buttonVariants({ variant: "primary" }),
                    "h-11 px-6 text-[0.76rem] font-semibold uppercase tracking-[0.2em]",
                  )}
                >
                  {t("submit")}
                  <Send className="size-4" aria-hidden />
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            key={`contact-right-${playKey}`}
            initial={
              reduceMotion || playKey === 0
                ? false
                : {
                    opacity: 0,
                    x: 140,
                    y: 20,
                  }
            }
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={rightCardTransition}
            className="flex h-full flex-col rounded-[2rem] border border-border/70 bg-white/92 p-6 shadow-panel backdrop-blur-xl will-change-transform lg:p-7"
          >
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-primary/78">
              {t("contactInfoEyebrow")}
            </p>
            <h3 className="mt-3 text-[2rem] font-semibold leading-[0.96] tracking-[-0.05em] text-foreground sm:text-[2.3rem]">
              {t("contactInfoTitle")}
            </h3>
            <p className="mt-4 max-w-[27rem] whitespace-pre-line text-[0.98rem] leading-7 text-foreground/68">
              {t("contactInfoDescription")}
            </p>

            <div className="mt-8 space-y-3">
              {contactItems.map((item) => {
                const iconNode =
                  item.icon === "whatsapp" ? (
                    <div className="rounded-full bg-[#25D366] p-2.5 text-white">
                      <Image
                        src={withBasePath("/whatsapp.svg?v=2")}
                        alt=""
                        width={16}
                        height={16}
                        className="size-4"
                      />
                    </div>
                  ) : (
                    <div className="rounded-full bg-primary/6 p-2.5 text-primary/72">
                      <item.icon className="size-4" aria-hidden />
                    </div>
                  );

                return (
                  <div
                    key={item.key}
                    className="flex items-start gap-4 rounded-[1.4rem] border border-border/70 bg-surface/72 p-4"
                  >
                    {iconNode}
                    <div className="min-w-0">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground-soft/56">
                        {t(`contactItems.${item.key}.label`)}
                      </p>
                      <p className="mt-1 text-[0.98rem] font-medium leading-7 text-foreground">
                        {t(`contactItems.${item.key}.value`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>
        </div>
      </SiteShell>
    </SnapSection>
  );
}
