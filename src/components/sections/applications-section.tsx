"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Factory,
  House,
  Pause,
  Play,
  School,
  Store,
  Warehouse,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useEffect, useState, type MouseEvent } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

import { SnapSection } from "./snap-section";

type ApplicationsSectionProps = {
  onNavigate: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
  playKey: number;
};

type ApplicationCard = {
  description: string;
  title: string;
};

type GalleryItem = {
  alt: string;
  caption: string;
  src: string;
};

type ApplicationsContent = {
  cards: ApplicationCard[];
  closePreviewLabel: string;
  ctaLabel: string;
  ctaText: string;
  description: string;
  eyebrow: string;
  expandLabel: string;
  galleryHint: string;
  galleryItems: GalleryItem[];
  galleryTitle: string;
  nextLabel: string;
  pauseLabel: string;
  playLabel: string;
  previousLabel: string;
  title: string;
};

const APPLICATION_ICONS = [
  Warehouse,
  Factory,
  Store,
  House,
  School,
  Factory,
] as const;

const AUTO_SLIDE_INTERVAL_MS = 4200;
const GALLERY_BASE_ITEMS = [
  { fileName: "Alavi.png", label: "Alavi" },
  { fileName: "Almaviva.png", label: "Almaviva" },
  { fileName: "anti-2.png", label: "Anti 2" },
  { fileName: "Avicola.png", label: "Avicola" },
  { fileName: "Basf.png", label: "BASF" },
  { fileName: "Bavaria.png", label: "Bavaria" },
  { fileName: "campñ9b-1.png", label: "Campana 9B" },
  {
    fileName: "Colombia-Fantasy-Flores-copia.gif",
    label: "Colombia Fantasy Flores",
  },
  { fileName: "Datecsa-Sharp.png", label: "Datecsa Sharp" },
  { fileName: "dural-1.png", label: "Dural 1" },
  { fileName: "dural-8.png", label: "Dural 8" },
  { fileName: "dural-9.png", label: "Dural 9" },
  { fileName: "Ecopetrol-1.png", label: "Ecopetrol 1" },
  { fileName: "Exito.png", label: "Exito" },
  { fileName: "Inducarton.png", label: "Inducarton" },
  { fileName: "nuevo4.png", label: "Nuevo 4" },
] as const;

function createGalleryItems(language: "en" | "es"): GalleryItem[] {
  return GALLERY_BASE_ITEMS.map((item, index) => ({
    alt:
      language === "es"
        ? `Fotografia de proyecto ${index + 1}: ${item.label}.`
        : `Project photo ${index + 1}: ${item.label}.`,
    caption: item.label,
    src: `/gallery/${encodeURIComponent(item.fileName)}`,
  }));
}

