"use client";

import { House } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { MouseEvent } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { withBasePath } from "@/lib/base-path";
import { type NavLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  activeHref: string;
  links: readonly NavLink[];
  onNavigate: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function SiteHeader({ activeHref, links, onNavigate }: SiteHeaderProps) {
  const t = useTranslations("ScrollSnap.nav");
  const locale = useLocale();
  const whatsappHref =
    locale === "es"
      ? "https://wa.me/573105609958?text=Buen%20d%C3%ADa%2C%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20para%20un%20proyecto."
      : "https://wa.me/573105609958?text=Good%20day%2C%20I%20would%20like%20to%20request%20a%20quotation%20for%20a%20project.";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-white">
        <SiteShell>
          <div className="flex min-h-[4.5rem] items-center justify-between gap-6">
            <a
              href="#home"
              onClick={onNavigate("#home")}
              className="inline-flex shrink-0 items-center rounded-md focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src={withBasePath("/antiblaze.svg")}
                alt={t("brandAlt")}
                width={128}
                height={28}
                priority
                className="h-8 w-auto"
              />
            </a>

            <nav
              aria-label={t("label")}
              className="hidden flex-1 items-center justify-center gap-7 md:flex lg:gap-9 xl:gap-11"
            >
              {links.map((link) => {
                const isActive = activeHref === link.href;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center gap-2 py-1.5 text-[0.86rem] font-semibold tracking-[0.015em] text-foreground-soft transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "text-primary after:absolute after:inset-x-0 after:-bottom-[0.18rem] after:h-0.5 after:rounded-full after:bg-primary"
                        : "hover:text-primary",
                    )}
                  >
                    {link.id === "home" ? (
                      <House className="size-3.25" aria-hidden />
                    ) : null}
                    {t(link.label)}
                  </a>
                );
              })}
            </nav>

            <a
              href="#contact"
              onClick={onNavigate("#contact")}
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring hover:bg-primary-strong"
            >
              {t("quoteCta")}
            </a>
          </div>
        </SiteShell>
      </header>

      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <div className="flex flex-col items-end gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-[4.14rem] w-[4.14rem] items-center justify-center rounded-full border border-[#25D366] bg-[#25D366] shadow-panel transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring hover:border-[#35DE73] hover:bg-[#35DE73]"
          >
            <Image
              src={withBasePath("/whatsapp.svg?v=2")}
              alt=""
              width={42}
              height={42}
              className="h-[2.6rem] w-[2.6rem] brightness-0 invert"
            />
          </a>

          <div className="flex items-center rounded-[1.75rem] border border-border/70 bg-surface/85 p-2 shadow-panel backdrop-blur-xl">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
