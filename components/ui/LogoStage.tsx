"use client";

import { useEffect, useRef } from "react";

type Particle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
};

export default function LogoStage({ className = "" }: { className?: string }) {
  const orbRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const orb = orbRef.current as HTMLDivElement;
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!orb || !canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mouse = { x: -9999, y: -9999, radius: 62, active: false };
    const image = new Image();
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frameId: number | null = null;
    let disposed = false;

    function drawAtRest() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.homeX, particle.homeY, 1.8, 1.8);
      }
    }

    function scatter() {
      for (const particle of particles) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * width * 0.34;
        particle.x = width / 2 + Math.cos(angle) * distance;
        particle.y = height / 2 + Math.sin(angle) * distance;
        particle.vx = Math.cos(angle) * 1.5;
        particle.vy = Math.sin(angle) * 1.5;
      }
    }

    function animate() {
      if (!ctx || disposed) return;
      ctx.clearRect(0, 0, width, height);
      let moving = false;

      for (const particle of particles) {
        particle.vx += (particle.homeX - particle.x) * 0.055;
        particle.vy += (particle.homeY - particle.y) * 0.055;

        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < mouse.radius * mouse.radius) {
            const distance = Math.sqrt(distanceSquared) || 0.001;
            const force = (1 - distance / mouse.radius) * 5.5;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        particle.vx *= 0.86;
        particle.vy *= 0.86;
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (Math.abs(particle.vx) + Math.abs(particle.vy) > 0.08) moving = true;

        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, 1.8, 1.8);
      }

      frameId = moving || mouse.active ? requestAnimationFrame(animate) : null;
    }

    function kick() {
      if (frameId === null && !reducedQuery.matches) frameId = requestAnimationFrame(animate);
    }

    function build() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height || !image.naturalWidth) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sample = document.createElement("canvas");
      sample.width = width;
      sample.height = height;
      const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return;

      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
      const imageWidth = image.naturalWidth * scale;
      const imageHeight = image.naturalHeight * scale;
      sampleCtx.drawImage(image, (width - imageWidth) / 2, (height - imageHeight) / 2, imageWidth, imageHeight);
      const pixels = sampleCtx.getImageData(0, 0, width, height).data;
      const step = width > 300 ? 3 : 2;
      const nextParticles: Particle[] = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const pixel = (y * width + x) * 4;
          const alpha = pixels[pixel + 3];
          if (alpha > 120) {
            nextParticles.push({
              homeX: x,
              homeY: y,
              x,
              y,
              vx: 0,
              vy: 0,
              color: `rgba(255,255,255,${(alpha / 255).toFixed(2)})`,
            });
          }
        }
      }

      particles = nextParticles;
      mouse.radius = Math.max(48, width * 0.22);
      drawAtRest();
    }

    function onPointerEnter() {
      if (!finePointerQuery.matches || reducedQuery.matches) return;
      orb.classList.add("is-hover");
      scatter();
      kick();
    }

    function onPointerMove(event: PointerEvent) {
      if (!finePointerQuery.matches || reducedQuery.matches) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
      const glow = glowRef.current;
      if (glow) {
        const glowRect = glow.getBoundingClientRect();
        glow.style.setProperty("--gx", `${event.clientX - glowRect.left}px`);
        glow.style.setProperty("--gy", `${event.clientY - glowRect.top}px`);
      }
      kick();
    }

    function onPointerLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      orb.classList.remove("is-hover");
      kick();
    }

    image.addEventListener("load", build);
    image.src = "/logo.svg";
    if (image.complete) build();

    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointerenter", onPointerEnter);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      disposed = true;
      if (frameId !== null) cancelAnimationFrame(frameId);
      image.removeEventListener("load", build);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={orbRef} className={`hero-logo-orb ${className}`} aria-label="Off The Grid">
      <img className="hero-logo-orb__mark" src="/logo.svg" alt="" aria-hidden="true" />
      <span ref={glowRef} className="hero-logo-orb__cursor-glow" aria-hidden="true" />
      <canvas ref={canvasRef} className="hero-logo-orb__canvas" aria-label="Off The Grid" />
    </div>
  );
}
