"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SnapSection } from "./snap-section";

type FAQSectionProps = {
  onNavigate: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
};

type FAQItem = {
  answer: string;
  id: string;
  question: string;
};

const FAQ_CONTENT = {
  en: {
    ctaLabel: "REQUEST A QUOTE",
    description:
      "We answer the most common questions about how Antiblaze® works, installation, compatibility and benefits.",
    eyebrow: "FAQ",
    items: [
      {
        answer:
          "Antiblaze® is a reflective insulation installed beneath the roof to help block radiant heat before it enters the interior space.",
        id: "faq-1",
        question: "What is Antiblaze®?",
      },
      {
        answer:
          "It works by reflecting a significant portion of the thermal radiation received by the roof. This reduces heat transfer into the interior and helps improve thermal conditions inside the space.",
        id: "faq-2",
        question: "How does Antiblaze® work beneath the roof?",
      },
      {
        answer:
          "Antiblaze® primarily acts against radiant heat under the roof, while other systems may focus more on thermal resistance through mass or thickness. Its value lies in controlling heat gain at the source with a lightweight, functional solution.",
        id: "faq-3",
        question:
          "What is the difference between Antiblaze® and traditional insulation?",
      },
      {
        answer:
          "Yes. It helps reduce the thermal load entering from the roof, which can contribute to a more stable and comfortable indoor temperature.",
        id: "faq-4",
        question: "Does Antiblaze® help reduce indoor temperature?",
      },
      {
        answer:
          "Yes. By reducing heat gain from the roof, it can lower the demand on air conditioning and ventilation systems, helping optimize energy consumption.",
        id: "faq-5",
        question: "Can it help reduce air conditioning use?",
      },
      {
        answer:
          "It can be applied under different roof types, including metal, fiber cement, concrete and other common configurations in industrial and commercial projects.",
        id: "faq-6",
        question: "What roof types can it be installed on?",
      },
      {
        answer:
          "Yes. It is especially useful on metal roofs, where solar radiation can generate high heat transfer into the interior.",
        id: "faq-7",
        question: "Does Antiblaze® work on metal roofs?",
      },
      {
        answer:
          "Yes. Its application can provide benefits across different roof systems, provided the solution is properly evaluated according to the project conditions.",
        id: "faq-8",
        question: "Does it also work on fiber cement or concrete roofs?",
      },
      {
        answer:
          "Yes. Antiblaze® can help limit moisture and condensation under the roof, improving the overall performance of the system in demanding environments.",
        id: "faq-9",
        question: "Does it help control moisture and condensation?",
      },
      {
        answer:
          "Yes. In addition to its thermal benefits, it can provide acoustic support and contribute to better indoor comfort depending on the construction system configuration.",
        id: "faq-10",
        question: "Does it provide any acoustic benefit?",
      },
      {
        answer:
          "Yes. It is intended to meet the performance requirements of industrial and commercial projects, with a focus on efficiency, safety and reliable installation.",
        id: "faq-11",
        question:
          "Is it a safe solution for industrial and commercial applications?",
      },
      {
        answer:
          "No. It is a lightweight solution designed to be installed beneath the roof without adding significant load to the structural system.",
        id: "faq-12",
        question: "Does Antiblaze® add significant weight to the structure?",
      },
      {
        answer:
          "It is designed to deliver sustained long-term performance when installed correctly and used under proper conditions.",
        id: "faq-13",
        question: "How long does Antiblaze® last?",
      },
      {
        answer:
          "Under normal conditions, maintenance is minimal. Even so, periodic reviews of the roof system are always recommended together with the rest of the installation.",
        id: "faq-14",
        question: "Does it require maintenance?",
      },
      {
        answer:
          "It depends on the project type and installation conditions. In many cases, the installation can be planned to minimize disruption to operations.",
        id: "faq-15",
        question: "Does installation interrupt operations inside the space?",
      },
      {
        answer:
          "Yes. It can be installed in both new projects and existing roofs, subject to a technical review of on-site conditions.",
        id: "faq-16",
        question: "Can it be installed on existing roofs?",
      },
      {
        answer:
          "It is recommended for warehouses, industrial plants, logistics centers, commercial facilities, institutional buildings and other spaces where under-roof heat affects operations, comfort or energy use.",
        id: "faq-17",
        question: "What types of projects is Antiblaze® recommended for?",
      },
      {
        answer:
          "Yes. By reducing heat transfer into the interior, it can contribute to more efficient operation and lower cooling demand.",
        id: "faq-18",
        question: "Can Antiblaze® help improve energy efficiency?",
      },
      {
        answer:
          "It helps create more stable indoor conditions, which can improve staff comfort and help protect equipment, inventory and heat-sensitive processes.",
        id: "faq-19",
        question: "What benefits does it offer for equipment, product and staff?",
      },
      {
        answer:
          "You can contact us to review your project conditions, evaluate the roof type and propose a suitable solution based on your needs.",
        id: "faq-20",
        question: "How can I request an evaluation or quotation?",
      },
    ] satisfies FAQItem[],
    title: "Frequently Asked Questions",
  },
  es: {
    ctaLabel: "SOLICITAR COTIZACIÓN",
    description:
      "Resolvemos las preguntas más comunes sobre funcionamiento, instalación, compatibilidad y beneficios de Antiblaze®.",
    eyebrow: "FAQ",
    items: [
      {
        answer:
          "Antiblaze® es un aislante reflectivo que se instala bajo cubierta para ayudar a bloquear el calor radiante antes de que ingrese al espacio interior.",
        id: "faq-1",
        question: "¿Qué es Antiblaze®?",
      },
      {
        answer:
          "Funciona reflejando una parte importante de la radiación térmica que recibe la cubierta. Así reduce la transferencia de calor hacia el interior y ayuda a mejorar las condiciones térmicas del espacio.",
        id: "faq-2",
        question: "¿Cómo funciona Antiblaze® bajo la cubierta?",
      },
      {
        answer:
          "Antiblaze® actúa principalmente frente al calor radiante bajo cubierta, mientras que otros sistemas pueden enfocarse más en resistencia térmica por masa o espesor. Su valor está en controlar la ganancia térmica desde la fuente, con una solución liviana y funcional.",
        id: "faq-3",
        question:
          "¿Qué diferencia hay entre Antiblaze® y un aislamiento tradicional?",
      },
      {
        answer:
          "Sí. Ayuda a disminuir la carga térmica que entra desde la cubierta, lo que puede contribuir a mantener una temperatura interior más estable y confortable.",
        id: "faq-4",
        question: "¿Antiblaze® ayuda a reducir la temperatura interior?",
      },
      {
        answer:
          "Sí. Al reducir la ganancia de calor desde la cubierta, puede disminuir la demanda sobre sistemas de aire acondicionado y ventilación, ayudando a optimizar el consumo energético.",
        id: "faq-5",
        question: "¿Puede ayudar a disminuir el uso de aire acondicionado?",
      },
      {
        answer:
          "Puede aplicarse en distintos tipos de cubierta, incluyendo cubiertas metálicas, de fibrocemento, concreto y otras configuraciones comunes en proyectos industriales y comerciales.",
        id: "faq-6",
        question: "¿En qué tipos de cubierta se puede instalar?",
      },
      {
        answer:
          "Sí. Es especialmente útil en cubiertas metálicas, donde la radiación solar puede generar una alta transferencia de calor hacia el interior.",
        id: "faq-7",
        question: "¿Antiblaze® sirve para cubiertas metálicas?",
      },
      {
        answer:
          "Sí. Su aplicación puede aportar beneficios en diferentes sistemas de cubierta, siempre que se evalúe correctamente la solución según las condiciones del proyecto.",
        id: "faq-8",
        question: "¿También funciona en cubiertas de fibrocemento o concreto?",
      },
      {
        answer:
          "Sí. Antiblaze® puede ayudar a limitar fenómenos de humedad y condensación bajo cubierta, mejorando el comportamiento general del sistema en ambientes exigentes.",
        id: "faq-9",
        question: "¿Ayuda a controlar humedad y condensación?",
      },
      {
        answer:
          "Sí. Además de sus beneficios térmicos, puede aportar apoyo acústico y contribuir a mejorar el confort interior según la configuración del sistema constructivo.",
        id: "faq-10",
        question: "¿Aporta algún beneficio acústico?",
      },
      {
        answer:
          "Sí. Está pensada para responder a los requerimientos de desempeño de proyectos industriales y comerciales, con enfoque en eficiencia, seguridad y confiabilidad de instalación.",
        id: "faq-11",
        question:
          "¿Es una solución segura para aplicaciones industriales y comerciales?",
      },
      {
        answer:
          "No. Es una solución liviana, diseñada para instalarse bajo cubierta sin agregar una carga significativa al sistema estructural.",
        id: "faq-12",
        question: "¿Antiblaze® agrega peso importante a la estructura?",
      },
      {
        answer:
          "Está diseñado para ofrecer desempeño sostenido a largo plazo cuando se instala correctamente y bajo condiciones adecuadas de uso.",
        id: "faq-13",
        question: "¿Cuánto dura Antiblaze®?",
      },
      {
        answer:
          "En condiciones normales, su mantenimiento es mínimo. Aun así, siempre es recomendable realizar revisiones periódicas del sistema de cubierta en conjunto con el resto de la instalación.",
        id: "faq-14",
        question: "¿Requiere mantenimiento?",
      },
      {
        answer:
          "Depende del tipo de proyecto y de las condiciones de montaje. En muchos casos, la instalación puede planificarse para minimizar afectaciones en la operación.",
        id: "faq-15",
        question: "¿La instalación interrumpe la operación del espacio?",
      },
      {
        answer:
          "Sí. Puede instalarse tanto en proyectos nuevos como en cubiertas existentes, previo análisis técnico de las condiciones del sitio.",
        id: "faq-16",
        question: "¿Se puede instalar en cubiertas existentes?",
      },
      {
        answer:
          "Se recomienda en bodegas, plantas industriales, centros logísticos, comercios, instalaciones institucionales y otros espacios donde el calor bajo cubierta afecte la operación, el confort o el consumo energético.",
        id: "faq-17",
        question: "¿En qué tipo de proyectos se recomienda Antiblaze®?",
      },
      {
        answer:
          "Sí. Al reducir la transferencia de calor hacia el interior, puede contribuir a una operación más eficiente y a una menor demanda de climatización.",
        id: "faq-18",
        question: "¿Antiblaze® puede ayudar a mejorar la eficiencia energética?",
      },
      {
        answer:
          "Ayuda a generar condiciones interiores más estables, lo que puede favorecer el confort del personal y contribuir a proteger equipos, inventario y procesos sensibles al calor.",
        id: "faq-19",
        question:
          "¿Qué beneficios ofrece para equipos, producto y personal?",
      },
      {
        answer:
          "Puedes contactarnos para revisar las características de tu proyecto, evaluar el tipo de cubierta y proponerte una solución adecuada según tus necesidades.",
        id: "faq-20",
        question: "¿Cómo puedo solicitar una evaluación o cotización?",
      },
    ] satisfies FAQItem[],
    title: "Preguntas Frecuentes",
  },
} as const;

