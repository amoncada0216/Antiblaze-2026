"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { navLinks } from "@/lib/constants";

import { ApplicationsSection } from "./applications-section";
import { ContactSection } from "./contact-section";
import { EmptySection } from "./empty-section";
import { FAQSection } from "./faq-section";
import { HomeHeroSection } from "./home-hero-section";
import { SolutionSection } from "./solution-section";

export function ScrollSnapPage() {
  const t = useTranslations("ScrollSnap.nav");
  const scrollRef = useRef<HTMLElement | null>(null);
  const [activeHref, setActiveHref] = useState<string>(navLinks[0].href);
  const placeholderSections = [
    {
      href: "#about",
      id: "about",
      title: t("about"),
      tone: "about" as const,
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) {
      return;
    }

    const sections = navLinks
      .map((link) => scrollContainer.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      {
        root: scrollContainer,
        threshold: 0.4,
        rootMargin: "-80px 0px -40% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) {
      return;
    }

    const hash = window.location.hash;
    if (!hash) {
      return;
    }

    const target = scrollContainer.querySelector<HTMLElement>(hash);
    if (!target) {
      return;
    }

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, []);

  function handleNavigate(href: string) {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      const scrollContainer = scrollRef.current;
      const target = scrollContainer?.querySelector<HTMLElement>(href);

      if (!target) {
        return;
      }

      setActiveHref(href);
      window.history.replaceState(null, "", href);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }

  return (
    <>
      <SiteHeader
        activeHref={activeHref}
        links={navLinks}
        onNavigate={handleNavigate}
      />

      <main
        ref={scrollRef}
        className="no-scrollbar h-screen overflow-y-scroll overscroll-none snap-y snap-mandatory scroll-smooth"
      >
        <HomeHeroSection onNavigate={handleNavigate} />
        <SolutionSection onNavigate={handleNavigate} />
        <ApplicationsSection onNavigate={handleNavigate} />
        {placeholderSections.map((section) => (
          <EmptySection
            key={section.href}
            id={section.id}
            isLast={false}
            title={section.title}
            tone={section.tone}
          />
        ))}
        <FAQSection onNavigate={handleNavigate} />
        <ContactSection />
      </main>
    </>
  );
}
