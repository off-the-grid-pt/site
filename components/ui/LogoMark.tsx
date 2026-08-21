"use client";

import { useId } from "react";

/**
 * Símbolo da Off The Grid com brilho metálico animado.
 *
 * Geometria: os dois paths originais de `Assets/Logo Black.svg` entram sem
 * qualquer alteração, e servem de `clipPath`. O `viewBox` (0 0 479 494) é o
 * original.
 *
 * Animação: o gradiente fica parado e o que se move é o rectângulo que o
 * transporta, dentro do recorte. Animar `x1`/`x2` por CSS ainda tem suporte
 * irregular entre browsers, e por SMIL não há forma limpa de respeitar
 * `prefers-reduced-motion`. Com `transform`, a animação é composta pela GPU,
 * não provoca repaint fora do ícone e desliga-se por media query.
 *
 * Ciclo sem salto: o gradiente é `spreadMethod="repeat"` com período de 479
 * unidades no eixo x, exactamente a distância percorrida em cada ciclo. O
 * fotograma final é idêntico ao inicial.
 *
 * Cores e velocidade: ver `--logo-*` em app/globals.css.
 */

const PATH_1 =
  "M251.337 0C314.582 1.69612 401.135 31.5744 421.53 98.9023L422 100.5L422.315 101.172C423.241 103.183 426.12 109.651 429.693 119.759L358.813 166.069C354.248 130.011 346.869 94.8389 326.442 63.6992C292.95 12.6525 210.639 13.9022 178.568 65.8389C160.889 94.4683 153.296 125.589 148.643 158.627C147.08 169.448 146.613 181.025 144.757 191.535L107.17 191.513C107.373 196.761 107.224 202.531 107.139 207.806C106.613 240.296 107.474 272.934 107.167 305.4C119.495 305.849 132.714 305.525 145.165 305.616C145.166 305.63 145.166 305.644 145.167 305.657L85.7589 344.473C73.0536 343.968 59.1542 344.187 46.3732 344.158C45.5457 323.863 46.1058 301.052 45.9005 280.464L0.389776 280.415C-0.271727 260.171 0.0475013 235.778 0.336065 215.406C15.1956 215.406 31.4367 215.073 46.1759 215.655C45.6038 195.473 46.1004 172.873 46.1583 152.524C59.4985 152.608 72.8396 152.577 86.1798 152.432C85.7315 129.741 86.1498 105.408 86.1925 82.6221L126.306 82.6299C126.237 71.4328 125.913 57.9891 126.481 46.9658C130.548 42.31 140.409 35.5423 145.728 32.0469C178.729 10.3563 212.172 1.47319 251.337 0Z";

const PATH_2 =
  "M458.492 116C466.785 139.358 478.937 182.584 478.937 235.335C479.96 303.588 465.736 382.755 417.698 433.251C382.531 470.218 336.193 492.055 285.078 493.102C245.607 493.788 206.857 482.481 173.95 460.679C170.386 458.305 156.186 449.22 155.768 445.559C154.559 434.984 155.183 420.64 155.17 409.936C141.965 410.042 128.492 409.84 115.262 409.795C114.841 387.076 115.177 363.909 115.025 341.116C114.685 341.102 114.342 341.091 114 341.078L173.439 302.243C173.661 302.245 173.882 302.245 174.103 302.247C176.146 333.736 181.523 369.9 192.985 399.355C202.748 424.443 219.266 449.31 244.998 459.756C267.419 468.857 295.332 469.549 317.753 460.037C344.286 448.781 360.003 426.006 370.646 400.446C386.007 363.559 390.169 312.455 392.003 272.648C392.526 261.291 391.452 246.162 392.571 235.335C391.969 232.355 389.674 179.153 389.337 176.121C388.822 171.489 388.28 166.866 387.693 162.257L458.492 116Z";

export default function LogoMark({
  className = "",
  title,
}: {
  /** Controla o tamanho. A altura acompanha por `viewBox`, sem distorcer. */
  className?: string;
  /** Se preenchido, o símbolo passa a ter significado semântico. */
  title?: string;
}) {
  // `useId` devolve algo como ":r1:". Os dois pontos partem referências
  // `url(#...)`, por isso são removidos.
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  const clipId = `logo-clip-${uid}`;
  const gradId = `logo-grad-${uid}`;

  return (
    <svg
      viewBox="0 0 479 494"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: "auto" }}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}

      <defs>
        <clipPath id={clipId}>
          <path d={PATH_1} />
          <path d={PATH_2} />
        </clipPath>

        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="479"
          y2="0"
          spreadMethod="repeat"
        >
          {/* Simétrico e com as pontas iguais: é o que faz o ciclo fechar sem salto. */}
          <stop offset="0" stopColor="var(--logo-base)" />
          <stop offset="0.38" stopColor="var(--logo-base)" />
          <stop offset="0.46" stopColor="var(--logo-mid)" />
          <stop offset="0.5" stopColor="var(--logo-sheen)" />
          <stop offset="0.54" stopColor="var(--logo-mid)" />
          <stop offset="0.62" stopColor="var(--logo-base)" />
          <stop offset="1" stopColor="var(--logo-base)" />
        </linearGradient>
      </defs>

      {/* O recorte usa os paths originais. A varredura é inclinada pela rotação
          do grupo; a translação acontece no espaço local, por isso o período
          continua a ser exactamente 479 e o ciclo mantém-se contínuo. */}
      <g clipPath={`url(#${clipId})`}>
        <g transform="rotate(-18 239.5 247)">
          <rect
            className="logo-shine"
            x="-479"
            y="-247"
            width="1437"
            height="988"
            fill={`url(#${gradId})`}
          />
        </g>
      </g>
    </svg>
  );
}
