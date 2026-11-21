"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/** Subtle magnetic pull toward the pointer (fine pointers only). */
export function Magnetic({ children, strength = 0.25, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18, mass: 0.6 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={reduce ? undefined : { x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
