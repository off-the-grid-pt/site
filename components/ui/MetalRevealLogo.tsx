"use client";

import { useEffect, useRef } from "react";
import LogoMark from "./LogoMark";

export default function MetalRevealLogo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -9999, y: -9999, opacity: 0 });
  const current = useRef({ x: -9999, y: -9999, opacity: 0 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;

    const render = () => {
      const ease = 0.12;
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;
      current.current.opacity += (target.current.opacity - current.current.opacity) * 0.1;
      stage.style.setProperty("--reveal-x", `${current.current.x}px`);
      stage.style.setProperty("--reveal-y", `${current.current.y}px`);
      stage.style.setProperty("--reveal-opacity", current.current.opacity.toFixed(3));
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      if (!finePointer.matches || reduced.matches) return;
      const rect = stage.getBoundingClientRect();
      target.current.x = event.clientX - rect.left;
      target.current.y = event.clientY - rect.top;
      target.current.opacity = 1;
    };
    const onLeave = () => {
      target.current.opacity = 0;
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={stageRef} className="metal-reveal-stage" aria-hidden="true">
      <div className="metal-reveal-logo metal-reveal-logo--base">
        <LogoMark className="h-full w-full" />
      </div>
      <div className="metal-reveal-layer">
        <div className="metal-reveal-logo metal-reveal-logo--active">
          <LogoMark className="h-full w-full" />
        </div>
      </div>
      <span className="metal-reveal-light" />
    </div>
  );
}
