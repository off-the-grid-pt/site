"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Arrow, Panel, Wrap } from "./ui/primitives";
import { WHATSAPP_URL, href } from "@/content/contato";

const ETAPAS = [
  {
    numero: "01",
    titulo: "Conversa",
    descricao:
      "Você chama no WhatsApp, conta o que vende e para quem. A gente diz se é um projeto para nós.",
    tags: [["Briefing", "Objetivos", "Contexto"], ["Público", "Oferta", "Momento"], ["Diagnóstico", "Fit", "Próximos passos"]],
  },
  {
    numero: "02",
    titulo: "Escopo por escrito",
    descricao: "Você recebe escopo, prazo e valor fechado antes de qualquer trabalho começar.",
    tags: [["Escopo", "Entregáveis", "Prioridades"], ["Cronograma", "Etapas", "Prazos"], ["Investimento", "Contrato", "Aprovação"]],
  },
  {
    numero: "03",
    titulo: "Criação",
    descricao: "O projeto chega em entregas parciais e você comenta em cima de cada uma.",
    tags: [["Direção visual", "Conceito", "Referências"], ["Design", "Aplicações", "Protótipo"], ["Feedback", "Ajustes", "Refinamento"]],
  },
  {
    numero: "04",
    titulo: "Entrega",
    descricao: "Arquivos abertos, manual de uso e uma call de passagem para a sua equipe.",
    tags: [["Arquivos abertos", "Exportações", "Organização"], ["Manual de uso", "Aplicação", "Consistência"], ["Handoff", "Call final", "Suporte"]],
  },
] as const;

function Tag({ label, magnified = false }: { label: string; magnified?: boolean }) {
  return (
    <div
      className={`flex w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.04em] ${
        magnified
          ? "ml-7 scale-125 border-ink/20 bg-white font-medium text-ink shadow-sm"
          : "border-line/80 bg-white/65 text-muted backdrop-blur-sm"
      }`}
    >
      <span className={`size-1.5 rounded-full ${magnified ? "bg-ink" : "bg-faint"}`} />
      {label}
    </div>
  );
}

