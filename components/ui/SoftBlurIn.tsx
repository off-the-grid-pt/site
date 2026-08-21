"use client";

import { motion } from "motion/react";

export default function SoftBlurIn({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.025 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, filter: "blur(12px)", y: 18 },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}{index < words.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}
