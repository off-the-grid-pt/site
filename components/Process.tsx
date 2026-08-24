import { Button, Eyebrow, Panel, Wrap } from "./ui/primitives";

const ETAPAS = [
  {
    numero: "01",
    titulo: "Briefing",
    descricao: "Entendemos seu negócio, oferta, público, referências e os objetivos do projeto.",
    color: "#060E0F",
  },
  {
    numero: "02",
    titulo: "Criação",
    descricao: "Definimos conceito, direção visual e desenvolvemos as páginas, identidade e materiais previstos no projeto.",
    color: "#1E252C",
  },
  {
    numero: "03",
    titulo: "Entrega",
    descricao: "Apresentamos o projeto, refinamos os últimos detalhes e entregamos tudo organizado e pronto para ir ao ar.",
    color: "#363D43",
  },
  {
    numero: "04",
    titulo: "Suporte",
    descricao: "Prestamos suporte após a entrega para garantir que tudo seja implementado corretamente e que o seu lançamento aconteça conforme o planejado.",
    color: "#4C5357",
  },
] as const;

export default function Process() {
  return (
    <Panel id="processo" className="px-3 py-12 lg:py-25">
      <Wrap>
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-24">
          <div className="reveal flex justify-center">
            <Eyebrow icon={<span>(05)</span>}>Como trabalhamos</Eyebrow>
          </div>

          <h2 className="reveal text-3xl font-medium leading-tight tracking-[-0.04em] text-muted sm:text-4xl lg:text-5xl">
            Quatro etapas. Um processo claro do início ao fim
          </h2>

          <p className="reveal mx-auto mt-6 max-w-lg text-lg text-muted">
            Do primeiro briefing à entrega final, cada etapa é pensada para manter o projeto claro,
            ágil e alinhado com o que você está construindo.
          </p>
        </div>

        <div className="relative space-y-6">
          {ETAPAS.map((etapa, index) => (
            <div
              key={etapa.numero}
              className="sticky flex min-h-[68svh] origin-top flex-col overflow-hidden rounded-[12px] px-6 py-7 text-white sm:min-h-[72svh] sm:px-12 sm:py-10 lg:px-16 lg:py-14"
              style={{ top: `${64 + index * 16}px`, zIndex: 10 + index, backgroundColor: etapa.color }}
            >
              <img
                src={index === 0 ? "/logo-branca.svg" : "/logo-black.svg"}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute -bottom-32 -right-32 z-0 w-[min(92vw,680px)] origin-bottom-right scale-[0.6] select-none object-contain sm:-bottom-48 sm:-right-44 sm:w-[min(68vw,900px)] ${index === 0 ? "opacity-[0.05]" : "opacity-25"}`}
              />

              <div className="relative z-10 flex h-full min-h-[calc(68svh-3.5rem)] flex-1 flex-col sm:min-h-[calc(72svh-5rem)]">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/50 sm:text-sm">
                  {etapa.numero} · Etapa
                </p>
                <h3 className="mt-5 max-w-[14ch] text-5xl font-medium leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-8xl">
                  {etapa.titulo}
                </h3>
                <p className="mt-auto max-w-[58ch] pt-16 text-base leading-relaxed text-white/62 sm:text-lg lg:text-xl">
                  {etapa.descricao}
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
