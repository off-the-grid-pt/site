"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "./ui/primitives";

const LINKS = [
  { href: "#quem-somos", label: "Sobre" },
  { href: "#entregamos", label: "Serviços" },
  { href: "#projetos", label: "Portfólio" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-shell">
        <div className="site-header-glass">
          <Link
            href="/"
            className="site-brand"
          >
            <img src="/logo-header.svg" alt="Off The Grid" className="site-brand-logo" />
          </Link>

          <nav className="site-nav-links" aria-label="Navegação principal">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="site-nav-link"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link href="#contato" className="site-header-cta">
            <span>Contato</span>
            <i><Arrow /></i>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="site-menu-toggle"
          >
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav
            id="menu-mobile"
            className="site-mobile-menu"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="site-mobile-link"
              >
                {l.label}
              </Link>
            ))}
            <Link href="#contato" onClick={() => setOpen(false)} className="site-mobile-cta">
              Chamar no WhatsApp <Arrow />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
