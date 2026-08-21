import { Asterisk } from "./primitives";

/**
 * Peça central do bento: marca da Off The Grid com texto em círculo a girar.
 *
 * Texto circular feito com `textPath` sobre um círculo em SVG, e a rotação é
 * CSS puro sobre o SVG inteiro. Sem canvas e sem JavaScript: é um elemento
 * decorativo e não vale custo no cliente.
 */
export default function BrandOrb() {
  const legenda = "OFF THE GRID · DESIGN PARA INFOPRODUTORES · ";

  return (
    <div className="relative flex min-h-[260px] items-center justify-center">
      {/* halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, var(--color-soft-purple), transparent 70%)",
        }}
      />

      {/* texto em círculo */}
      <svg
        viewBox="0 0 300 300"
        aria-hidden="true"
        className="absolute size-[260px] motion-safe:animate-[spin_28s_linear_infinite] sm:size-[300px]"
      >
        <defs>
          <path
            id="orb-arc"
            d="M150,150 m-118,0 a118,118 0 1,1 236,0 a118,118 0 1,1 -236,0"
            fill="none"
          />
        </defs>
        <text className="fill-muted font-mono text-[13px] uppercase tracking-[0.22em]">
          <textPath href="#orb-arc">
            {legenda.repeat(2)}
          </textPath>
        </text>
      </svg>

      {/* marca ao centro */}
      <div className="relative flex size-24 items-center justify-center rounded-full border border-line bg-panel shadow-[var(--shadow-soft)]">
        <Asterisk className="size-9 text-ink" />
      </div>

      {/* conectores para as peças à volta */}
      {[
        "left-0 top-1/2 h-px w-8 -translate-y-1/2",
        "right-0 top-1/2 h-px w-8 -translate-y-1/2",
        "left-1/2 top-0 h-8 w-px -translate-x-1/2",
        "left-1/2 bottom-0 h-8 w-px -translate-x-1/2",
      ].map((pos) => (
        <span key={pos} aria-hidden="true" className={`absolute bg-line ${pos}`} />
      ))}
    </div>
  );
}
