"use client";

import { useEffect, useRef } from "react";
import SoftBlurIn from "./ui/SoftBlurIn";

const COPY =
  "Design não é apenas aparência. É o sistema que transforma percepção em confiança, organiza cada ponto de contacto e faz uma marca ser reconhecida antes mesmo de ser explicada.";

export default function CursorRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const move = (event: PointerEvent) => {
      if (reduced.matches) return;
      const rect = section.querySelector("p")?.getBoundingClientRect() ?? section.getBoundingClientRect();
      section.style.setProperty("--cursor-x", `${event.clientX - rect.left}px`);
      section.style.setProperty("--cursor-y", `${event.clientY - rect.top}px`);
      section.style.setProperty("--cursor-opacity", "1");
    };
    const leave = () => section.style.setProperty("--cursor-opacity", "0");

    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="cursor-reveal-section min-h-svh bg-black px-5 py-28 sm:px-8 lg:px-12">
      <SoftBlurIn
        text={COPY}
        className="cursor-reveal-copy mx-auto max-w-[1800px] text-justify text-[clamp(1.8rem,4vw,5rem)] font-medium leading-[1.08] tracking-[-0.055em]"
      />
    </section>
  );
}
