"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Mail, Smartphone } from "lucide-react";
import { profile, PLAY } from "@/lib/data";
import { Magnetic, Marquee, Ticker } from "./fx";

const roles = ["Production AI Engineer", "Founder of SNQFlow", "Voice Agent Architect", "Flutter Developer"];
const tech = ["Vapi", "FastAPI", "LangGraph", "ElevenLabs", "n8n", "ChromaDB", "MCP", "WebSockets", "Flutter", "Firebase", "PyTorch", "Docker"];
const trace = [
  "$ agent.run --client tigerbite --channel voice",
  "[stt]   caller: \"two zinger burgers, extra spicy\"",
  "[llm]   intent=place_order  confidence=0.97",
  "[tool]  foodhub.validate_menu(items=2) -> ok",
  "[tool]  foodhub.create_order(total=£14.80) -> #48213",
  "[tts]   streaming reply... first audio 412ms",
  "[done]  order dispatched",
];

function Terminal() {
  const [n, setN] = useState(0);
  useEffect(() => { const id = setInterval(() => setN((v) => (v > trace.length + 2 ? 0 : v + 1)), 1000); return () => clearInterval(id); }, []);
  return (
    <div className="glass overflow-hidden rounded-xl font-mono text-[13px] shadow-2xl shadow-signal/10" aria-label="Simulated agent trace">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-ember/70" /><span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
        <span className="ml-3 text-xs text-zinc-500">snqflow / agent-trace</span>
        <span className="ml-auto flex items-end gap-0.5" aria-hidden>{[0, 1, 2, 3, 4].map((i) => (
          <motion.span key={i} className="w-0.5 rounded bg-signal" animate={{ height: [4, 14, 6, 12, 4] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.12 }} />))}</span>
      </div>
      <div className="relative min-h-[250px] space-y-1.5 p-4">
        <div className="absolute inset-x-0 top-0 h-px overflow-hidden"><div className="h-px w-1/4 animate-beam bg-gradient-to-r from-transparent via-signal to-transparent" /></div>
        {trace.slice(0, n).map((l, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={l.startsWith("[tool]") ? "text-volt" : l.startsWith("[done]") ? "text-signal" : "text-zinc-300"}>{l}</motion.p>))}
        <span className="inline-block h-4 w-2 animate-blink bg-signal align-middle" />
      </div>
    </div>
  );
}

export default function Hero() {
  const [r, setR] = useState(0);
  useEffect(() => { const id = setInterval(() => setR((v) => (v + 1) % roles.length), 2400); return () => clearInterval(id); }, []);
  const btn = "inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition";
  const words = profile.name.split(" ");
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-90 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" style={{ backgroundImage: "url(/hero-bg.svg)", backgroundSize: "cover", backgroundPosition: "center" }} />
      <motion.div animate={{ y: [0, -24, 0], x: [0, 16, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-volt/20 blur-3xl" />
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-signal/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-2 lg:pt-40">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-4 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs text-signal">
            <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-signal" /><span className="h-2 w-2 rounded-full bg-signal" /></span>Open to remote contracts
          </motion.p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
            {words.map((w, i) => (
              <motion.span key={w} className="mr-4 inline-block" initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>{w}</motion.span>))}
          </h1>
          <div className="mt-5 h-12 overflow-hidden text-3xl font-semibold md:text-4xl">
            <AnimatePresence mode="wait">
              <motion.p key={r} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.4 }}
                className="animate-shimmer bg-gradient-to-r from-signal via-volt to-ember bg-[length:200%_auto] bg-clip-text text-transparent">{roles[r]}</motion.p>
            </AnimatePresence>
          </div>
          <p className="mt-4 max-w-md text-zinc-400">{profile.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic><a href="#agency" className={`${btn} bg-signal text-ink hover:bg-white`}><Mail size={16} />Work with me</a></Magnetic>
            <Magnetic><a href={profile.github} target="_blank" rel="noreferrer" className={`${btn} glass hover:border-white/30`}><Github size={16} />GitHub</a></Magnetic>
            <Magnetic><a href={PLAY} target="_blank" rel="noreferrer" className={`${btn} glass hover:border-white/30`}><Smartphone size={16} />Play Store</a></Magnetic>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40, rotateY: -12 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ duration: 1, delay: 0.5 }} style={{ transformPerspective: 1000 }}>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><Terminal /></motion.div>
        </motion.div>
      </div>
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 pb-10 md:grid-cols-4">
        {[[30, "+", "Projects built"], [3, "", "Apps on Google Play"], [6, "", "Agents in DevMind"], [90.3, "%", "DistilBERT val. accuracy"]].map(([n, s, l]) => (
          <div key={l as string} className="glass rounded-xl p-4"><p className="text-3xl font-semibold text-white"><Ticker to={n as number} suffix={s as string} decimals={n === 90.3 ? 1 : 0} /></p><p className="text-xs text-zinc-500">{l}</p></div>))}
      </div>
      <div className="relative pb-10"><Marquee items={tech} /></div>
    </section>
  );
}
