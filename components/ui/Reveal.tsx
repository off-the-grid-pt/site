"use client";

import { useEffect } from "react";

/**
 * Activa as entradas ao scroll de todos os elementos com a classe `.reveal`.
 * Dispara aos 20% de visibilidade, uma vez por elemento, e escalona 80ms
 * entre irmãos do mesmo contentor.
 */
export default function Reveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const siblings = el.parentElement
            ? Array.from(el.parentElement.children).filter((n) => n.classList.contains("reveal"))
            : [];
          const index = siblings.indexOf(el);
          el.style.transitionDelay = `${index > 0 ? Math.min(index, 3) * 80 : 0}ms`;
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.2 },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
