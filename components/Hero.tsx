"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { Panel, Wrap } from "./ui/primitives";

export default function Hero() {
  const [ready, setReady] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slowVideo = () => {
    if (videoRef.current) videoRef.current.playbackRate = 0.2;
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const hero = viewportRef.current?.querySelector<HTMLElement>("section");
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      hero.style.setProperty("--hero-parallax", `${progress * -20}vh`);
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={viewportRef} className="hero-entry-viewport relative min-h-svh overflow-hidden bg-black">
      <Nav />

      <Panel
        className="hero-entry hero-dark overflow-hidden text-white"
        data-started="true"
        data-expanded={ready ? "true" : "false"}
      >
        <video
          ref={videoRef}
          className="hero-frame-image absolute inset-0 size-full object-cover"
          src="/background.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={slowVideo}
          onPlay={slowVideo}
          aria-label="Off The Grid"
        />

        <img
          src="/logo-branca.svg"
          alt=""
          className="hero-frame-overlay"
          aria-hidden="true"
        />

        <div className="hero-video-shade" aria-hidden="true" />
        <div className="hero-bottom-fade" aria-hidden="true" />

        <Wrap className="hero-content pointer-events-none relative z-20 min-h-svh text-center">
          <div className="flex flex-col items-center">
            <h1
              className="hero-entry-item max-w-[15ch] text-4xl font-medium leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
              style={{ "--entry-delay": "0ms" } as React.CSSProperties}
            >
              O seu negócio merece um <em>design à altura</em>.
            </h1>

            <p
              className="hero-entry-item mt-6 max-w-[54ch] text-base leading-relaxed text-white sm:text-lg"
              style={{ "--entry-delay": "120ms" } as React.CSSProperties}
            >
              Criamos sites, landing pages, identidades visuais, criativos e tudo o que você precisa
              para um lançamento visualmente impecável.
            </p>

            <a
              href="#contato"
              className="hero-entry-item hero-cta pointer-events-auto mt-8"
              style={{ "--entry-delay": "240ms" } as React.CSSProperties}
            >
              Começar um projeto
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Wrap>
      </Panel>
    </div>
  );
}
