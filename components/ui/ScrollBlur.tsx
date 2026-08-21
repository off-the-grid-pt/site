"use client";

import { useEffect, useState } from "react";
import { ProgressiveBlur } from "./progressive-blur";

export default function ScrollBlur({ startAt, stopAt = "contato" }: { startAt: string; stopAt?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = document.getElementById(startAt);
      if (!section) return;
      const startsEntering = section.getBoundingClientRect().top <= window.innerHeight * 0.88;
      const finalSection = document.getElementById(stopAt);
      const finalStartsEntering = finalSection
        ? finalSection.getBoundingClientRect().top <= window.innerHeight
        : false;
      setVisible(startsEntering && !finalStartsEntering);
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [startAt, stopAt]);

  return (
    <div className={`scroll-blur-soft ${visible ? "is-visible" : ""}`} aria-hidden="true">
      <ProgressiveBlur
        position="bottom"
        backgroundColor="rgba(245, 245, 245, 0.08)"
        height="100%"
        blurAmount="7px"
      />
    </div>
  );
}
