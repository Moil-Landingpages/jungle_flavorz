"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reveal-on-scroll for any container. Targets descendants matching `selector`
 * (defaults to `[data-reveal]`) and fades them up with a stagger.
 */
export function useGsapReveal(selector: string = "[data-reveal]") {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(selector);
      if (!items.length) return;

      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [selector]);

  return ref;
}

/**
 * Parallax helper — pass refs of image elements to drift them as the user
 * scrolls past their section.
 */
export function useGsapParallax(targets: React.RefObject<HTMLElement>[], amount = 60) {
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    targets.forEach((t) => {
      if (!t.current) return;
      const tween = gsap.fromTo(
        t.current,
        { y: -amount },
        {
          y: amount,
          ease: "none",
          scrollTrigger: {
            trigger: t.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, [targets, amount]);
}
