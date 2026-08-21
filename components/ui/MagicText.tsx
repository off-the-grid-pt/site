"use client";

import type { ReactNode } from "react";

export default function MagicText({ children }: { children: ReactNode }) {
  return (
    <span className="magic-text">
      <span className="magic-text-copy">{children}</span>
      <i className="magic-spark magic-spark--one" aria-hidden="true" />
      <i className="magic-spark magic-spark--two" aria-hidden="true" />
      <i className="magic-spark magic-spark--three" aria-hidden="true" />
    </span>
  );
}
