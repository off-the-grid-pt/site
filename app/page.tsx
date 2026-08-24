import Hero from "@/components/Hero";
import CursorRevealSection from "@/components/CursorRevealSection";
import Challenges from "@/components/Challenges";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import ScrollBlur from "@/components/ui/ScrollBlur";

/**
 * Homepage · Off The Grid
 *
 * Ordem das secções conforme a estrutura aprovada em pages/home/03-copy.md.
 * A secção 5 (Showcase / Projetos em destaque) está construída em
 * components/Showcase.tsx mas fica FORA DO AR no lançamento, por decisão do
 * Pedro: não existe projeto entregue nem autorização de cliente. Para publicar,
 * importar aqui entre <Process /> e <About /> e acrescentar a âncora ao menu.
 */
export default function Home() {
  return (
    // overflow-x-clip, nunca overflow-clip nem overflow-hidden: recortar só o
    // eixo horizontal mantém o eixo vertical `visible`, e é isso que permite
    // aos cards das secções 3 e 4 continuarem a colar no scroll.
    <div className="overflow-x-clip">
      <main>
        <Hero />
        <CursorRevealSection />
        <Challenges />
        <Services />
        <Process />
        <About />
        <Faq />
      </main>
      <Footer />
      <Reveal />
      <ScrollBlur startAt="desafios" />
    </div>
  );
}
