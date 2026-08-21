import Link from "next/link";
import { Arrow, Asterisk, Wrap } from "./ui/primitives";
import { CNPJ, EMAIL, REDES, WHATSAPP_NUMERO, WHATSAPP_URL, href, texto } from "@/content/contato";

const PAGINAS = [
  { href: "#entregamos", label: "O que entregamos" },
  { href: "#processo", label: "Como trabalhamos" },
  { href: "#quem-somos", label: "Quem somos" },
  { href: "#duvidas", label: "Dúvidas" },
];

const LEGAIS = [
  { href: "/privacidade", label: "Política de privacidade" },
  { href: "/termos", label: "Termos de uso" },
];

export default function Footer() {
  return (
    <footer className="mt-3 rounded-[22px] bg-black p-3" id="contato">
      {/* ---- Chamada final ---- */}
      <section className="relative overflow-hidden rounded-[12px] bg-soft-purple py-16">
        <Asterisk
          className="pointer-events-none absolute -left-16 top-1/2 hidden size-[280px] -translate-y-1/2 text-white/40 lg:block"
          aria-hidden="true"
        />
        <Asterisk
          className="pointer-events-none absolute -right-16 top-1/2 hidden size-[280px] -translate-y-1/2 text-white/40 lg:block"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
          <p className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.02em] text-ink">
            <Asterisk className="size-5" />
            Sem formulário e sem call obrigatória
          </p>

          <h2 className="mb-10 text-3xl font-medium leading-tight tracking-[-0.03em] text-ink sm:text-4xl lg:text-5xl xl:text-6xl">
            O próximo lançamento não precisa parecer com o anterior.
          </h2>

          <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <a
              href={href(WHATSAPP_URL, "#duvidas")}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-black px-5 py-[14px] font-mono text-sm uppercase leading-none tracking-[0.04em] text-white transition-colors duration-300 hover:bg-ink-hover sm:w-auto"
            >
              Chamar no WhatsApp
              <Arrow />
            </a>
            <Link
              href="#entregamos"
              className="inline-flex w-full items-center justify-center rounded-[8px] border border-ink bg-panel px-5 py-[14px] font-mono text-sm uppercase leading-none tracking-[0.04em] text-ink transition-colors duration-300 hover:bg-canvas sm:w-auto"
            >
              Ver o que entregamos
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted">
            Resposta em até [CONFIRMAR: X horas], em horário comercial.
          </p>
        </div>
      </section>

      {/* ---- Rodapé ---- */}
      <Wrap className="lg:px-10">
        <div className="grid grid-cols-1 pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-4 2xl:pr-40">
            <span className="mb-7 inline-flex items-center gap-2 font-mono text-[15px] font-medium uppercase tracking-[0.06em] text-white">
              <span className="size-[9px] rounded-[2px] bg-white" aria-hidden="true" />
              Off The Grid
            </span>
            <p className="mb-10 mt-4 text-base text-neutral-400">
              Marca, site e campanha para quem vende infoproduto. Estratégia, design e tecnologia na
              mesma mesa.
            </p>
            <ul className="mb-10 flex gap-6">
              {REDES.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.url ?? "#"}
                    className="font-mono text-sm uppercase tracking-[0.04em] text-neutral-400 transition-colors hover:text-white"
                    {...(r.url
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : { "aria-disabled": true })}
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-white/10 pb-8 sm:pb-10 lg:col-span-8 lg:ml-10 lg:border-l lg:pb-16">
            <div className="grid grid-cols-2 gap-y-8 pl-0 sm:grid-cols-3 lg:pl-10 xl:pl-24">
              <div>
                <h3 className="mb-5 text-xl font-medium tracking-[-0.01em] text-white">Páginas</h3>
                <ul className="space-y-2">
                  {PAGINAS.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="text-base text-neutral-400 transition-colors hover:text-white"
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-5 text-xl font-medium tracking-[-0.01em] text-white">Contato</h3>
                <ul className="space-y-2 text-base text-neutral-400">
                  <li>WhatsApp: {texto(WHATSAPP_NUMERO, "número")}</li>
                  <li>E-mail: {texto(EMAIL, "e-mail")}</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-5 text-xl font-medium tracking-[-0.01em] text-white">Legal</h3>
                <ul className="space-y-2">
                  {LEGAIS.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-base text-neutral-400 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pb-6 pt-8 sm:flex-row sm:items-center sm:gap-0 sm:pt-10">
          <p className="text-neutral-400">© 2026 Off The Grid. Todos os direitos reservados.</p>
          <p className="text-neutral-400">{texto(CNPJ, "CNPJ, se já existir")}</p>
        </div>
      </Wrap>
    </footer>
  );
}
