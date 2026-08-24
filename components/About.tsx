import { Eyebrow, Panel, Placeholder, Wrap } from "./ui/primitives";

export default function About() {
  return (
    <Panel id="quem-somos" className="px-3 py-12 text-white lg:py-25" style={{ backgroundColor: "#1E252C" }}>
      <Wrap>
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-16">
          <div className="reveal lg:w-1/2">
            <Eyebrow icon={<span>(06)</span>} className="!text-white">Sobre a Off The Grid</Eyebrow>
            <h2 className="mb-4 text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Design para marcas que querem sair do comum
            </h2>
            <p className="mb-4 max-w-[520px] text-lg text-white/65">
              A Off The Grid é um estúdio de design especializado em negócios digitais, criado por
              Pedro Couto e Gabriele Severo. Desenvolvemos identidades, sites, landing pages,
              criativos e materiais de campanha para experts, produtores e negócios que enxergam o
              design como parte da forma como são percebidos no mercado.
            </p>
            <p className="mb-4 max-w-[520px] text-lg text-white/65">
              Queremos construir marcas que sejam reconhecidas, lembradas e, acima de tudo,
              valorizadas. Por isso, cada decisão visual é pensada para elevar a percepção do
              negócio e construir uma imagem à altura do que ele entrega.
            </p>
          </div>

          <div className="reveal lg:w-1/2">
            <Placeholder label="Foto da dupla — 06 · quem somos" ratio="aspect-[4/3]" />
          </div>
        </div>
      </Wrap>
    </Panel>
  );
}
