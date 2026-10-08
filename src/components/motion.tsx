"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function PageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Web Animations avoid mutating style attributes while Next hydrates streamed content.
        const animations: Animation[] = [];
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animations.push(entry.target.animate([
              { opacity: 0, transform: "translateY(25px)" },
              { opacity: 1, transform: "translateY(0)" },
            ], { duration: 750, easing: "cubic-bezier(.22,1,.36,1)" }));
            observer.unobserve(entry.target);
          });
        }, { threshold: .08 });
        document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
        if (window.innerWidth >= 768) gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
          const base = getComputedStyle(element).transform;
          const animation = element.animate([{ transform: base }, { transform: `${base === "none" ? "" : base} translateY(-24px)` }], { duration: 1000, fill: "both" });
          animation.pause(); animations.push(animation);
          const progress = { value: 0 };
          gsap.to(progress, { value: 1, ease: "none", onUpdate: () => { animation.currentTime = progress.value * 1000; }, scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: .7 } });
        });
        return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); };
      });
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
      cleanup = () => media.revert();
    });
    return () => { cancelled = true; cleanup(); };
  }, [pathname]);
  return null;
}
