"use client";

import { useState } from "react";
import { Eyebrow, Panel, Wrap } from "./ui/primitives";

const PERGUNTAS = [
  {
    q: "Quanto custa um projeto?",
    a: "Depende do escopo. [CONFIRMAR: divulgar faixa mínima ou não.] Você recebe o valor fechado por escrito antes de qualquer trabalho começar.",
  },
  {
    q: "Quanto tempo leva?",
    a: "Um projeto completo leva em média [CONFIRMAR: X semanas]. Depois da conversa inicial a gente confirma a data e ela entra no escopo por escrito.",
  },
  {
    q: "Vocês trabalham com quem está começando do zero?",
    a: "Depende do zero. Se você já tem produto e sabe para quem vende, sim. Se a oferta ainda não está definida, esse não é o momento certo para contratar design.",
  },
  {
    q: "Vocês também cuidam do tráfego?",
    a: "Não. A gente desenha marca, página e criativo. A mídia fica com o seu gestor, e entregamos as peças nos formatos que ele pedir.",
  },
  {
    q: "Posso pedir ajuste depois da entrega?",
    a: "Cada etapa tem [CONFIRMAR: número] rodadas de ajuste incluídas. Depois da entrega final, [CONFIRMAR: política de ajustes e suporte].",
  },
  {
    q: "Em que plataforma o site é entregue?",
    a: "[CONFIRMAR: plataforma]. Você recebe o acesso e o material para editar sozinho ou passar para outro dev.",
  },
  {
    q: "Preciso ter identidade visual antes de fazer o site?",
    a: "Não, mas ajuda. Quem chega sem marca definida começa pela identidade, e a página sai em cima dela na sequência.",
  },
];

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <Panel id="duvidas" className="px-3 py-12 pb-8 lg:py-25">
      <Wrap>
        <div className="flex flex-col justify-between gap-10 lg:flex-row xl:gap-16">
          <div className="xl:w-4/12">
            <Eyebrow icon={<span>(07)</span>}>Dúvidas</Eyebrow>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              As perguntas que aparecem toda semana no WhatsApp
            </h2>
          </div>

          <div className="xl:w-7/12">
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
