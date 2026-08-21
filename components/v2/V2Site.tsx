"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { WHATSAPP_URL, href } from "@/content/contato";

const ease = [0.6, 0.01, 0.05, 1] as const;

const services = [
  ["01", "Sites e landing pages", "Estruturas digitais que explicam, convencem e convertem sem parecer mais do mesmo."],
  ["02", "Identidade visual", "Sistemas de marca construídos para manter consistência em cada lançamento e canal."],
  ["03", "Social media", "Direção visual e peças que transformam frequência em reconhecimento."],
  ["04", "Materiais de lançamento", "Da campanha ao checkout, todos os pontos de contacto dentro da mesma ideia."],
] as const;

const process = [
  ["01", "Conversa", "Contexto, oferta e momento do negócio."],
  ["02", "Escopo", "Entregáveis, prazo e investimento por escrito."],
  ["03", "Criação", "Entregas parciais, feedback e refinamento."],
  ["04", "Entrega", "Arquivos, manual de uso e passagem para a equipe."],
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42, filter: "blur(18px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Intro({ onDone }: { onDone: () => void }) {
  const [expand, setExpand] = useState(false);
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onDone();
      return;
    }
    const expandTimer = window.setTimeout(() => setExpand(true), 1500);
    const leaveTimer = window.setTimeout(() => setLeave(true), 2850);
    const doneTimer = window.setTimeout(onDone, 3400);
    return () => {
      clearTimeout(expandTimer);
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <motion.div
      className="v2-loader"
      animate={{ opacity: leave ? 0 : 1 }}
      transition={{ duration: 0.5, ease }}
    >
      <motion.div
        className="v2-loader-frame"
        initial={{ width: 300, height: 400, borderRadius: 4 }}
        animate={expand ? { width: "100vw", height: "100svh", borderRadius: 0 } : { width: 300, height: 400, borderRadius: 4 }}
        transition={{ duration: 1.35, ease }}
      >
        <Image src="/frame-7.png" alt="" fill priority sizes="100vw" className="object-cover" />
        <motion.span className="v2-loader-wipe v2-loader-wipe--one" initial={{ y: "101%" }} animate={{ y: 0 }} transition={{ duration: 0.55, delay: 0.15, ease }} />
        <motion.span className="v2-loader-wipe v2-loader-wipe--two" initial={{ y: "101%" }} animate={{ y: 0 }} transition={{ duration: 0.55, delay: 0.38, ease }} />
        <motion.span className="v2-loader-wipe v2-loader-wipe--final" initial={{ y: "101%" }} animate={{ y: 0 }} transition={{ duration: 0.55, delay: 0.61, ease }} />
      </motion.div>
      <span className="v2-loader-count">OTG / 2026</span>
    </motion.div>
  );
}

function HeroV2({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

  return (
    <section ref={ref} className="v2-hero">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image src="/frame-7.png" alt="Off The Grid" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="v2-hero-shade" />
      <motion.div className="v2-hero-title" style={{ y: textY }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 0.15, duration: 0.8 }}>
          Design para infoprodutores
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, delay: 0.25, ease }}
        >
          Sua marca merece uma presença digital à altura.
        </motion.h1>
      </motion.div>
      <motion.span className="v2-meta v2-meta--left" animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 0.65 }}>Estratégia / Design / Tecnologia</motion.span>
      <motion.span className="v2-meta v2-meta--center" animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 0.75 }}>Off The Grid — Brasil</motion.span>
      <motion.span className="v2-meta v2-meta--right" animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 0.85 }}>Role para explorar</motion.span>
    </section>
  );
}

function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const opacity = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 180, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 180, damping: 28 });

  return (
    <section
      ref={ref}
      className="v2-manifesto"
      onPointerMove={(event) => {
        const text = ref.current?.querySelector("p");
        if (!text) return;
        const rect = text.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
        opacity.set(1);
      }}
      onPointerLeave={() => opacity.set(0)}
    >
      <motion.p
        style={{
          "--mx": useTransform(smoothX, (value) => `${value}px`),
          "--my": useTransform(smoothY, (value) => `${value}px`),
          "--mo": opacity,
        } as React.CSSProperties}
      >
        Design não é apenas aparência. É o sistema que transforma percepção em confiança,
        organiza cada ponto de contacto e faz uma marca ser reconhecida antes mesmo de ser explicada.
      </motion.p>
    </section>
  );
}

