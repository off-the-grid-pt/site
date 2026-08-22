import { Button, Eyebrow, Panel, Wrap } from "./ui/primitives";

/**
 * Secção 3 · Uma nova forma de construir sua presença digital.
 *
 * Usa o mesmo padrão de layout da secção 4 (Deliverables): cabeçalho centrado
 * mais cards que colam e empilham no scroll, com as tintas pastel a alternar.
 */

const PILARES = [
  {
    n: "01",
    rotulo: "Estratégia",
    titulo: "A oferta antes do layout",
    texto:
      "Antes de desenhar, a gente entende o que você vende, por quanto e para quem. Entende também a objeção que trava a venda. Sem isso, design vira decoração.",
    color: "#060E0F",
  },
  {
    n: "02",
    rotulo: "Design",
    titulo: "Uma direção visual só",
    texto:
      "Mesma tipografia, mesma cor, mesma voz no anúncio, na página e no perfil. O lead reconhece a marca no feed e reconhece de novo quando clica, que é o que segura a atenção nos primeiros segundos.",
    color: "#1E252C",
  },
  {
    n: "03",
    rotulo: "Tecnologia",
    titulo: "Leve e rápida no celular",
    texto:
      "Um layout bonito que demora cinco segundos para abrir perde o lead antes da primeira linha. A página é construída para carregar rápido e para você conseguir editar depois.",
    color: "#363D43",
  },
  {
    n: "04",
    rotulo: "Consistência",
    titulo: "Feita para continuar funcionando",
    texto:
      "Você recebe um sistema visual claro, arquivos organizados e orientação de uso. Assim, a marca continua coerente quando a campanha muda, a equipe cresce e o próximo lançamento começa.",
    color: "#4C5357",
  },
];

export default function Philosophy() {
  return (
    <Panel id="filosofia" className="px-3 py-12 lg:py-25">
      <Wrap>
        <div className="mx-auto mb-16 max-w-6xl text-center lg:mb-24">
          <div className="reveal flex justify-center">
            <Eyebrow icon={<span>(03)</span>}>Uma nova forma de construir</Eyebrow>
          </div>

          <h2 className="text-3xl font-medium leading-tight tracking-[-0.04em] text-muted sm:text-4xl lg:whitespace-nowrap lg:text-[clamp(2.25rem,3.6vw,3rem)]">
            Design para infoprodutor{" "}
            <span className="text-ink">não é peça avulsa.</span>
          </h2>

          <p className="reveal mx-auto mt-6 max-w-lg text-lg text-muted">
            Estratégia, design e tecnologia na mesma mesa, do primeiro story até o botão de
            checkout. A gente não começa pelo layout, começa pelo que você vende.
          </p>
        </div>

        {/* cards que colam e empilham no scroll */}
        <div className="relative space-y-6">
          {PILARES.map((p, i) => (
            <div
              key={p.n}
              className="sticky flex min-h-[68svh] origin-top flex-col overflow-hidden rounded-[12px] px-6 py-7 text-white sm:min-h-[72svh] sm:px-12 sm:py-10 lg:px-16 lg:py-14"
              style={{ top: `${64 + i * 16}px`, zIndex: 10 + i, backgroundColor: p.color }}
            >
              <img
                src={i === 0 ? "/logo-branca.svg" : "/logo-black.svg"}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute -bottom-32 -right-32 z-0 w-[min(92vw,680px)] origin-bottom-right scale-[0.6] select-none object-contain sm:-bottom-48 sm:-right-44 sm:w-[min(68vw,900px)] ${i === 0 ? "opacity-[0.05]" : "opacity-25"}`}
              />

              <div className="relative z-10 flex h-full min-h-[calc(68svh-3.5rem)] flex-1 flex-col sm:min-h-[calc(72svh-5rem)]">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/50 sm:text-sm">
                  {p.n} · {p.rotulo}
                </p>
                <h3 className="mt-5 max-w-[14ch] text-5xl font-medium leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-8xl">
                  {p.titulo}
                </h3>
                <p className="mt-auto max-w-[58ch] pt-16 text-base leading-relaxed text-white/62 sm:text-lg lg:text-xl">
                  {p.texto}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button href="#contato" withArrow>
            Começar agora
          </Button>
        </div>
      </Wrap>
    </Panel>
  );
}
