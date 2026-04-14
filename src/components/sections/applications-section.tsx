"use client";

import {
  ArrowRight,
  CheckCircle2,
  Factory,
  House,
  Layers3,
  Leaf,
  School,
  Store,
  Warehouse,
} from "lucide-react";
import { useLocale } from "next-intl";
import { type MouseEvent } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SnapSection } from "./snap-section";

type ApplicationsSectionProps = {
  onNavigate: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
};

type ApplicationCard = {
  description: string;
  title: string;
};

type ApplicationsContent = {
  cards: ApplicationCard[];
  compatibilityItems: string[];
  compatibilityTitle: string;
  ctaLabel: string;
  ctaText: string;
  description: string;
  eyebrow: string;
  fitItems: string[];
  fitTitle: string;
  title: string;
};

const APPLICATION_ICONS = [
  Warehouse,
  Factory,
  Store,
  Leaf,
  School,
  House,
] as const;

const APPLICATIONS_CONTENT: Record<"en" | "es", ApplicationsContent> = {
  en: {
    cards: [
      {
        title: "Warehouses and logistics centers",
        description:
          "Helps control thermal load in storage, dispatch and continuous-operation spaces.",
      },
      {
        title: "Industrial plants",
        description:
          "Supports more stable conditions for processes, equipment, personnel and heat-sensitive inventory.",
      },
      {
        title: "Commercial and retail spaces",
        description:
          "Contributes to better thermal comfort and operational performance in high-occupancy commercial spaces.",
      },
      {
        title: "Agro-industrial facilities",
        description:
          "Helps reduce heat gain in facilities where interior stability matters for operations and product.",
      },
      {
        title: "Institutional and educational buildings",
        description:
          "Brings better thermal conditions to continuous-use spaces such as schools, sports centers or institutional buildings.",
      },
      {
        title: "Residential projects",
        description:
          "It can also be applied on residential roofs where the goal is to reduce indoor heat and improve comfort.",
      },
    ],
    compatibilityItems: [
      "Metal roofs",
      "Fiber cement",
      "Concrete",
      "Other configurations under evaluation",
    ],
    compatibilityTitle: "Compatible with different roof systems",
    ctaLabel: "REQUEST A QUOTE",
    ctaText:
      "Let’s review whether Antiblaze® applies to your project type and roof system.",
    description:
      "Antiblaze® adapts to different roof types and to projects where interior heat affects operations, comfort or energy use.",
    eyebrow: "APPLICATIONS",
    fitItems: [
      "Lower interior heat gain",
      "Better operational performance",
      "Support for moisture and condensation control",
      "Lower pressure on cooling systems",
    ],
    fitTitle: "Ideal when the project needs",
    title: "Where Antiblaze® creates value",
  },
  es: {
    cards: [
      {
        title: "Bodegas y centros logísticos",
        description:
          "Ayuda a controlar la carga térmica en espacios de almacenamiento, despacho y operación continua.",
      },
      {
        title: "Plantas industriales",
        description:
          "Favorece condiciones más estables para procesos, equipos, personal e inventario sensible al calor.",
      },
      {
        title: "Comercio y retail",
        description:
          "Contribuye a mejorar confort térmico y desempeño operativo en espacios comerciales de alta ocupación.",
      },
      {
        title: "Agroindustria",
        description:
          "Ayuda a reducir la ganancia térmica en instalaciones donde la estabilidad interior es importante para operación y producto.",
      },
      {
        title: "Institucional y educativo",
        description:
          "Aporta mejores condiciones térmicas en espacios de uso continuo como colegios, centros deportivos o edificios institucionales.",
      },
      {
        title: "Proyectos residenciales",
        description:
          "También puede aplicarse en cubiertas residenciales donde se busca reducir calor interior y mejorar confort.",
      },
    ],
    compatibilityItems: [
      "Cubiertas metálicas",
      "Fibrocemento",
      "Concreto",
      "Otras configuraciones bajo evaluación",
    ],
    compatibilityTitle: "Compatible con distintos sistemas de cubierta",
    ctaLabel: "SOLICITAR COTIZACIÓN",
    ctaText:
      "Evaluemos si Antiblaze® aplica a tu tipo de proyecto y cubierta.",
    description:
      "Antiblaze® se adapta a distintos tipos de cubierta y a proyectos donde el calor interior afecta la operación, el confort o el consumo energético.",
    eyebrow: "APLICACIONES",
    fitItems: [
      "Menor ganancia térmica interior",
      "Mejor desempeño operativo",
      "Apoyo en control de humedad y condensación",
      "Menor presión sobre climatización",
    ],
    fitTitle: "Ideal cuando el proyecto necesita",
    title: "Donde Antiblaze® genera valor",
  },
};

