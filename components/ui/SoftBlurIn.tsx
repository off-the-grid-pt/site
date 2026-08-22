"use client";

import { motion } from "motion/react";

export default function SoftBlurIn({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, filter: "blur(18px)", y: 36 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.38, 0.005, 0.215, 1] }}
    >
      {text}
    </motion.p>
  );
}
