"use client";

import { useState } from "react";
import { Eyebrow, Panel, Wrap } from "./ui/primitives";

const PERGUNTAS = [
  {
    q: "Quanto tempo leva para o projeto ficar pronto?",
    a: "O prazo varia de acordo com o escopo e a complexidade do projeto. Como trabalhamos com campanhas e lançamentos, todas as datas são alinhadas antes do início para que as entregas acompanhem o seu cronograma.",
  },
  {
    q: "Posso contratar apenas um dos serviços?",
    a: "Sim. Você pode contratar desde uma demanda específica, como uma landing page ou identidade visual, até toda a frente visual de um lançamento.",
  },
  {
    q: "Vocês trabalham apenas com infoprodutores?",
    a: "Somos especializados em negócios digitais e trabalhamos principalmente com experts, produtores e marcas. Projetos de outros segmentos também podem ser avaliados quando existir alinhamento com o nosso trabalho.",
  },
  {
    q: "Quanto custa um projeto?",
    a: "Cada projeto é único. Primeiro entendemos o que você precisa, os objetivos e o escopo da entrega. A partir disso, apresentamos uma proposta personalizada.",
  },
  {
    q: "Como faço para começar um projeto com a Off The Grid?",
    a: "É só entrar em contato pelo WhatsApp. A gente conversa, entende o que você está construindo, suas necessidades e objetivos para definir o escopo e preparar uma proposta personalizada para o seu projeto.",
  },
];

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <Panel id="duvidas" className="px-3 py-12 pb-8 lg:py-25">
      <Wrap>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <Eyebrow icon={<span>(06)</span>}>Dúvidas</Eyebrow>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              <span className="lg:block">Antes de começarmos,</span>{" "}
              <span className="lg:block">talvez a sua dúvida</span>{" "}
              <span className="lg:block">esteja aqui.</span>
            </h2>
          </div>

          <div>
            <div className="divide-y divide-line">
              {PERGUNTAS.map((p, i) => {
                const open = aberta === i;
                return (
                  <div key={p.q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setAberta(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={`faq-painel-${i}`}
                        className="flex w-full cursor-pointer items-center gap-4 py-5 text-left"
                      >
                        <span
                          className={`flex size-7 shrink-0 items-center justify-center rounded-[8px] transition-colors duration-200 ${
                            open ? "bg-ink text-white" : "text-muted"
                          }`}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}
                            aria-hidden="true"
                          >
                            <path d="M6.3 13.65 11.55 8.4 6.3 3.15" />
                          </svg>
                        </span>
                        <span className="text-lg font-medium sm:text-xl">{p.q}</span>
                      </button>
                    </h3>

                    <div
                      id={`faq-painel-${i}`}
                      hidden={!open}
                      className="max-w-xl pb-5 pl-11 text-base leading-relaxed text-muted"
                    >
                      {p.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Wrap>
    </Panel>
  );
}
