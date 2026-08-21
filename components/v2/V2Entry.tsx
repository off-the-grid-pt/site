"use client";

import dynamic from "next/dynamic";

const V2Site = dynamic(() => import("./V2Site"), {
  ssr: false,
  loading: () => <div className="min-h-svh bg-white" aria-hidden="true" />,
});

export default function V2Entry() {
  return <V2Site />;
}
