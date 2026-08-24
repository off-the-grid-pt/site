import { Button, Eyebrow, Panel, Wrap } from "./ui/primitives";

const ETAPAS = [
  {
    numero: "01",
    titulo: "Briefing",
    descricao: "Entendemos seu negócio, sua oferta, seu público, suas referências e os objetivos do projeto. Essa etapa nos dá o contexto necessário para tomar decisões mais precisas e construir algo realmente alinhado ao que você precisa.",
    color: "#060E0F",
  },
  {
    numero: "02",
    titulo: "Criação",
    descricao: "Transformamos tudo o que entendemos em conceito, direção visual e design. A partir daí, desenvolvemos cada peça do projeto para que todo o lançamento tenha uma linguagem visual forte, consistente e reconhecível.",
    color: "#1E252C",
  },
  {
    numero: "03",
    titulo: "Entrega",
    descricao: "Apresentamos o projeto, explicamos as principais decisões e refinamos os últimos detalhes a partir do seu feedback. Depois, organizamos todos os materiais e deixamos tudo preparado para ser implementado e ir ao ar.",
    color: "#363D43",
  },
  {
    numero: "04",
    titulo: "Suporte",
    descricao: "Prestamos suporte após a entrega para acompanhar a implementação, solucionar eventuais ajustes e garantir que tudo seja aplicado corretamente para que o seu lançamento aconteça conforme o planejado.",
    color: "#4C5357",
  },
] as const;

export default function Process() {
  return (
    <Panel id="processo" className="px-3 py-12 lg:py-25">
      <Wrap>
        <div className="mx-auto mb-16 max-w-6xl text-center lg:mb-20">
          <div className="reveal flex justify-center">
            <Eyebrow icon={<span>(04)</span>}>Como trabalhamos</Eyebrow>
          </div>

          <h2 className="reveal text-3xl font-medium leading-tight tracking-[-0.04em] text-ink sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
            Quatro etapas. Um processo claro do início ao fim
          </h2>

          <p className="reveal mx-auto mt-6 max-w-3xl text-lg text-muted lg:text-xl">
            Do primeiro briefing à entrega final, cada etapa é pensada para manter o projeto claro,
            ágil e alinhado com o que você está construindo.
          </p>
        </div>

        <div className="relative space-y-6">
          {ETAPAS.map((etapa, index) => (
            <div
              key={etapa.numero}
              className="sticky flex min-h-[58svh] origin-top flex-col overflow-hidden rounded-[12px] px-6 py-7 text-white sm:min-h-[62svh] sm:px-12 sm:py-9 lg:px-16 lg:py-12"
              style={{ top: `${64 + index * 16}px`, zIndex: 10 + index, backgroundColor: etapa.color }}
            >
              <img
                src={index === 0 ? "/logo-branca.svg" : "/logo-black.svg"}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute -bottom-28 -right-28 z-0 w-[min(79vw,585px)] origin-bottom-right scale-[0.6] select-none object-contain sm:-bottom-40 sm:-right-36 sm:w-[min(59vw,775px)] ${index === 0 ? "opacity-[0.05]" : "opacity-25"}`}
              />

              <div className="relative z-10 flex h-full min-h-[calc(58svh-3.5rem)] flex-1 flex-col sm:min-h-[calc(62svh-4.5rem)]">
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
            Solicitar um orçamento
          </Button>
        </div>
      </Wrap>
    </Panel>
  );
}