function MovingRows({
  rows,
  magnified = false,
}: {
  rows: ReadonlyArray<ReadonlyArray<string>>;
  magnified?: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-5">
      {rows.map((row, rowIndex) => (
        <motion.div
          key={`${magnified ? "zoom" : "base"}-${rowIndex}`}
          className="flex w-max gap-4"
          animate={{ x: rowIndex % 2 === 0 ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...row, ...row, ...row].map((label, index) => (
            <Tag key={`${label}-${index}`} label={label} magnified={magnified} />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function MagnifyingLens({ size = 94 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" aria-hidden="true">
      <path d="M365.424 335.392 342.24 312.192 311.68 342.736 334.88 365.936Z" fill="#B0BDC6" />
      <path d="M358.08 342.736 334.88 319.552 319.04 335.392 342.24 358.584Z" fill="#DFE9EF" />
      <path
        d="M332 332C260 404 142.4 404 69.6 332-2.4 260-2.4 142.4 69.6 69.6 141.6-3.2 259.2-2.4 332 69.6 404.8 142.4 404.8 260 332 332Zm-16.8-244.8C252 24 150.4 24 88 87.2 24.8 150.4 24.8 252 88 314.4c63.2 63.2 164.8 63.2 227.2 0 62.4-62.4 62.4-164 0-227.2Z"
        fill="#DFE9EF"
      />
      <path
        d="M319.2 319.2C254.4 384 148.8 384 83.2 319.2 18.4 254.4 18.4 148.8 83.2 83.2 148 18.4 253.6 18.4 319.2 83.2 384 148.8 384 254.4 319.2 319.2Zm-8.8-227.2C250.4 32 152 32 92 92 32 152 32 250.4 92 310.4c60 60 158.4 60 218.4 0 60-60 60-158.4 0-218.4Z"
        fill="#7A858C"
      />
      <path d="m484.104 428.784-110.304-110.312-55.44 55.44 110.312 110.304Z" fill="#171717" />
      <path d="m471.664 441.224-110.32-110.296-30.544 30.552 110.32 110.28Z" fill="#575B5E" />
      <path d="M495.2 423.2c8.8 8.8-62.4 80.8-72 72l-5.6-5.6c-8.8-8.8 62.4-80.8 72-72Z" fill="#B0BDC6" />
    </svg>
  );
}

function MagnifiedStepCard({ etapa }: { etapa: (typeof ETAPAS)[number] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  const clipPath = useMotionTemplate`circle(31px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px))`;
  const inverseMask = useMotionTemplate`radial-gradient(circle 31px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px), transparent 100%, black 100%)`;

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-line bg-white p-2 shadow-[0_18px_55px_rgba(23,23,23,0.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(23,23,23,0.12)] sm:rounded-[2.5rem]">
      <div
        ref={containerRef}
        className="relative h-[210px] w-full overflow-hidden rounded-[1.6rem] bg-canvas sm:h-[240px] sm:rounded-[2rem]"
      >
        <motion.div style={{ WebkitMaskImage: inverseMask, maskImage: inverseMask }} className="h-full">
          <MovingRows rows={etapa.tags} />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-10 select-none"
          style={{ clipPath }}
        >
          <MovingRows rows={etapa.tags} magnified />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 cursor-grab drop-shadow-xl active:cursor-grabbing"
          drag
          dragMomentum={false}
          dragConstraints={containerRef}
          style={{ x: lensX, y: lensY }}
          aria-label="Arraste a lupa para explorar o processo"
        >
          <div className="relative">
            <MagnifyingLens />
            <span className="pointer-events-none absolute left-[7px] top-[7px] size-[60px] rounded-full bg-white/10" />
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/4 bg-gradient-to-r from-canvas to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/4 bg-gradient-to-l from-canvas to-transparent" />
      </div>

      <div className="px-5 pb-6 pt-5 sm:px-7 sm:pb-8">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
          Etapa {etapa.numero}
        </span>
        <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em]">{etapa.titulo}</h3>
        <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-muted">{etapa.descricao}</p>
      </div>
    </article>
  );
}

export default function Process() {
  return (
    <Panel id="processo" className="px-3 py-12 lg:py-25">
      <Wrap>
        <div className="mb-12 lg:mb-16">
          <div className="reveal mb-4 flex items-center gap-3">
            <span className="font-mono text-sm text-muted">(07)</span>
            <span className="font-mono text-sm uppercase tracking-[0.02em] text-ink sm:text-base">
              Como trabalhamos
            </span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
          <h2 className="reveal max-w-[20ch] text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Quatro etapas. Você sabe onde o projeto está em cada uma.
          </h2>
          <p className="reveal mt-4 max-w-2xl text-lg text-muted">
            Em cada etapa você sabe o que sai da nossa mão e quando. Prazo médio de um projeto
            completo: [CONFIRMAR: X semanas].
          </p>
        </div>

        <div className="reveal grid grid-cols-1 gap-5 lg:grid-cols-2">
          {ETAPAS.map((etapa) => (
            <MagnifiedStepCard key={etapa.numero} etapa={etapa} />
          ))}
        </div>

        <div className="reveal mt-5 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-ink px-6 py-7 sm:flex-row sm:items-center sm:px-8 sm:py-8">
          <div>
            <h3 className="text-2xl font-medium tracking-[-0.03em] text-white">
              Pronto para começar seu projeto?
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Da conversa à entrega, cuidamos de todo o processo.
            </p>
          </div>
          <a
            href={href(WHATSAPP_URL, "#duvidas")}
            className="group inline-flex shrink-0 items-center gap-2 rounded-[8px] bg-white px-5 py-[14px] font-mono text-sm uppercase leading-none tracking-[0.04em] text-ink transition-colors duration-300 hover:bg-neutral-200"
          >
            Chamar no WhatsApp
            <Arrow />
          </a>
        </div>
      </Wrap>
    </Panel>
  );
}
