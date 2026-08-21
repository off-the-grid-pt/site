"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* ============================================================
   PAINEL DE CONTROLO
   Tudo o que se afina neste componente está aqui.
   ============================================================ */
const CONFIG = {
  /* geometria — valores em unidades do SVG original (viewBox 479 × 494) */
  depth: 34, // espessura da extrusão
  bevelThickness: 5, // profundidade do chanfro
  bevelSize: 3.5, // largura do chanfro
  bevelSegmentsDesktop: 4,
  bevelSegmentsMobile: 1,
  curveSegmentsDesktop: 14,
  curveSegmentsMobile: 6,

  /* material — preto metálico, não prata */
  color: "#0c0c0c",
  metalness: 1,
  roughness: 0.34,
  clearcoat: 0.35,
  envIntensity: 1.15,

  /* movimento */
  tiltMax: 0.3, // inclinação máxima, em radianos
  tiltEase: 0.075, // 0 a 1: quanto maior, mais rápido chega ao alvo
  lightSpeed: 0.22, // velocidade do reflexo que percorre a superfície
  lightRadius: 4.2,

  /* liquid metal — a corrente que percorre a superfície */
  liquidEscala: 0.6, // frequência do fluxo: maior = ondas mais miúdas
  liquidForca: 2.0, // quanto a normal é empurrada; o gradiente cai com a escala
  liquidVelocidade: 0.05, // velocidade da corrente
  liquidRugMin: 0.05, // rugosidade nas cristas: quase espelho
  liquidRugMax: 0.42, // rugosidade nos vales: metal escovado
} as const;

const VIEWBOX = { w: 479, h: 494 };
const SCALE = 2 / VIEWBOX.h; // normaliza a altura para 2 unidades

/* ============================================================
   LIQUID METAL

   Não é geometria: a malha continua a ser a extrusão exacta dos paths do SVG.
   O que se deforma é a normal usada na iluminação, com ruído animado. O
   reflexo do ambiente passa a escorrer pela superfície como metal líquido, e
   a silhueta da logo mantém-se intacta — que é o requisito de sempre.

   Injectado por `onBeforeCompile` no MeshPhysicalMaterial, em vez de um
   ShaderMaterial próprio: assim ficam de pé o environment map, o clearcoat e
   todas as luzes que já existem.

   Custo: 9 amostras de ruído por fragmento, e só nos fragmentos da logo.
   ============================================================ */
const RUIDO_GLSL = /* glsl */ `
uniform float uTempo;
uniform float uEscala;
uniform float uForca;
uniform float uRugMin;
uniform float uRugMax;
varying vec3 vLiquido;

float lmHash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float lmRuido(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(lmHash(i + vec3(0, 0, 0)), lmHash(i + vec3(1, 0, 0)), f.x),
        mix(lmHash(i + vec3(0, 1, 0)), lmHash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(lmHash(i + vec3(0, 0, 1)), lmHash(i + vec3(1, 0, 1)), f.x),
        mix(lmHash(i + vec3(0, 1, 1)), lmHash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}

/* duas oitavas chegam: o que dá a leitura de líquido é a deformação do
   domínio, não o número de oitavas */
float lmFbm(vec3 p) {
  return lmRuido(p) * 0.65 + lmRuido(p * 2.03) * 0.35;
}
`;

type Pointer = { x: number; y: number };

/* ------------------------------------------------------------
   Ambiente procedural: reflexos sem descarregar HDR nenhum.
   ------------------------------------------------------------ */
