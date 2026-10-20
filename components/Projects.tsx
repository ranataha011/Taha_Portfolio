"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink, Lock } from "lucide-react";
import { projects, tabs, type Project } from "@/lib/data";
import { Reveal, Tilt } from "./fx";
import Art from "./ProjectArt";
import ProjectModal from "./ProjectModal";

function Pipeline({ steps, a }: { steps: string[]; a: string }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5 font-mono text-[11px]" aria-label="Pipeline">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-1.5">
          <motion.span animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }} className="rounded border px-2 py-0.5" style={{ color: a, borderColor: a + "55", background: a + "18" }}>{s}</motion.span>
          {i < steps.length - 1 && <ArrowRight size={12} className="text-zinc-600" />}
        </span>))}
    </div>
  );
}

function Card({ p, open }: { p: Project; open: () => void }) {
  const a = p.accent ?? "#5eead4";
  return (
    <motion.article layout initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={`cursor-pointer ${p.badge ? "lg:col-span-2" : ""}`} onClick={open} tabIndex={0} role="button" aria-label={`Open ${p.name}`} onKeyDown={(e) => e.key === "Enter" && open()}>
      <Tilt className="glass flex h-full flex-col overflow-hidden rounded-2xl transition-colors hover:border-white/30">
        <Art motif={p.motif} accent={a} name={p.name} className="h-40 w-full [mask-image:linear-gradient(to_bottom,black_65%,transparent)]" />
        <div className="flex flex-1 flex-col p-6 pt-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">{p.name}</h3>
            {p.badge && <span className="shrink-0 rounded-full border border-ember/40 bg-ember/10 px-2.5 py-0.5 text-[11px] text-ember">{p.badge}</span>}
          </div>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
          {p.pipeline && <Pipeline steps={p.pipeline} a={a} />}
          <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.slice(0, 5).map((s) => <span key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-zinc-300">{s}</span>)}</div>
          <div className="mt-auto flex flex-wrap gap-4 pt-5">
            {p.links.length === 0 && <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500"><Lock size={12} />Private client work</span>}
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="group inline-flex items-center gap-1.5 text-sm hover:text-white" style={{ color: a }}>{l.label}<ExternalLink size={13} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>))}
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
}

export default function Projects() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const [sel, setSel] = useState<Project | null>(null);
  const list = projects.filter((p) => tab === "all" || (tab === "flagship" ? p.flagship : p.cat === tab));
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal><h2 className="text-4xl font-semibold text-white">Projects</h2><p className="mt-2 max-w-xl text-zinc-400">A selection from 30+ projects. Click a card for the full breakdown.</p></Reveal>
      <div role="tablist" className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className="relative rounded-full px-4 py-1.5 text-sm text-zinc-300 transition hover:text-white">
            {tab === t.id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-signal to-volt" transition={{ type: "spring", stiffness: 300, damping: 28 }} />}
            <span className={`relative ${tab === t.id ? "font-medium text-ink" : ""}`}>{t.label}</span>
          </button>))}
      </div>
      <motion.div layout className="mt-8 grid grid-flow-dense gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">{list.map((p) => <Card key={p.name} p={p} open={() => setSel(p)} />)}</AnimatePresence>
      </motion.div>
      <ProjectModal p={sel} onClose={() => setSel(null)} />
    </section>
  );
}
