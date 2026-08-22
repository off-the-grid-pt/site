import { GridCard } from "./ui/grid-card";
import { Eyebrow, Panel, Wrap } from "./ui/primitives";

/**
 * Posições fixas dos quadrados do padrão de cada card.
 * Fixas de propósito: sorteá-las no render quebra a hidratação (ver grid-card.tsx).
 */
const PADROES: [number, number][][] = [
  [
    [7, 1],
    [8, 3],
    [9, 2],
    [10, 5],
    [8, 6],
  ],
  [
    [8, 2],
    [10, 4],
    [7, 5],
    [9, 1],
    [10, 6],
  ],
  [
    [9, 3],
    [7, 6],
    [10, 1],
    [8, 4],
    [9, 5],
  ],
  [
    [10, 2],
    [8, 5],
    [7, 3],
    [9, 6],
    [7, 1],
  ],
  [
    [7, 4],
    [9, 1],
    [10, 3],
    [8, 6],
    [10, 5],
  ],
  [
    [8, 1],
    [10, 6],
    [7, 2],
    [9, 4],
    [8, 3],
  ],
];

const DESAFIOS = [
  {
    n: "01",
    titulo: "Identidade visual inconsistente",
    texto:
      "Uma marca sem identidade transmite insegurança, dificulta o reconhecimento e reduz o impacto de cada lançamento.",
  },
  {
    n: "02",
    titulo: "Landing pages que não convertem",
    texto:
      "Páginas mal estruturadas comprometem a experiência do usuário e desperdiçam oportunidades de conversão.",
  },
  {
    n: "03",
    titulo: "Comunicação visual sem padrão",
    texto:
      "Criativos, apresentações e materiais desconectados enfraquecem a mensagem e tornam a marca menos memorável.",
  },
  {
    n: "04",
    titulo: "Baixa percepção de autoridade",
    texto:
      "Quando a apresentação não acompanha a qualidade do conteúdo, conquistar a confiança do público se torna mais difícil.",
  },
  {
    n: "05",
    titulo: "Processos lentos e retrabalho",
    texto:
      "Depender de vários fornecedores ou materiais inconsistentes atrasa lançamentos e reduz a eficiência da operação.",
  },
  {
    n: "06",
    titulo: "Falta de consistência",
    texto:
      "Cada novo lançamento parece uma marca diferente, dificultando a construção de reconhecimento e crescimento a longo prazo.",
  },
];

export default function Challenges() {
  return (
    <Panel id="desafios" className="px-3 py-12 lg:py-25">
      <Wrap>
        <div className="reveal">
          <Eyebrow icon={<span>(02)</span>}>Os desafios do mercado</Eyebrow>
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-[45%_55%] lg:gap-12">
          <h2 className="text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-[clamp(2.25rem,3.3vw,3rem)]">
            <span className="block lg:whitespace-nowrap">O padrão do seu mercado</span>
            <span className="block lg:whitespace-nowrap">não precisa ser o padrão</span>
            <span className="block lg:whitespace-nowrap">da sua marca</span>
          </h2>

          <div className="reveal space-y-4 text-muted">
            <p className="max-w-[52ch]">
              Você paga o anúncio, o lead clica e cai numa página que ele já viu. Mesma estrutura,
              mesma seção de bônus, mesma contagem regressiva.
            </p>
            <p className="max-w-[52ch]">
              O logo veio de um freelancer. O criativo veio de outro. A página veio do que dava para
              editar sozinho. Cada peça funciona isolada e nenhuma conversa com a outra.
            </p>
            <p className="max-w-[52ch]">
              Quem paga essa conta é o seu custo por lead. Não porque o produto é ruim, mas porque
              nada ali sustenta o preço que você está pedindo.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-2">
          {DESAFIOS.map((d, i) => (
            <GridCard key={d.n} id={`desafio-${d.n}`} pattern={PADROES[i]} className="reveal">
              <span className="relative z-20 mb-6 block font-mono text-sm tracking-[0.06em] text-muted transition-colors duration-300 group-hover:text-neutral-400">
                {d.n}
              </span>
              <h3 className="relative z-20 text-lg font-medium leading-snug tracking-[-0.01em] transition-colors duration-300 group-hover:text-white">
                {d.titulo}
              </h3>
              <p className="relative z-20 mt-4 text-base font-normal leading-relaxed text-muted transition-colors duration-300 group-hover:text-neutral-400">
                {d.texto}
              </p>
            </GridCard>
          ))}
        </div>
      </Wrap>
    </Panel>
  );
}
