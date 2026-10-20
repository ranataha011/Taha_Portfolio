"use client";
import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { CursorGlow, ScrollProgress } from "./fx";

function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0, mx = -999, my = -999;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const P = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0004, vy: (Math.random() - 0.5) * 0.0004 }));
    const size = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    const mm = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    size(); window.addEventListener("resize", size); window.addEventListener("mousemove", mm);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of P) {
        if (!reduce) { p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1; }
        const px = p.x * w, py = p.y * h;
        ctx.fillStyle = "rgba(167,139,250,.7)"; ctx.beginPath(); ctx.arc(px, py, 1.6, 0, 7); ctx.fill();
        for (const q of P) {
          const d = Math.hypot(px - q.x * w, py - q.y * h);
          if (d < 130) { ctx.strokeStyle = `rgba(94,234,212,${0.13 * (1 - d / 130)})`; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(q.x * w, q.y * h); ctx.stroke(); }
        }
        const dm = Math.hypot(px - mx, py - my);
        if (dm < 190) { ctx.strokeStyle = `rgba(251,191,36,${0.4 * (1 - dm / 190)})`; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(mx, my); ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); window.removeEventListener("mousemove", mm); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}

export default function Shell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const l = new Lenis({ lerp: 0.09 });
    let id = 0;
    const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); l.destroy(); };
  }, []);
  return (<><ScrollProgress /><NeuralCanvas /><CursorGlow /><div className="relative z-10">{children}</div></>);
}
