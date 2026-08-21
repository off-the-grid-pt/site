import { Eyebrow, Panel, Placeholder, Wrap } from "./ui/primitives";

/**
 * Secção 5 · Projetos em destaque.
 *
 * Decisão do Pedro (2026-07-31): a secção fica escrita e construída, mas FORA DO AR
 * no lançamento, porque não existe projeto entregue nem autorização de cliente.
 * Para publicar, importar em app/page.tsx e acrescentar a âncora ao menu.
 */

const SLOTS = [
  { label: "Projeto em destaque — imagem principal", ratio: "aspect-[3/4]" },
  { label: "Projeto 02", ratio: "aspect-square" },
  { label: "Projeto 03", ratio: "aspect-square" },
];

export default function Showcase() {
  return (
    <Panel id="projetos" className="px-3 py-12 lg:py-25">
      <Wrap>
        <div className="mx-auto mb-10 max-w-lg text-center sm:mb-16">
          <div className="flex justify-center">
            <Eyebrow>Projetos em destaque</Eyebrow>
          </div>
          <h2 className="text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Trabalho entregue, não mockup.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-[24px] bg-soft-green px-8 py-5 sm:col-span-2 sm:px-12 sm:py-9 lg:col-span-9">
            <p className="mb-8 text-lg font-medium sm:text-3xl lg:mb-0">
              [INSERIR: uma linha sobre o problema que o projeto resolveu. Sem adjetivo. Se houver
              número autorizado pelo cliente, ele entra aqui.]
            </p>
            <div>
              <span className="block text-lg text-muted">[INSERIR: nome do cliente]</span>
              <span className="block text-lg text-muted">[INSERIR: o que foi feito]</span>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <Placeholder label={SLOTS[0].label} ratio="aspect-[3/4]" className="h-full" />
          </div>

          {[1, 2].map((i) => (
            <div key={i} className="rounded-[24px] bg-surface p-6 lg:col-span-4">
              <Placeholder label={SLOTS[i].label} ratio="aspect-[16/10]" className="mb-6" />
              <p className="text-sm leading-relaxed text-muted">
                [INSERIR: o que foi entregue e o que mudou para o cliente.]
              </p>
              <p className="mt-6 font-medium">[INSERIR: nome do cliente]</p>
              <p className="text-sm text-muted">[INSERIR: tipo de trabalho]</p>
            </div>
          ))}

          <div className="rounded-[24px] bg-surface p-6 sm:col-span-2 lg:col-span-4">
            <Placeholder label="Projeto 04" ratio="aspect-[16/10]" className="mb-6" />
            <p className="text-sm leading-relaxed text-muted">
              [INSERIR: o que foi entregue e o que mudou para o cliente.]
            </p>
            <p className="mt-6 font-medium">[INSERIR: nome do cliente]</p>
            <p className="text-sm text-muted">[INSERIR: tipo de trabalho]</p>
          </div>
        </div>
      </Wrap>
    </Panel>
  );
}
