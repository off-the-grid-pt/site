import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* ---------- Painel de secção ---------- */
/**
 * ATENÇÃO: o painel NÃO leva `overflow-hidden` por omissão.
 *
 * Um elemento com `position: sticky` deixa de colar assim que qualquer
 * antepassado tem `overflow` diferente de `visible`: esse antepassado passa a
 * ser o contentor de scroll do sticky e, como não faz scroll, o elemento
 * comporta-se como `relative`. As secções 3 e 4 dependem de sticky.
 *
 * Quem precisar de recorte (conteúdo que sangra para fora dos cantos
 * arredondados) passa `overflow-hidden` no `className`, e só se não tiver
 * sticky lá dentro.
 */
export function Panel({
  children,
  className = "",
  id,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section id={id} className={`relative min-h-svh bg-panel ${className}`} {...props}>
      {children}
    </section>
  );
}

/* ---------- Container ---------- */
export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-7 ${className}`}>{children}</div>;
}

/* ---------- Eyebrow: ícone + rótulo mono em caixa alta ---------- */
export function Eyebrow({
  children,
  icon,
  className = "",
  style,
}: {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p
      className={`mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.02em] text-ink sm:text-base ${className}`}
      style={style}
    >
      {icon ?? <Asterisk className="size-5 shrink-0" />}
      {children}
    </p>
  );
}

/* ---------- Seta com troca na diagonal ---------- */
function ArrowGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 15 15 5" />
      <path d="M7.5 5H15v7.5" />
    </svg>
  );
}

export function Arrow() {
  return (
    <span className="relative inline-flex size-5 overflow-hidden" aria-hidden="true">
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full">
        <ArrowGlyph />
      </span>
      <span className="absolute inset-0 flex -translate-x-full translate-y-full items-center justify-center transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
        <ArrowGlyph />
      </span>
    </span>
  );
}

/* ---------- Botões ---------- */
type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  withArrow?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  withArrow = false,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-[16px] border font-mono text-sm uppercase leading-none tracking-[0.04em] transition-colors duration-300";
  const sizes = size === "sm" ? "px-[18px] py-3" : "px-5 py-[14px]";
  const variants =
    variant === "primary"
      ? "border-ink-btn bg-ink-btn text-white hover:border-ink-hover hover:bg-ink-hover"
      : "border-ink bg-panel text-ink hover:bg-canvas";

  return (
    <Link href={href} className={`${base} ${sizes} ${variants} ${className}`}>
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}

/* ---------- Placeholder de imagem ----------
   Todas as imagens do site entram por aqui até o Pedro fornecer os ficheiros
   reais. Substituir por <Image src=... /> do next/image quando existirem.     */
export function Placeholder({
  label,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`flex ${ratio} w-full items-center justify-center rounded-[16px] border border-dashed border-line bg-surface ${className}`}
      role="img"
      aria-label={`Imagem por definir: ${label}`}
    >
      <span className="px-4 text-center font-mono text-xs uppercase tracking-[0.06em] text-faint">
        {label}
      </span>
    </div>
  );
}

/* ---------- Asterisco de quatro pontas (marca gráfica) ---------- */
export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="M50 4c1.4 23.6 19 41.2 42.6 42.6v6.8C69 54.8 51.4 72.4 50 96c-1.4-23.6-19-41.2-42.6-42.6v-6.8C31 45.2 48.6 27.6 50 4Z" />
    </svg>
  );
}