function Environment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);
    scene.environment = target.texture;

    return () => {
      scene.environment = null;
      target.texture.dispose();
      room.dispose?.();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

/* ------------------------------------------------------------
   A logo extrudada.
   ------------------------------------------------------------ */
function Logo({ pointer, mobile, reduced }: { pointer: React.RefObject<Pointer>; mobile: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const rim = useRef<THREE.PointLight>(null);
  const svg = useLoader(SVGLoader, "/logo.svg");

  const geometries = useMemo(() => {
    const settings: THREE.ExtrudeGeometryOptions = {
      depth: CONFIG.depth,
      bevelEnabled: true,
      bevelThickness: CONFIG.bevelThickness,
      bevelSize: CONFIG.bevelSize,
      bevelOffset: 0,
      bevelSegments: mobile ? CONFIG.bevelSegmentsMobile : CONFIG.bevelSegmentsDesktop,
      curveSegments: mobile ? CONFIG.curveSegmentsMobile : CONFIG.curveSegmentsDesktop,
    };

    // Os shapes vêm dos paths originais do SVG. Nada é redesenhado.
    // `path.toShapes()` e não `SVGLoader.createShapes(path)`: o estático ficou
    // deprecado na r185, que é a versão instalada, e limita-se a chamar este.
    return svg.paths
      .flatMap((path) => path.toShapes())
      .map((shape) => {
        const geo = new THREE.ExtrudeGeometry(shape, settings);
        // Centrar em espaço do SVG, com o mesmo deslocamento para todos os
        // paths. `geo.center()` não serve: centraria cada path por si e
        // desmontaria o símbolo.
        geo.translate(-VIEWBOX.w / 2, -VIEWBOX.h / 2, -CONFIG.depth / 2);
        return geo;
      });
  }, [svg, mobile]);

  // Uniforms partilhados com o shader injectado. Vivem fora do material para
  // poderem ser lidos no useFrame sem depender do momento da compilação.
  const uniforms = useRef({
    uTempo: { value: 0 },
    uEscala: { value: CONFIG.liquidEscala },
    uForca: { value: CONFIG.liquidForca },
    uRugMin: { value: CONFIG.liquidRugMin },
    uRugMax: { value: CONFIG.liquidRugMax },
  });

  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(CONFIG.color),
      metalness: CONFIG.metalness,
      roughness: CONFIG.roughness,
      clearcoat: CONFIG.clearcoat,
      clearcoatRoughness: 0.25,
      envMapIntensity: CONFIG.envIntensity,
    });

    mat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms.current);

      // -------- vértice: leva a posição em espaço do objecto --------
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vLiquido;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvLiquido = position;");

      // -------- fragmento --------
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", `#include <common>\n${RUIDO_GLSL}`)
        // A rugosidade é resolvida antes da normal, por isso o ruído é
        // calculado aqui e reaproveitado mais abaixo.
        .replace(
          "#include <roughnessmap_fragment>",
          /* glsl */ `
          vec3 lmP = vLiquido * uEscala * 0.02;
          lmP.y -= uTempo;
          // deformação do domínio: é isto que transforma ondas em líquido
          float lmW = lmRuido(lmP * 0.7 + uTempo * 0.35);
          vec3 lmQ = lmP + lmW * 1.15;
          float lmBase = lmFbm(lmQ);
          float lmE = 0.35;
          vec3 lmGrad = vec3(
            lmFbm(lmQ + vec3(lmE, 0.0, 0.0)) - lmBase,
            lmFbm(lmQ + vec3(0.0, lmE, 0.0)) - lmBase,
            lmFbm(lmQ + vec3(0.0, 0.0, lmE)) - lmBase
          );
          #include <roughnessmap_fragment>
          roughnessFactor = mix(uRugMin, uRugMax, smoothstep(0.25, 0.75, lmBase));
        `,
        )
        .replace(
          "#include <normal_fragment_begin>",
          /* glsl */ `
          #include <normal_fragment_begin>
          normal = normalize(normal + lmGrad * uForca * 12.0);
        `,
        );
    };

    // Sem isto, o three reaproveita o programa de outro MeshPhysicalMaterial
    // com as mesmas definições e o shader injectado nunca chega a compilar.
    mat.customProgramCacheKey = () => "off-the-grid-liquid-metal";

    return mat;
  }, []);

  // Limpeza explícita: o R3F liberta o que cria, não o que recebe pronto.
  useEffect(() => {
    return () => {
      geometries.forEach((g) => g.dispose());
      material.dispose();
    };
  }, [geometries, material]);

  // Em `frameloop="demand"` (fora do ecrã, ou movimento reduzido) é preciso
  // pedir explicitamente um fotograma quando a geometria fica pronta, senão a
  // primeira imagem nunca chega a ser desenhada.
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [invalidate, geometries]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (!reduced) {
      // corrente do liquid metal
      uniforms.current.uTempo.value += delta * CONFIG.liquidVelocidade;

      const p = pointer.current ?? { x: 0, y: 0 };
      const alvoY = p.x * CONFIG.tiltMax;
      const alvoX = p.y * CONFIG.tiltMax;
      // interpolação normalizada pelo delta: o mesmo comportamento a 60 e a 120 fps
      const k = 1 - Math.pow(1 - CONFIG.tiltEase, delta * 60);
      g.rotation.y += (alvoY - g.rotation.y) * k;
      g.rotation.x += (alvoX - g.rotation.x) * k;

      // reflexo a percorrer a superfície: move-se a luz, não se troca a cor
      if (rim.current) {
        const t = state.clock.elapsedTime * CONFIG.lightSpeed;
        rim.current.position.set(
          Math.cos(t) * CONFIG.lightRadius,
          Math.sin(t * 0.7) * 2.4,
          Math.sin(t) * CONFIG.lightRadius,
        );
      }
    }
  });

  return (
    <>
      {/* principal */}
      <directionalLight position={[3, 4, 5]} intensity={2.1} />
      {/* preenchimento */}
      <directionalLight position={[-4, -1, 2]} intensity={0.7} />
      {/* rim: é esta que viaja e cria o reflexo */}
      <pointLight ref={rim} position={[4, 2, 3]} intensity={26} distance={14} decay={2} />
      <ambientLight intensity={0.35} />

      <group ref={group}>
        {/* O eixo Y do SVG aponta para baixo. A correcção é uma rotação de 180°
            em X, e NÃO um scale de Y negativo: escala negativa inverte a ordem
            dos vértices, as faces frontais passam a ser traseiras e o material
            (FrontSide, por omissão) deixa de as desenhar. Era esse o motivo de
            a logo não aparecer. A rotação preserva as normais. */}
        <group rotation={[Math.PI, 0, 0]} scale={SCALE}>
          {geometries.map((geo, i) => (
            <mesh key={i} geometry={geo} material={material} />
          ))}
        </group>
      </group>
    </>
  );
}

