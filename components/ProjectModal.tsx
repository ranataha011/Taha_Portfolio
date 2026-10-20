"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Lock, X } from "lucide-react";
import type { Project } from "@/lib/data";
import Art from "./ProjectArt";

export default function ProjectModal({ p, onClose }: { p: Project | null; onClose: () => void }) {
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);
  return (
    <AnimatePresence>
      {p && (
        <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-label={p.name} data-lenis-prevent onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-ink">
            <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-zinc-300 hover:text-white"><X size={16} /></button>
            <Art motif={p.motif} accent={p.accent} name={p.name} className="h-64 w-full" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-white">{p.name}</h3>
              {p.badge && <span className="mt-2 inline-block rounded-full border border-ember/40 bg-ember/10 px-2.5 py-0.5 text-xs text-ember">{p.badge}</span>}
              <p className="mt-4 leading-relaxed text-zinc-300">{p.desc}</p>
              {p.pipeline && <p className="mt-4 font-mono text-xs text-signal">{p.pipeline.join("  →  ")}</p>}
              <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map((s) => <span key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-zinc-300">{s}</span>)}</div>
              <div className="mt-6 flex flex-wrap gap-4">
                {p.links.length === 0 && <span className="inline-flex items-center gap-1.5 text-sm text-zinc-500"><Lock size={14} />Private client work</span>}
                {p.links.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-signal px-4 py-2 text-sm font-medium text-ink hover:bg-white">{l.label}<ExternalLink size={14} /></a>)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
