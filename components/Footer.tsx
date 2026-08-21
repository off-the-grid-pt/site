"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { Arrow, Asterisk } from "./ui/primitives";
import MagicText from "./ui/MagicText";
import { WHATSAPP_URL, href } from "@/content/contato";

/**
 * Rodapé cinemático · Off The Grid
 *
 * O rodapé ocupa um ecrã inteiro e é revelado como uma cortina: fica `fixed`
 * por baixo da página e o invólucro em fluxo recorta-o com `clip-path`. Ver o
 * bloco "RODAPÉ CINEMÁTICO" em app/globals.css, onde está toda a mecânica.
 *
 * Abaixo de 640px a cortina desliga-se e o rodapé volta ao fluxo normal: num
 * telemóvel um bloco fixo com esta densidade transborda o ecrã, e o efeito não
 * compensa o custo.
 *
 * O rodapé anterior está em FooterClassic.tsx, fora do fluxo da página. Pode
 * ser apagado assim que este for aprovado.
 */

/** Itens da faixa em movimento. Saem dos quatro serviços da copy aprovada. */
const FAIXA = [
  "Sites e landing pages",
  "Identidade visual",
  "Materiais de social media",
  "Materiais de lançamento",
];

/* ------------------------------------------------------------
   Faixa inclinada
   ------------------------------------------------------------ */
function FaixaItem() {
  return (
    <div className="flex shrink-0 items-center">
      {FAIXA.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap px-6">
          {item}
          <Asterisk className="ml-12 size-3 text-white/35" />
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   Pill magnética

   O `transform` vive no invólucro e nunca no link: o link mantém as suas
   transições de cor e de sombra sem entrar em conflito, e o alvo de clique
   não se deforma.
   ------------------------------------------------------------ */
function Magnetico({
  children,
  forca = 0.35,
  className = "",
}: {
  children: ReactNode;
  /** 0 a 1: fracção da distância ao centro que o elemento percorre. */
  forca?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const activo = useRef(false);

  useEffect(() => {
    activo.current =
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function mover(e: React.PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el || !activo.current) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.dataset.solto = "false";
    el.style.transform = `perspective(600px) translate3d(${x * forca}px, ${y * forca}px, 0) rotateX(${-y * 0.12}deg) rotateY(${x * 0.12}deg) scale(1.04)`;
  }

  function sair() {
    const el = ref.current;
    if (!el || !activo.current) return;
    el.dataset.solto = "true";
    el.style.transform = "";
  }

  return (
    <span
      ref={ref}
      className={`footer-magnet ${className}`}
      onPointerMove={mover}
      onPointerLeave={sair}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------
   Rodapé
   ------------------------------------------------------------ */
export default function Footer() {
  const curtain = useRef<HTMLDivElement>(null);

  // Progresso da cortina: 0 quando o topo do invólucro toca o fundo do ecrã,
  // 1 quando está revelado por inteiro. Escrito numa variável CSS, para que
  // toda a animação viva no CSS e este componente só publique o número.
  useEffect(() => {
    const el = curtain.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let continuo = false; // rodapé à vista: vale a pena medir a cada fotograma

    const medir = () => {
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (r.height || 1);
      el.style.setProperty("--curtain-raw", String(Math.min(1, Math.max(0, p))));
      raf = continuo ? requestAnimationFrame(medir) : 0;
    };

    /** Um fotograma avulso, ou a entrada no ciclo se o rodapé estiver à vista. */
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };

    // O observador liga e desliga o ciclo, mas a medição nunca depende de um
    // evento chegar: quem aterra directamente no fim da página (recarregar com
    // a posição restaurada, saltar por âncora) não gera scroll nenhum, e o
    // rodapé ficaria preso no estado inicial, que é o de invisível.
    const io = new IntersectionObserver(([entrada]) => {
      continuo = entrada.isIntersecting;
      pedir();
    });

    io.observe(el);
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    medir();

    return () => {
      io.disconnect();
      continuo = false;
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function subir() {
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: suave ? "smooth" : "auto" });
  }

  return (
    // A âncora `#contato` vive aqui, no invólucro, e não no <footer>: quatro
    // botões do site apontam para ela, e uma âncora num elemento `fixed` não
    // desloca a página — ficariam todos inertes.
    <div ref={curtain} id="contato" className="footer-curtain relative">
      <footer
        className="footer-stage flex min-h-svh w-full flex-col justify-between overflow-hidden bg-black py-10 text-white sm:py-0"
      >
        {/* ---- fundo ---- */}
        <div
          aria-hidden="true"
          className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] rounded-[50%] blur-[80px]"
        />
        <div aria-hidden="true" className="footer-grid-bg pointer-events-none absolute inset-0 z-0" />
        <div
          aria-hidden="true"
          className="footer-giant pointer-events-none absolute -bottom-[3vh] left-1/2 z-0 select-none whitespace-nowrap"
        >
          OFF THE GRID
        </div>

        {/* ---- faixa inclinada ---- */}
        <div className="relative z-10 -rotate-2 scale-110 border-y border-white/10 bg-black/50 py-3 backdrop-blur-md sm:mt-14">
          <div className="animate-marquee flex w-max font-mono text-xs uppercase tracking-[0.24em] text-neutral-400">
            <FaixaItem />
            <FaixaItem />
          </div>
        </div>

        {/* ---- chamada final ---- */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-7">
          <p
            className="footer-rise mb-5 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.02em] text-neutral-400"
            style={{ "--atraso": 0.2, "--rise": "24px" } as React.CSSProperties}
          >
            <Asterisk className="size-4" />
            Sem formulário e sem call obrigatória
          </p>

          <h2
            className="footer-rise footer-title-glow mb-9 max-w-[18ch] text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-4xl lg:text-6xl"
            style={{ "--atraso": 0.35 } as React.CSSProperties}
          >
            <MagicText>O próximo lançamento não precisa parecer com o anterior.</MagicText>
          </h2>

          <div
            className="footer-rise flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
            style={{ "--atraso": 0.55 } as React.CSSProperties}
          >
            <Magnetico>
              <a
                href={href(WHATSAPP_URL, "#duvidas")}
                className="footer-pill group inline-flex items-center gap-2 rounded-full px-9 py-4 font-mono text-sm uppercase leading-none tracking-[0.04em] text-white"
              >
                Chamar no WhatsApp
                <Arrow />
              </a>
            </Magnetico>

            <Magnetico>
              <Link
                href="#entregamos"
                className="footer-pill inline-flex items-center rounded-full px-9 py-4 font-mono text-sm uppercase leading-none tracking-[0.04em] text-neutral-300"
              >
                Ver o que entregamos
              </Link>
            </Magnetico>
          </div>
        </div>

        {/* ---- barra final: só o voltar ao topo ---- */}
        <div className="relative z-20 flex w-full justify-end px-4 pb-2 sm:px-7 sm:pb-8">
          <Magnetico forca={0.4}>
            <button
              type="button"
              onClick={subir}
              aria-label="Voltar ao topo"
              className="footer-pill group flex size-12 items-center justify-center rounded-full text-neutral-400"
            >
              <svg
                className="size-5 transition-transform duration-300 group-hover:-translate-y-1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </Magnetico>
        </div>
      </footer>
    </div>
  );
}
