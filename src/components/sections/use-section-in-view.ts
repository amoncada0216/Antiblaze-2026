"use client";

import { useEffect, useRef, useState } from "react";

type UseSectionInViewOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useSectionInView({
  rootMargin = "0px",
  threshold = 0.35,
}: UseSectionInViewOptions = {}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [enterCount, setEnterCount] = useState(0);
  const wasInViewRef = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const scrollRoot = element.closest("main");
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nextInView = Boolean(entry?.isIntersecting);
        setIsInView(nextInView);

        if (nextInView && !wasInViewRef.current) {
          setEnterCount((currentCount) => currentCount + 1);
        }

        wasInViewRef.current = nextInView;
      },
      {
        root: scrollRoot instanceof HTMLElement ? scrollRoot : null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return {
    enterCount,
    isInView,
    sectionRef,
  };
}
