"use client";

import { useRef, type ReactNode } from "react";

/**
 * Peça do bento com realce que segue o cursor.
 *
 * O realce é um radial-gradient posicionado por duas custom properties que o
 * `mousemove` actualiza. Escreve-se direto no style do nó, sem estado do React,
 * para não disparar re-render a cada pixel de movimento do rato.
 */
export default function BentoTile({
  children,
  className = "",
  as: Tag = "article",
}: {
  children: ReactNode;
  className?: string;
  as?: "article" | "div";
}) {
  const ref = useRef<HTMLElement>(null);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-[24px] border border-line bg-panel transition-colors duration-300 hover:border-ink/20 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(23,23,23,0.06), transparent 70%)",
        }}
      />
      {children}
    </Tag>
  );
}
