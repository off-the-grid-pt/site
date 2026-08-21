import type { ReactNode } from "react";

/**
 * Card com gradiente e padrão de grade.
 *
 * Portado de um componente React de comunidade para a stack deste projecto
 * (Next 15 + Tailwind v4, sem shadcn e sem dark mode).
 *
 * Duas correcções face ao original:
 *
 * 1. O original sorteia as posições dos quadrados com `Math.random()` durante o
 *    render. Com renderização no servidor isso produz marcação diferente no
 *    servidor e no cliente, o que provoca erro de hidratação e faz o padrão
 *    saltar ao carregar. Aqui as posições são fixas e passadas por props.
 * 2. O original usa `useId()`, o que obrigaria a marcar o componente como
 *    client. O id do padrão passa a ser derivado de uma chave estável, e o
 *    componente fica a render no servidor, sem JavaScript no browser.
 */

type Ponto = [x: number, y: number];

export function GridPattern({
  id,
  width,
  height,
  squares,
  className,
}: {
  id: string;
  width: number;
  height: number;
  squares: Ponto[];
  className?: string;
}) {
  const x = -12;
  const y = 4;

  return (
    <svg aria-hidden="true" className={className}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(([sx, sy]) => (
          <rect
            key={`${sx}-${sy}`}
            strokeWidth="0"
            width={width + 1}
            height={height + 1}
            x={sx * width}
            y={sy * height}
          />
        ))}
      </svg>
    </svg>
  );
}

export function Grid({ id, pattern, size = 20 }: { id: string; pattern: Ponto[]; size?: number }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 z-10 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/30 to-zinc-300/30 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
        <GridPattern
          id={id}
          width={size}
          height={size}
          squares={pattern}
          className="absolute inset-0 h-full w-full fill-black/10 stroke-black/10 mix-blend-overlay transition-colors duration-300 group-hover:fill-white/15 group-hover:stroke-white/15"
        />
      </div>
    </div>
  );
}

export function GridCard({
  id,
  pattern,
  children,
  className = "",
}: {
  id: string;
  pattern: Ponto[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[24px] bg-gradient-to-b from-canvas to-panel p-6 ${className}`}
    >
      {/* Inversão no hover.
          Camada sólida escura que aparece por cima do gradiente. Gradientes não
          interpolam em CSS: animar `opacity` de uma camada dá uma transição
          suave, trocar o gradiente daria um salto seco. Fica por baixo da grade
          (z-10) e do conteúdo (z-20). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <Grid id={id} pattern={pattern} size={20} />
      {children}
    </div>
  );
}