const APPLICATIONS_CONTENT: Record<"en" | "es", ApplicationsContent> = {
  en: {
    cards: [
      {
        title: "Warehouses and logistics centers",
        description:
          "Helps control thermal load in storage, dispatch, and continuous-operation areas.",
      },
      {
        title: "Industrial plants",
        description:
          "Supports more stable conditions for processes, equipment, personnel, and heat-sensitive inventory.",
      },
      {
        title: "Commercial and retail spaces",
        description:
          "Contributes to better thermal comfort and operational performance in high-occupancy spaces.",
      },
      {
        title: "Residential projects",
        description:
          "Can also be applied on residential roofs to reduce indoor heat and improve comfort.",
      },
      {
        title: "Institutional and educational buildings",
        description:
          "Improves thermal conditions in continuous-use spaces such as schools, sports centers, and institutional buildings.",
      },
      {
        title: "Agro-industrial facilities",
        description:
          "Helps reduce heat gain where interior stability is critical for operations and product quality.",
      },
    ],
    closePreviewLabel: "Close image preview",
    ctaLabel: "REQUEST A QUOTE",
    ctaText:
      "Let us review whether Antiblaze\u00ae fits your project type and roof system.",
    description:
      "Antiblaze\u00ae adapts to different roof types and to projects where interior heat affects operations, comfort, or energy use.",
    eyebrow: "APPLICATIONS",
    expandLabel: "Open image preview",
    galleryHint: "Click any image to enlarge.",
    galleryItems: createGalleryItems("en"),
    galleryTitle: "Applications gallery",
    nextLabel: "Next image",
    pauseLabel: "Pause slideshow",
    playLabel: "Resume slideshow",
    previousLabel: "Previous image",
    title: "Where Antiblaze\u00ae creates value",
  },
  es: {
    cards: [
      {
        title: "Bodegas y centros log\u00edsticos",
        description:
          "Ayuda a controlar la carga t\u00e9rmica en espacios de almacenamiento, despacho y operaci\u00f3n continua.",
      },
      {
        title: "Plantas industriales",
        description:
          "Favorece condiciones m\u00e1s estables para procesos, equipos, personal e inventario sensible al calor.",
      },
      {
        title: "Comercio y retail",
        description:
          "Contribuye a mejorar confort t\u00e9rmico y desempe\u00f1o operativo en espacios comerciales de alta ocupaci\u00f3n.",
      },
      {
        title: "Proyectos residenciales",
        description:
          "Tambi\u00e9n puede aplicarse en cubiertas residenciales donde se busca reducir calor interior y mejorar confort.",
      },
      {
        title: "Institucional y educativo",
        description:
          "Aporta mejores condiciones t\u00e9rmicas en espacios de uso continuo como colegios, centros deportivos o edificios institucionales.",
      },
      {
        title: "Agroindustria",
        description:
          "Ayuda a reducir la ganancia t\u00e9rmica en instalaciones donde la estabilidad interior es importante para operaci\u00f3n y producto.",
      },
    ],
    closePreviewLabel: "Cerrar vista ampliada",
    ctaLabel: "SOLICITAR COTIZACI\u00d3N",
    ctaText: "",
    description:
      "Antiblaze\u00ae se adapta a distintos tipos de cubierta y a proyectos donde el calor interior afecta la operaci\u00f3n, el confort o el consumo energ\u00e9tico.",
    eyebrow: "APLICACIONES",
    expandLabel: "Abrir vista ampliada",
    galleryHint: "Haz clic en cualquier imagen para ampliar.",
    galleryItems: createGalleryItems("es"),
    galleryTitle: "Nuestos Proyectos",
    nextLabel: "Siguiente imagen",
    pauseLabel: "Pausar galer\u00eda",
    playLabel: "Reanudar galer\u00eda",
    previousLabel: "Imagen anterior",
    title: "Donde Antiblaze\u00ae genera valor",
  },
};

function getPreviousIndex(currentIndex: number, totalItems: number) {
  return (currentIndex - 1 + totalItems) % totalItems;
}

function getNextIndex(currentIndex: number, totalItems: number) {
  return (currentIndex + 1) % totalItems;
}

