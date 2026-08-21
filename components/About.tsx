import { Eyebrow, Panel, Placeholder, Wrap } from "./ui/primitives";

const REGRAS = [
  "Nenhum projeto começa sem a gente entender o que você vende e por quanto",
  "Arquivo aberto é do cliente, sempre, sem exceção",
  "Se o prazo não cabe, a gente diz não antes de começar, não na véspera",
  "A gente desenha. Tráfego e vendas ficam com quem é do ramo",
];

export default function About() {
  return (
    <Panel id="quem-somos" className="px-3 py-12 text-white lg:py-25" style={{ backgroundColor: "#1E252C" }}>
      <Wrap>
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-16">
          <div className="reveal lg:w-1/2">
            <Eyebrow className="!text-white">Quem é a Off The Grid</Eyebrow>
            <h2 className="mb-4 text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Duas pessoas, não uma lista de terceirizados.
            </h2>
            <p className="mb-4 max-w-[520px] text-lg text-white/65">
              A Off The Grid é [INSERIR: nome] e [INSERIR: nome da sócia]. Quem responde no WhatsApp
              é quem desenha, e quem desenha é quem entrega.
            </p>
            <p className="mb-4 max-w-[520px] text-lg text-white/65">
              [INSERIR: credencial real de cada um, nesta ordem: quem é e no que trabalha, uma
              especialidade estreita, um número verdadeiro que já exista hoje, e o que isso significa
              para quem contrata. Sem adjetivo de qualidade e sem número que ainda não aconteceu.]
            </p>
            <p className="max-w-[520px] text-lg text-white/65">
              O nome diz o que a gente faz. Tirar a sua marca da malha padrão do seu nicho.
            </p>
          </div>

          <div className="reveal lg:w-1/2">
            <Placeholder label="Foto da dupla — 08 · quem somos" ratio="aspect-[4/3]" />

            <div className="mt-6 rounded-[16px] bg-surface p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.06em] text-muted">
                No que a gente não abre mão
              </p>
              <ul className="space-y-2.5">
                {REGRAS.map((r) => (
                  <li key={r} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-ink" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Wrap>
    </Panel>
  );
}