export function ApplicationsSection({
  onNavigate,
}: ApplicationsSectionProps) {
  const locale = useLocale();
  const content = locale.startsWith("es")
    ? APPLICATIONS_CONTENT.es
    : APPLICATIONS_CONTENT.en;

  return (
    <SnapSection id="applications" tone="product" className="h-auto min-h-screen">
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
        <div className="w-full rounded-[2rem] border border-border/70 bg-background-elevated/80 p-6 shadow-panel backdrop-blur-xl lg:p-7">
          <div className="max-w-[45rem]">
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-primary/78">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-[2.4rem] font-semibold leading-[0.95] tracking-[-0.055em] text-foreground sm:text-[2.8rem] xl:text-[3.1rem]">
              {content.title}
            </h2>
            <p className="mt-4 max-w-[41rem] text-[0.98rem] leading-7 text-foreground/72">
              {content.description}
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {content.cards.map((card, index) => {
              const Icon = APPLICATION_ICONS[index];

              return (
                <article
                  key={card.title}
                  className="group rounded-[1.45rem] border border-border/70 bg-surface/74 p-5 shadow-soft transition-[transform,background-color,border-color] duration-200 hover:-translate-y-[2px] hover:bg-white/88 hover:border-border/85"
                >
                  <div className="rounded-full bg-primary/6 p-2.5 text-primary/72 w-fit transition-colors duration-200 group-hover:bg-primary/8">
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-[1.02rem] font-semibold leading-7 tracking-[-0.02em] text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-7 text-foreground/68">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-[1.45rem] border border-border/70 bg-surface/66 p-4 shadow-soft sm:p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/6 p-2.5 text-primary/72">
                    <Layers3 className="size-4" aria-hidden />
                  </div>
                  <p className="text-[0.96rem] font-semibold tracking-[-0.02em] text-foreground">
                    {content.compatibilityTitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {content.compatibilityItems.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-border/70 bg-white/88 px-3 py-2 text-[0.78rem] font-medium leading-5 text-foreground/76 shadow-soft"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.45rem] border border-border/70 bg-[linear-gradient(180deg,rgba(246,248,255,0.88)_0%,rgba(255,255,255,0.96)_100%)] p-4 shadow-soft sm:p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/6 p-2.5 text-primary/72">
                  <CheckCircle2 className="size-4" aria-hidden />
                </div>
                <p className="text-[0.96rem] font-semibold tracking-[-0.02em] text-foreground">
                  {content.fitTitle}
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {content.fitItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.05rem] border border-border/65 bg-background/72 px-4 py-3 text-[0.82rem] font-medium leading-6 text-foreground/74"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[38rem] text-[0.96rem] leading-7 text-foreground/68">
              {content.ctaText}
            </p>
            <a
              href="#contact"
              onClick={onNavigate("#contact")}
              className={cn(
                buttonVariants({ variant: "primary" }),
                "h-11 px-6 text-[0.76rem] font-semibold uppercase tracking-[0.2em]",
              )}
            >
              {content.ctaLabel}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </SiteShell>
    </SnapSection>
  );
}