function ServicesV2() {
  return (
    <section className="v2-section v2-services">
      <Reveal className="v2-section-head">
        <span>(01)</span><span>O que entregamos</span><span>Do sistema à campanha</span>
      </Reveal>
      <Reveal><h2 className="v2-display">Tudo o que sua marca precisa para não parecer improvisada.</h2></Reveal>
      <div className="v2-service-list">
        {services.map(([number, title, description], index) => (
          <motion.article
            key={number}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.85, delay: index * 0.06, ease }}
            whileHover={{ x: 14 }}
          >
            <span>{number}</span><h3>{title}</h3><p>{description}</p><i>↗</i>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function PhilosophyV2() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  return (
    <section ref={ref} className="v2-philosophy">
      <motion.div className="v2-philosophy-image" style={{ rotate, y }}>
        <Image src="/frame-7.png" alt="Direção visual Off The Grid" fill sizes="70vw" className="object-cover" />
      </motion.div>
      <Reveal className="v2-philosophy-copy">
        <span>(02) Nossa visão</span>
        <h2>Bonito chama atenção. Um sistema bem construído sustenta o negócio.</h2>
        <p>A marca precisa continuar funcionando quando a campanha muda, a equipe cresce e o próximo lançamento começa.</p>
      </Reveal>
    </section>
  );
}

function ProcessV2() {
  return (
    <section className="v2-section v2-process">
      <Reveal className="v2-section-head"><span>(03)</span><span>Como trabalhamos</span><span>Clareza do início ao fim</span></Reveal>
      <div className="v2-process-list">
        {process.map(([number, title, description]) => (
          <motion.div key={number} whileHover="hover" initial="rest" className="v2-process-row">
            <span>{number}</span>
            <motion.h3 variants={{ rest: { x: 0 }, hover: { x: 22 } }} transition={{ duration: 0.5, ease }}>{title}</motion.h3>
            <p>{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AboutV2() {
  return (
    <section className="v2-about">
      <Reveal><span className="v2-kicker">(04) Por que Off The Grid</span></Reveal>
      <Reveal delay={0.1}><h2>Uma equipe enxuta, uma direção clara e responsabilidade sobre o resultado inteiro.</h2></Reveal>
      <div className="v2-about-grid">
        <Reveal><p>Estratégia, design e tecnologia trabalham na mesma mesa. Isso reduz ruído, retrabalho e decisões que não conversam entre si.</p></Reveal>
        <Reveal delay={0.12}><p>Você acompanha cada etapa, aprova entregas parciais e recebe um sistema pronto para continuar funcionando depois da entrega.</p></Reveal>
      </div>
    </section>
  );
}

const faqs = [
  ["Vocês trabalham apenas com infoprodutores?", "É o nosso foco principal, porque entendemos a dinâmica de lançamentos, perpétuo e construção de autoridade digital."],
  ["Qual é o prazo de um projeto?", "O prazo depende do escopo. Você recebe cronograma e entregáveis definidos antes do início."],
  ["Como funciona o pagamento?", "As condições são apresentadas junto com o escopo, sempre com valor fechado para o projeto aprovado."],
] as const;

function FaqV2() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="v2-section v2-faq">
      <Reveal className="v2-section-head"><span>(05)</span><span>Dúvidas</span><span>Antes de começar</span></Reveal>
      <div className="v2-faq-list">
        {faqs.map(([question, answer], index) => (
          <div key={question} className="v2-faq-item">
            <button onClick={() => setOpen(open === index ? null : index)}><span>{question}</span><i>{open === index ? "−" : "+"}</i></button>
            <AnimatePresence initial={false}>
              {open === index && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease }}>{answer}</motion.p>}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactV2() {
  return (
    <footer className="v2-contact">
      <Reveal><p>(06) Vamos conversar</p></Reveal>
      <Reveal delay={0.1}><h2>O próximo lançamento não precisa parecer com o anterior.</h2></Reveal>
      <Reveal delay={0.2}>
        <a href={href(WHATSAPP_URL, "#duvidas")}>Chamar no WhatsApp <span>↗</span></a>
      </Reveal>
      <div className="v2-contact-meta"><span>Off The Grid © 2026</span><span>Design para infoprodutores</span><span>Brasil</span></div>
    </footer>
  );
}

export default function V2Site() {
  const [ready, setReady] = useState(false);
  return (
    <div className="v2-site">
      <AnimatePresence>{!ready && <Intro onDone={() => setReady(true)} />}</AnimatePresence>
      <HeroV2 ready={ready} />
      <Manifesto />
      <ServicesV2 />
      <PhilosophyV2 />
      <ProcessV2 />
      <AboutV2 />
      <FaqV2 />
      <ContactV2 />
    </div>
  );
}