export function FAQSection({ onNavigate }: FAQSectionProps) {
  const locale = useLocale();
  const content = locale.startsWith("es") ? FAQ_CONTENT.es : FAQ_CONTENT.en;
  const faqItems = content.items;
  const midpoint = Math.ceil(faqItems.length / 2);
  const faqColumns = [faqItems.slice(0, midpoint), faqItems.slice(midpoint)];
  const [openItemId, setOpenItemId] = useState<string>(faqItems[0]?.id ?? "");
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleToggle(itemId: string) {
    setOpenItemId((currentValue) => (currentValue === itemId ? "" : itemId));
  }

  function moveFocus(nextIndex: number) {
    triggerRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveFocus((index + 1) % faqItems.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveFocus((index - 1 + faqItems.length) % faqItems.length);
        break;
      case "Home":
        event.preventDefault();
        moveFocus(0);
        break;
      case "End":
        event.preventDefault();
        moveFocus(faqItems.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <SnapSection id="faq" tone="product" className="h-auto min-h-screen">
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
          <div className="max-w-[42rem]">
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-primary/78">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-[2.4rem] font-semibold leading-[0.95] tracking-[-0.055em] text-foreground sm:text-[2.8rem] xl:text-[3.1rem]">
              {content.title}
            </h2>
            <p className="mt-4 text-[0.98rem] leading-7 text-foreground/72">
              {content.description}
            </p>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-2 lg:gap-4">
            {faqColumns.map((columnItems, columnIndex) => (
              <div key={`faq-column-${columnIndex}`} className="space-y-3">
                {columnItems.map((item, itemIndex) => {
                  const globalIndex = columnIndex * midpoint + itemIndex;
                  const isOpen = openItemId === item.id;
                  const triggerId = `${item.id}-trigger`;
                  const panelId = `${item.id}-panel`;

                  return (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-[1.35rem] border border-border/70 bg-surface/74 shadow-soft"
                    >
                      <button
                        ref={(element) => {
                          triggerRefs.current[globalIndex] = element;
                        }}
                        id={triggerId}
                        type="button"
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        onClick={() => handleToggle(item.id)}
                        onKeyDown={(event) => handleKeyDown(globalIndex, event)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-strong/52 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 sm:px-6 sm:py-5"
                      >
                        <span className="text-[1rem] font-semibold leading-7 tracking-[-0.02em] text-foreground sm:text-[1.04rem]">
                          {item.question}
                        </span>
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-white/84 text-primary/72 transition-all duration-300",
                            isOpen ? "rotate-180 bg-primary/6" : "",
                          )}
                        >
                          <ChevronDown className="size-4" aria-hidden />
                        </span>
                      </button>

                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <div
                            id={panelId}
                            role="region"
                            aria-labelledby={triggerId}
                            className="border-t border-border/60 px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
                          >
                            <p className="max-w-[58rem] text-[0.94rem] leading-7 text-foreground/72">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
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
              {content.ctaLabel}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </SiteShell>
    </SnapSection>
  );
}
