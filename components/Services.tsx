"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { Arrow, Panel, Wrap } from "./ui/primitives";
import { MockAds, MockBrand, MockDelivery, MockSite, MockSlides } from "./ui/mocks";
import { WHATSAPP_URL, href } from "@/content/contato";

/**
 * Secção 4 · O que entregamos.
 *
 * Coluna fixa à esquerda com o cabeçalho da secção e o CTA, lista de seis
 * serviços à direita. Cada linha tem numeração, título, subtítulo, lista de
 * itens em monoespaçada e uma miniatura ilustrativa.
 */

const SERVICOS: {
  n: string;
  titulo: string;
  sub: string;
  itens: string[];
  viz: ReactNode;
}[] = [
  {
    n: "01",
    titulo: "Identidade Visual",
    sub: "Uma direção visual própria para sua marca ser reconhecida em qualquer lugar que apareça.",
    itens: ["Logotipo", "Tipografia", "Paleta de cores", "Brand Book"],
    viz: <MockBrand />,
  },
  {
    n: "02",
    titulo: "Sites & Landing Pages",
    sub: "Design único e uma estrutura pensada para converter.",
    itens: ["Personalizadas", "Responsivas", "Rápidas"],
    viz: <MockSite />,
  },
  {
    n: "03",
    titulo: "Criativos",
    sub: "Criativos que unem impacto visual, clareza e consistência para destacar sua marca em cada campanha.",
    itens: ["Facebook & Instagram Ads", "Google Ads", "Otimizados para performance"],
    viz: <MockAds />,
  },
  {
    n: "04",
    titulo: "Materiais de Lançamento",
    sub: "Tudo o que a campanha precisa para manter a mesma identidade do primeiro contato até a entrega.",
    itens: ["Apresentações", "Materiais de apoio", "E-books"],
    viz: <MockSlides />,
  },
  {
    n: "05",
    titulo: "Entrega editável na sua mão",
    sub: "Tudo o que criamos é entregue de forma organizada e editável, preparado para acompanhar os próximos passos da sua marca.",
    itens: ["Arquivos abertos", "Manual de aplicação", "Templates reutilizáveis"],
    viz: <MockDelivery />,
  },
];

function Card({ s }: { s: (typeof SERVICOS)[number] }) {
  const ref = useRef<HTMLElement>(null);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      className="group relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-panel p-6 transition-colors duration-300 hover:border-ink/20"
    >
      {/* realce que segue o cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(23,23,23,0.05), transparent 70%)",
        }}
      />

      <span className="relative font-mono text-sm text-muted">/ {s.n}</span>

      <h3 className="relative mt-3 text-xl font-medium leading-snug tracking-[-0.02em]">
        {s.titulo}
      </h3>
      <p className="relative mt-1 text-base text-muted">{s.sub}</p>

      {/* itens empilhados, um por linha */}
      <ul className="relative mt-5 border-t border-line">
        {s.itens.map((it) => (
          <li
            key={it}
            className="border-b border-line py-2.5 font-mono text-xs uppercase tracking-[0.04em] text-muted"
          >
            {it}
          </li>
        ))}
      </ul>

      {/* miniatura por baixo de tudo */}
      <div className="relative mt-6 h-[132px]">{s.viz}</div>
    </article>
  );
}

export default function Services() {
  return (
    <Panel id="entregamos" className="px-3 py-12 lg:py-25">
      <Wrap>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* coluna fixa */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-sm text-muted">(03)</span>
              <span className="font-mono text-sm uppercase tracking-[0.02em] text-ink">
                O que entregamos
              </span>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </div>

            <h2 className="text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              <span className="block">Tudo o que o seu</span>
              <span className="block">lançamento precisa,</span>
              <span className="block">saindo do mesmo lugar.</span>
            </h2>

            <p className="mt-4 max-w-lg text-lg text-muted">
              Da identidade à página de vendas, criamos cada peça sob a mesma direção para que o seu
              lançamento tenha uma identidade própria do início ao fim.
            </p>

            <a
              href={href(WHATSAPP_URL, "#duvidas")}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink-btn px-6 py-[14px] font-mono text-sm uppercase leading-none tracking-[0.04em] text-white transition-colors duration-300 hover:bg-ink-hover"
            >
              Chamar no WhatsApp
              <Arrow />
            </a>
          </aside>

          {/* lista de cards, um por linha */}
          <div className="grid gap-4">
            {SERVICOS.map((s) => (
              <Card key={s.n} s={s} />
            ))}
          </div>
        </div>
      </Wrap>
    </Panel>
  );
}
