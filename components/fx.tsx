"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform, animate } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return <motion.div style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-signal via-volt to-ember" />;
}

export function CursorGlow() {
  const x = useMotionValue(-500), y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 80, damping: 20 }), sy = useSpring(y, { stiffness: 80, damping: 20 });
  useEffect(() => {
    const m = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  return <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-0 -ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full bg-signal/[0.09] blur-3xl" />;
}

export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 220, damping: 18 }), ry = useSpring(0, { stiffness: 220, damping: 18 });
  const gx = useMotionValue(50), gy = useMotionValue(50);
  const glow = useTransform([gx, gy], ([a, b]: number[]) => `radial-gradient(380px circle at ${a}% ${b}%, rgba(94,234,212,.16), transparent 45%)`);
  return (
    <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 12); rx.set(-(py - 0.5) * 12); gx.set(px * 100); gy.set(py * 100);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }} className={`relative ${className}`}>
      <motion.div aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]" />
      {children}
    </motion.div>
  );
}

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 }), y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.div ref={ref} style={{ x, y }} className="inline-block"
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>
  );
}

export function BeamBox({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl p-px ${className}`}>
      <div className="absolute -inset-[100%] animate-spin-slow" style={{ background: "conic-gradient(from 0deg, transparent 0 290deg, #5eead4 340deg, #a78bfa 360deg)" }} />
      <div className="relative rounded-[calc(1.5rem-1px)] bg-ink">{children}</div>
    </div>
  );
}

export function Meteors({ count = 18 }: { count?: number }) {
  const [m, setM] = useState<{ l: number; d: number; t: number }[]>([]);
  useEffect(() => setM(Array.from({ length: count }, () => ({ l: Math.random() * 100, d: Math.random() * 6, t: 3 + Math.random() * 5 }))), [count]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {m.map((s, i) => (
        <span key={i} className="absolute -top-2 h-0.5 w-0.5 animate-meteor rounded-full bg-signal opacity-0" style={{ left: `${s.l}%`, animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }}>
          <span className="absolute top-1/2 h-px w-14 -translate-y-1/2 bg-gradient-to-r from-signal to-transparent" />
        </span>
      ))}
    </div>
  );
}

export function Marquee({ items, reverse = false, className = "" }: { items: string[]; reverse?: boolean; className?: string }) {
  const row = (k: string) => items.map((t) => <span key={k + t} className={`mx-2 shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 ${className}`}>{t}</span>);
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex min-w-max animate-marquee group-hover:[animation-play-state:paused] ${reverse ? "[animation-direction:reverse]" : ""}`}>{row("a")}{row("b")}</div>
    </div>
  );
}

export function Reveal({ children, delay = 0, x = 0, className = "" }: { children: ReactNode; delay?: number; x?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40, x, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>{children}</motion.div>
  );
}

export function Ticker({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => { if (inView) animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (n) => setV(n) }); }, [inView, to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}