/* ------------------------------------------------------------
   Wrapper: visibilidade, hover, movimento reduzido.
   ------------------------------------------------------------ */
export default function LogoThree({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  const [visivel, setVisivel] = useState(false);
  const [temHover, setTemHover] = useState(false);
  const [reduzido, setReduzido] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mqHover = window.matchMedia("(hover: hover)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 768px)");

    const sync = () => {
      setTemHover(mqHover.matches);
      setReduzido(mqMotion.matches);
      setMobile(mqMobile.matches);
    };
    sync();

    mqHover.addEventListener("change", sync);
    mqMotion.addEventListener("change", sync);
    mqMobile.addEventListener("change", sync);
    return () => {
      mqHover.removeEventListener("change", sync);
      mqMotion.removeEventListener("change", sync);
      mqMobile.removeEventListener("change", sync);
    };
  }, []);

  // Só renderiza enquanto a secção está no ecrã.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!temHover || reduzido) return;
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    pointer.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
    };
  }

  function onLeave() {
    // volta ao centro; a interpolação do useFrame faz o resto
    pointer.current = { x: 0, y: 0 };
  }

  const animar = visivel && !reduzido;

  return (
    <div
      ref={box}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        frameloop={animar ? "always" : "demand"}
        style={{ background: "transparent" }}
      >
        <Environment />
        {/* `useLoader` suspende enquanto vai buscar o SVG. Sem esta fronteira,
            a suspensão sobe acima do Canvas e nada é desenhado. */}
        <Suspense fallback={null}>
          <Logo pointer={pointer} mobile={mobile} reduced={reduzido} />
        </Suspense>
      </Canvas>
    </div>
  );
}
