"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { navLinks } from "@/lib/constants";

import { AboutSection } from "./about-section";
import { ApplicationsSection } from "./applications-section";
import { ContactSection } from "./contact-section";
import { FAQSection } from "./faq-section";
import { HomeHeroSection } from "./home-hero-section";
import { SolutionSection } from "./solution-section";

const replayableSectionHrefs = [
  "#applications",
  "#about",
  "#faq",
  "#contact",
] as const;

type ReplayableSectionHref = (typeof replayableSectionHrefs)[number];

function isReplayableSectionHref(
  href: string,
): href is ReplayableSectionHref {
  return replayableSectionHrefs.includes(href as ReplayableSectionHref);
}

function createReplayCounterState() {
  return replayableSectionHrefs.reduce(
    (accumulator, href) => {
      accumulator[href] = 0;
      return accumulator;
    },
    {} as Record<ReplayableSectionHref, number>,
  );
}

export function ScrollSnapPage() {
  const scrollRef = useRef<HTMLElement | null>(null);
  const activeHrefRef = useRef<string>(navLinks[0].href);
  const [activeHref, setActiveHref] = useState<string>(navLinks[0].href);
  const [replayCounters, setReplayCounters] =
    useState<Record<ReplayableSectionHref, number>>(createReplayCounterState);

  const activateSection = useCallback((nextHref: string) => {
    if (activeHrefRef.current === nextHref) {
      return;
    }

    activeHrefRef.current = nextHref;
    setActiveHref(nextHref);

    if (isReplayableSectionHref(nextHref)) {
      setReplayCounters((currentCounters) => ({
        ...currentCounters,
        [nextHref]: currentCounters[nextHref] + 1,
      }));
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) {
      return;
    }

    const sections = navLinks
      .map((link) => scrollContainer.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    let animationFrameId = 0;

    const updateActiveSection = () => {
      animationFrameId = 0;

      const { top, height } = scrollContainer.getBoundingClientRect();
      const viewportCenter = top + height / 2;
      let closestHref = activeHrefRef.current;
      let smallestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect();
        const sectionCenter = sectionRect.top + sectionRect.height / 2;
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);

        if (distanceFromCenter < smallestDistance) {
          smallestDistance = distanceFromCenter;
          closestHref = `#${section.id}`;
        }
      });

      activateSection(closestHref);
    };

    const queueActiveSectionUpdate = () => {
      if (animationFrameId !== 0) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    scrollContainer.addEventListener("scroll", queueActiveSectionUpdate, {
      passive: true,
    });
    window.addEventListener("resize", queueActiveSectionUpdate);
    queueActiveSectionUpdate();

    return () => {
      scrollContainer.removeEventListener("scroll", queueActiveSectionUpdate);
      window.removeEventListener("resize", queueActiveSectionUpdate);

      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activateSection]);

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

      if (href === activeHrefRef.current && isReplayableSectionHref(href)) {
        setReplayCounters((currentCounters) => ({
          ...currentCounters,
          [href]: currentCounters[href] + 1,
        }));
      }

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
        <ApplicationsSection
          onNavigate={handleNavigate}
          playKey={replayCounters["#applications"]}
        />
        <AboutSection
          onNavigate={handleNavigate}
          playKey={replayCounters["#about"]}
        />
        <FAQSection onNavigate={handleNavigate} playKey={replayCounters["#faq"]} />
        <ContactSection playKey={replayCounters["#contact"]} />
      </main>
    </>
  );
}
