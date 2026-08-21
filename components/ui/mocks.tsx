/**
 * Miniaturas ilustrativas de cada serviço.
 *
 * Construídas só com divs e tokens do projecto: sem imagens, sem SVG externo e
 * sem JavaScript. Servem para dar peso visual a cada linha da lista de serviços
 * sem depender de assets que ainda não existem.
 */

function Bar({ w = "100%", h = 6, dim = false }: { w?: string; h?: number; dim?: boolean }) {
  return (
    <span
      className={`block rounded-full ${dim ? "bg-line" : "bg-ink/20"}`}
      style={{ width: w, height: h }}
    />
  );
}

function Pill({
  children,
  tone = "soft",
}: {
  children: React.ReactNode;
  tone?: "soft" | "ink" | "ghost";
}) {
  const tones = {
    soft: "bg-surface text-muted",
    ink: "bg-ink text-white",
    ghost: "border border-line text-muted",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.04em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full rounded-[14px] border border-line bg-canvas p-3">{children}</div>
  );
}

/* 01 · Sites e landing pages */
export function MockSite() {
  return (
    <Frame>
      <div className="mb-2.5 flex items-center gap-2">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <i key={i} className="size-1.5 rounded-full bg-line" />
          ))}
        </span>
        <span className="rounded-full bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">
          /oferta
        </span>
      </div>
      <div className="flex gap-2">
        <div className="w-1/3 space-y-1.5">
          <Bar w="70%" h={5} dim />
          <Bar w="100%" h={5} dim />
          <Bar w="55%" h={5} dim />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-8 rounded-md bg-soft-purple" />
          <div className="flex items-center gap-1.5">
            <Pill tone="ink">comprar</Pill>
            <Pill>ver mais</Pill>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 02 · Identidade visual */
export function MockBrand() {
  return (
    <Frame>
      <div className="mb-3 flex items-center gap-2">
        <span className="size-7 rounded-md bg-ink" />
        <div className="flex-1 space-y-1.5">
          <Bar w="70%" h={5} />
          <Bar w="45%" h={5} dim />
        </div>
        <Pill>Aa</Pill>
      </div>
      <div className="flex items-center gap-1.5">
        {["bg-ink", "bg-soft-green", "bg-soft-purple", "bg-soft-pink"].map((c) => (
          <span key={c} className={`size-6 rounded-md ${c}`} />
        ))}
        <Pill tone="ghost">+ cor</Pill>
      </div>
    </Frame>
  );
}

/* 03 · Criativos para tráfego pago */
export function MockAds() {
  return (
    <Frame>
      <div className="mb-3 flex gap-1.5">
        {["v1", "v2", "v3"].map((v, i) => (
          <span
            key={v}
            className={`rounded-md px-2 py-1 font-mono text-[10px] ${
              i === 2 ? "bg-ink text-white" : "bg-surface text-muted"
            }`}
          >
            {v}
          </span>
        ))}
      </div>
      <div className="relative mb-2 h-1.5 rounded-full bg-surface">
        <span className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-ink" />
        <span className="absolute -top-1 left-2/3 size-3.5 rounded-full border-2 border-panel bg-ink" />
      </div>
      <div className="flex justify-end">
        <Pill tone="ink">aprovado</Pill>
      </div>
    </Frame>
  );
}

/* 04 · Materiais para redes sociais */
export function MockSocial() {
  return (
    <Frame>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 space-y-1.5">
            <div
              className={`h-10 rounded-md ${
                i === 1 ? "bg-soft-pink" : i === 2 ? "bg-soft-green" : "bg-surface"
              }`}
            />
            <Bar w="80%" h={4} dim />
            <Bar w="55%" h={4} dim />
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex gap-1.5">
        <Pill>feed</Pill>
        <Pill>stories</Pill>
      </div>
    </Frame>
  );
}

/* 05 · Apresentações e materiais de lançamento */
export function MockSlides() {
  return (
    <Frame>
      <div className="mb-2.5 flex gap-1.5">
        {["1", "2", "3", "4"].map((s, i) => (
          <span
            key={s}
            className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
              i === 0 ? "bg-ink text-white" : "bg-surface text-muted"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="rounded-md border border-line bg-panel p-2.5">
        <Bar w="60%" h={5} />
        <div className="mt-2.5 flex h-10 items-end gap-1.5">
          {[40, 65, 30, 85, 55].map((h, i) => (
            <i
              key={i}
              className={`flex-1 rounded-sm ${i === 3 ? "bg-ink" : "bg-line"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* 06 · Entrega editável */
export function MockDelivery() {
  return (
    <Frame>
      <div className="mb-3 flex flex-wrap gap-1.5">
        <Pill>marca.fig</Pill>
        <Pill>arquivos.zip</Pill>
        <Pill>manual.pdf</Pill>
      </div>
      <div className="mb-2.5 flex items-center gap-2">
        <span className="relative h-1.5 flex-1 rounded-full bg-surface">
          <b className="absolute inset-y-0 left-0 block w-full rounded-full bg-ink" />
        </span>
        <Pill tone="ink">ok</Pill>
      </div>
      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.04em] text-muted">
        <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-ink text-[8px] text-white">
          ✓
        </span>
        tudo na sua mão
      </p>
    </Frame>
  );
}
