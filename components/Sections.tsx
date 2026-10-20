"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Mail, Phone, Github, Mic, Plug, Search, Smartphone } from "lucide-react";
import { experience, skills, offers, profile, PLAY } from "@/lib/data";
import ContactForm from "./ContactForm";
import { BeamBox, Magnetic, Marquee, Meteors, Reveal } from "./fx";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const h = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
      <Reveal><h2 className="text-4xl font-semibold text-white">Experience</h2></Reveal>
      <ol ref={ref} className="relative mt-10 space-y-12 pl-8">
        <span className="absolute bottom-0 left-0 top-0 w-px bg-white/10" />
        <motion.span style={{ scaleY: h }} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-signal via-volt to-ember" />
        {experience.map((e, i) => (
          <li key={e.org} className="relative">
            <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300 }} className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-signal ring-4 ring-ink" />
            <Reveal x={i % 2 ? 40 : -40}>
              <div className="glass rounded-2xl p-6 transition hover:border-signal/30">
                <h3 className="text-lg font-semibold text-white">{e.role}, {e.org}</h3>
                <p className="text-sm text-zinc-500">{e.when}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-zinc-400">{e.pts.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </Reveal>
          </li>))}
      </ol>
      <Reveal><div className="glass mt-12 rounded-2xl p-6"><h3 className="font-semibold text-white">Education</h3><p className="mt-2 text-sm text-zinc-400">{profile.education}</p></div></Reveal>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-6"><Reveal><h2 className="text-4xl font-semibold text-white">Skills</h2></Reveal></div>
      <div className="mt-10 space-y-8">
        {Object.entries(skills).map(([g, items], i) => (
          <Reveal key={g}>
            <p className="mx-auto mb-3 max-w-6xl px-6 text-sm font-medium text-signal">{g}</p>
            <Marquee items={items} reverse={i % 2 === 1} />
          </Reveal>))}
      </div>
    </section>
  );
}

const icons = [Mic, Plug, Search, Smartphone];
export function Agency() {
  return (
    <section id="agency" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <BeamBox>
          <div className="relative overflow-hidden p-8 md:p-14">
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "url(/agency-bg.svg)", backgroundSize: "cover" }} />
            <Meteors />
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-volt/20 blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl font-semibold text-white">SNQFlow: AI automation agency</h2>
              <p className="mt-3 max-w-xl text-zinc-400">Custom voice agents, POS integrations, RAG pipelines and mobile apps for teams that need them live and reliable.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {offers.map((o, i) => { const I = icons[i]; return (
                  <motion.div key={o.t} whileHover={{ y: -6, borderColor: "rgba(94,234,212,.5)" }} className="rounded-xl border border-white/10 bg-ink/60 p-5 backdrop-blur-md">
                    <motion.div whileHover={{ rotate: 12, scale: 1.15 }} className="inline-block text-signal"><I size={22} /></motion.div>
                    <h3 className="mt-3 font-semibold text-white">{o.t}</h3><p className="mt-1 text-sm text-zinc-400">{o.d}</p>
                  </motion.div>); })}
              </div>
              <ContactForm />
            </div>
          </div>
        </BeamBox>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const a = "inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white";
  return (
    <footer className="mx-auto max-w-6xl border-t border-white/10 px-6 py-12">
      <p className="animate-shimmer bg-gradient-to-r from-signal via-volt to-ember bg-[length:200%_auto] bg-clip-text text-4xl font-semibold text-transparent md:text-6xl">Let&apos;s build something that ships.</p>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex flex-wrap gap-6">
          <a className={a} href={`mailto:${profile.email}`}><Mail size={15} />{profile.email}</a>
          <a className={a} href="tel:+923205007634"><Phone size={15} />{profile.phone}</a>
          <a className={a} href={profile.github} target="_blank" rel="noreferrer"><Github size={15} />GitHub</a>
          <a className={a} href={PLAY} target="_blank" rel="noreferrer"><Smartphone size={15} />Google Play</a>
        </div>
      </div>
    </footer>
  );
}