export function ApplicationsSection({
  onNavigate,
  playKey,
}: ApplicationsSectionProps) {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const content = locale.startsWith("es")
    ? APPLICATIONS_CONTENT.es
    : APPLICATIONS_CONTENT.en;
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [expandedSlideIndex, setExpandedSlideIndex] = useState<number | null>(
    null,
  );

  const totalSlides = content.galleryItems.length;
  const currentSlide = content.galleryItems[activeSlideIndex];

  useEffect(() => {
    if (
      reduceMotion ||
      !isAutoPlaying ||
      expandedSlideIndex !== null ||
      totalSlides < 2
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) =>
        getNextIndex(currentIndex, totalSlides),
      );
    }, AUTO_SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [expandedSlideIndex, isAutoPlaying, reduceMotion, totalSlides]);

  useEffect(() => {
    if (expandedSlideIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setExpandedSlideIndex(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedSlideIndex]);

  function handlePreviousSlide() {
    setActiveSlideIndex((currentIndex) =>
      getPreviousIndex(currentIndex, totalSlides),
    );
  }

  function handleNextSlide() {
    setActiveSlideIndex((currentIndex) =>
      getNextIndex(currentIndex, totalSlides),
    );
  }

  function handleOpenPreview(slideIndex: number) {
    setActiveSlideIndex(slideIndex);
    setExpandedSlideIndex(slideIndex);
    setIsAutoPlaying(false);
  }

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
        <motion.div
          key={`applications-shell-${playKey}`}
          initial={
            reduceMotion || playKey === 0
              ? false
              : { opacity: 0, x: -240, y: 22 }
          }
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const }
          }
          className="w-full rounded-[2rem] border border-border/70 bg-background-elevated/80 p-6 shadow-panel backdrop-blur-xl will-change-transform lg:p-7"
        >
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

          <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {content.cards.map((card, index) => {
                const Icon = APPLICATION_ICONS[index];

                return (
                  <article
                    key={card.title}
                    className="rounded-[1.45rem] border border-border/70 bg-surface/74 p-5 shadow-soft"
                  >
                    <div className="w-fit rounded-full bg-primary/6 p-2.5 text-primary/72">
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

            <div className="rounded-[1.45rem] border border-border/70 bg-surface/66 p-4 shadow-soft sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.96rem] font-semibold tracking-[-0.02em] text-foreground">
                    {content.galleryTitle}
                  </p>
                  <p className="mt-1 text-[0.82rem] leading-6 text-foreground/66">
                    {content.galleryHint}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPreview(activeSlideIndex)}
                aria-label={`${content.expandLabel}: ${currentSlide.caption}`}
                className="mt-4 block w-full cursor-pointer text-left"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-border/70 bg-background/62">
                  {content.galleryItems.map((item, index) => (
                    <Image
                      key={item.src}
                      src={withBasePath(item.src)}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 92vw"
                      className={cn(
                        "object-cover transition-opacity duration-500",
                        index === activeSlideIndex ? "opacity-100" : "opacity-0",
                      )}
                      priority={index === 0}
                    />
                  ))}
                </div>
              </button>

              <p className="mt-3 text-[0.82rem] font-medium leading-6 text-foreground/74">
                {currentSlide.caption}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousSlide}
                    aria-label={content.previousLabel}
                    className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-white/88 text-foreground/78 transition-colors duration-200 hover:border-primary/35 hover:bg-primary/10 hover:text-primary"
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label={content.nextLabel}
                    className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-white/88 text-foreground/78 transition-colors duration-200 hover:border-primary/35 hover:bg-primary/10 hover:text-primary"
                  >
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setIsAutoPlaying((currentValue) => !currentValue)
                    }
                    aria-label={
                      isAutoPlaying ? content.pauseLabel : content.playLabel
                    }
                    className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-white/88 text-foreground/78 transition-colors duration-200 hover:border-primary/35 hover:bg-primary/10 hover:text-primary"
                  >
                    {isAutoPlaying ? (
                      <Pause className="size-4" aria-hidden />
                    ) : (
                      <Play className="size-4" aria-hidden />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {content.galleryItems.map((item, index) => (
                    <button
                      key={`${item.src}-dot`}
                      type="button"
                      onClick={() => setActiveSlideIndex(index)}
                      aria-label={`${content.expandLabel} ${index + 1}`}
                      className={cn(
                        "h-2.5 w-2.5 cursor-pointer rounded-full border border-border/70 transition-colors",
                        index === activeSlideIndex
                          ? "bg-primary"
                          : "bg-white/88 hover:bg-surface-strong/72",
                      )}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div
            className={cn(
              "mt-6 flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center",
              content.ctaText ? "sm:justify-between" : "sm:justify-end",
            )}
          >
            {content.ctaText ? (
              <p className="max-w-[38rem] text-[0.96rem] leading-7 text-foreground/68">
                {content.ctaText}
              </p>
            ) : null}
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
        </motion.div>
      </SiteShell>

      {expandedSlideIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={content.galleryItems[expandedSlideIndex].alt}
          onClick={() => setExpandedSlideIndex(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/78 p-4 sm:p-6"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative z-10 h-[min(72vh,560px)] w-[min(92vw,920px)]"
          >
            <div className="relative h-full w-full">
              <Image
                src={withBasePath(content.galleryItems[expandedSlideIndex].src)}
                alt={content.galleryItems[expandedSlideIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
              <button
                type="button"
                onClick={() => setExpandedSlideIndex(null)}
                aria-label={content.closePreviewLabel}
                className="absolute right-3 top-3 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </SnapSection>
  );
}
