"use client";
import { ReactElement, useRef } from "react";
import { motion, useInView } from "framer-motion";

export type Motif = "voice" | "pos" | "rag" | "agents" | "shield" | "mcp" | "hand" | "calendar" | "tokens" | "city" | "path" | "hotel" | "chart" | "tiles" | "procs" | "generic";

const rng = (s: string) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; }; };
const loop = (d: number, delay = 0) => ({ duration: d, repeat: Infinity, delay, ease: "easeInOut" as const });
const fb = { transformBox: "fill-box" as const, transformOrigin: "center" };
const T = ({ x, y, c = "#fff", children }: { x: number; y: number; c?: string; children: string }) => <text x={x} y={y} fill={c} fillOpacity=".65" fontSize="9" fontFamily="monospace">{children}</text>;
const Dot = ({ pts, a, d = 3, delay = 0 }: { pts: number[][]; a: string; d?: number; delay?: number }) => (
  <motion.circle r="3.5" fill={a} initial={{ x: pts[0][0], y: pts[0][1] }} animate={{ x: pts.map((p) => p[0]), y: pts.map((p) => p[1]), opacity: [0, 1, 1, 0] }} transition={{ duration: d, repeat: Infinity, delay, ease: "linear" }} />
);

type Fn = (a: string, r: () => number) => ReactElement;
const M: Record<Motif, Fn> = {
  voice: (a) => <g>{[0, 1].map((l) => Array.from({ length: 30 }, (_, i) => (
    <motion.rect key={`${l}-${i}`} x={20 + i * 12.5} y={l ? 118 : 40} width="6" height="36" rx="3" fill={l ? "#fff" : a} opacity={l ? 0.35 : 0.9} style={fb} animate={{ scaleY: [0.2, 1, 0.3, 0.8, 0.2] }} transition={loop(1.6 + ((i * 7) % 5) * 0.15, i * 0.05)} />)))}
    <T x={20} y={32}>caller</T><T x={20} y={170}>agent (barge-in ready)</T></g>,
  pos: (a) => <g>{Array.from({ length: 9 }, (_, i) => <motion.rect key={i} x={30 + i * 10} y={80} width="5" height="40" rx="2.5" fill={a} style={fb} animate={{ scaleY: [0.3, 1, 0.4] }} transition={loop(1.2, i * 0.08)} />)}
    <motion.path d="M135 100 H250" stroke={a} strokeWidth="2" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -40] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
    <rect x="255" y="40" width="115" height="125" rx="8" fill="#0b1018" stroke={a} strokeOpacity=".7" /><T x={268} y={58} c={a}>ORDER #48213</T>
    {[0, 1, 2, 3].map((i) => <motion.path key={i} d={`M270 ${80 + i * 20} H${340 - i * 14}`} stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, times: [0, 0.3, 0.85, 1] }} />)}</g>,
  rag: (a) => <g>{[0, 1, 2].map((i) => <rect key={i} x={30 + i * 14} y={34 + i * 10} width="90" height="120" rx="6" fill="#0b1018" stroke={a} strokeOpacity={0.3 + i * 0.2} />)}
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="62" y={66 + i * 15} width={60 - (i % 3) * 12} height="4" rx="2" fill="#fff" opacity=".3" />)}
    <motion.rect x="30" width="120" height="3" fill={a} animate={{ y: [40, 150, 40] }} transition={loop(3.5)} />
    {["BM25", "Dense", "Rerank"].map((t, i) => <g key={t}><motion.path d={`M170 100 C210 ${55 + i * 45},230 ${55 + i * 45},270 ${55 + i * 45}`} fill="none" stroke={a} strokeOpacity=".6" strokeDasharray="3 5" animate={{ strokeDashoffset: [0, -32] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
      <rect x="270" y={43 + i * 45} width="100" height="24" rx="6" fill="#0b1018" stroke={a} strokeOpacity=".7" /><T x={286} y={59 + i * 45} c={a}>{t}</T></g>)}</g>,
  agents: (a) => { const p = Array.from({ length: 6 }, (_, i) => [200 + Math.cos((i / 6) * 6.283 - 1.57) * 70, 100 + Math.sin((i / 6) * 6.283 - 1.57) * 70]);
    return <g>{p.map(([x, y], i) => <line key={i} x1="200" y1="100" x2={x} y2={y} stroke={a} opacity=".3" />)}
      {p.map(([x, y], i) => <motion.circle key={i} cx={x} cy={y} r="11" fill="#0b1018" stroke={a} strokeWidth="1.5" style={fb} animate={{ scale: [1, 1.25, 1] }} transition={loop(2, i * 0.33)} />)}
      <circle cx="200" cy="100" r="16" fill={a} opacity=".9" />
      <motion.circle r="4" fill="#fff" initial={{ x: p[0][0], y: p[0][1] }} animate={{ x: [...p.map((q) => q[0]), p[0][0]], y: [...p.map((q) => q[1]), p[0][1]] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} /></g>; },
  shield: (a) => <g><motion.path d="M200 25 L270 52 V105 C270 140 240 162 200 178 C160 162 130 140 130 105 V52 Z" fill={a} fillOpacity=".12" stroke={a} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }} />
    <path d="M175 102 L195 122 L230 82" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {[0, 1].map((i) => <motion.circle key={i} cx="200" cy="102" r="60" fill="none" stroke={a} style={fb} animate={{ scale: [0.6, 1.6], opacity: [0.6, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2 }} />)}
    <T x={24} y={104}>input rail</T><T x={320} y={104}>output rail</T></g>,
  mcp: (a) => <g><circle cx="55" cy="100" r="22" fill="#0b1018" stroke={a} /><T x={42} y={103}>LLM</T>
    <rect x="130" y="70" width="70" height="60" rx="8" fill={a} fillOpacity=".18" stroke={a} /><T x={146} y={104} c={a}>MCP</T>
    {["create_order", "restock_product", "search_inventory", "inventory_report", "update_status"].map((t, i) => <g key={t}><path d={`M200 100 L270 ${30 + i * 35}`} stroke={a} strokeOpacity=".35" />
      <rect x="270" y={18 + i * 35} width="115" height="24" rx="6" fill="#0b1018" stroke={a} strokeOpacity=".6" /><T x={280} y={34 + i * 35}>{t}</T><Dot a={a} pts={[[200, 100], [270, 30 + i * 35]]} d={2.4} delay={i * 0.5} /></g>)}
    <Dot a="#fff" pts={[[77, 100], [130, 100]]} d={1.6} /></g>,
  hand: (a) => <g><motion.g style={fb} animate={{ rotate: [-4, 4, -4] }} transition={loop(4)}>
    {[[[160, 130], [143, 112], [130, 92]], [[180, 118], [176, 88], [172, 58]], [[200, 114], [200, 80], [200, 46]], [[220, 118], [224, 88], [228, 58]], [[238, 128], [247, 105], [256, 82]]].map((f, i) => <g key={i}><polyline points={f.map((q) => q.join(",")).join(" ")} fill="none" stroke={a} strokeWidth="2" strokeOpacity=".7" />{f.map((q, j) => <circle key={j} cx={q[0]} cy={q[1]} r="3.5" fill={a} />)}</g>)}
    <polygon points="160,130 180,118 200,114 220,118 238,128 225,168 180,168" fill={a} fillOpacity=".12" stroke={a} strokeOpacity=".5" /></motion.g>
    <motion.circle r="9" fill="none" stroke="#fff" strokeWidth="2" initial={{ x: 300, y: 60 }} animate={{ x: [300, 350, 310, 360, 300], y: [60, 100, 150, 70, 60] }} transition={loop(6)} /></g>,
  calendar: (a, r) => <g>{Array.from({ length: 28 }, (_, i) => <motion.rect key={i} x={70 + (i % 7) * 38} y={30 + Math.floor(i / 7) * 34} width="30" height="26" rx="5" fill={a} animate={{ opacity: [0.08, r() > 0.7 ? 0.9 : 0.2, 0.08] }} transition={loop(3 + r() * 3, r() * 4)} />)}
    <rect x="270" y="150" width="110" height="30" rx="15" fill="#0b1018" stroke={a} /><T x={286} y={169} c={a}>Booked ✓</T></g>,
  tokens: (a) => { const w = ["Markets", "rally", "as", "rates", "ease"]; return <g>{w.map((t, i) => <g key={t}><rect x={24 + i * 74} y="120" width="66" height="26" rx="6" fill="#0b1018" stroke={a} strokeOpacity=".6" /><T x={34 + i * 74} y={137}>{t}</T></g>)}
    {[[0, 3], [1, 4], [3, 4], [0, 1]].map(([i, j], k) => <motion.path key={k} d={`M${57 + i * 74} 120 Q${(57 + i * 74 + 57 + j * 74) / 2} ${50 - k * 6},${57 + j * 74} 120`} fill="none" stroke={a} strokeWidth="1.5" animate={{ opacity: [0.1, 0.9, 0.1] }} transition={loop(3, k * 0.6)} />)}
    {["World", "Sports", "Business", "Sci/Tech"].map((t, i) => <motion.rect key={t} x={24 + i * 92} y="166" width="84" height="14" rx="4" fill={a} animate={{ opacity: i === 2 ? [0.4, 1, 0.4] : 0.15 }} transition={loop(2)} />)}</g>; },
  city: (a, r) => <g>{Array.from({ length: 28 }, (_, i) => r() > 0.45 && <rect key={i} x={50 + (i % 7) * 48} y={34 + Math.floor(i / 7) * 36} width="28" height="22" rx="3" fill={a} opacity=".14" />)}
    {[40, 76, 112, 148].map((y) => <line key={y} x1="20" x2="380" y1={y} y2={y} stroke="#fff" strokeOpacity=".12" />)}{[40, 88, 136, 184, 232, 280, 328].map((x) => <line key={x} y1="20" y2="180" x1={x} x2={x} stroke="#fff" strokeOpacity=".12" />)}
    <motion.path d="M40 148 H136 V76 H280 V40 H328" fill="none" stroke={a} strokeWidth="3" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1] }} transition={{ duration: 4, repeat: Infinity }} />
    <motion.circle cx="328" cy="40" r="7" fill={a} style={fb} animate={{ scale: [1, 2, 1] }} transition={loop(1.2)} /></g>,
  path: (a, r) => <g>{Array.from({ length: 16 * 7 }, (_, i) => { const c = i % 16, ro = Math.floor(i / 16), d = Math.abs(c - 1) + Math.abs(ro - 3), wall = c === 8 && ro !== 3 && ro !== 0;
    return <motion.rect key={i} x={24 + c * 22} y={24 + ro * 22} width="19" height="19" rx="3" fill={wall ? "#fff" : a} initial={{ opacity: wall ? 0.25 : 0 }} animate={wall ? undefined : { opacity: [0, 0.5, 0.5, 0] }} transition={{ duration: 5, repeat: Infinity, delay: d * 0.1, times: [0, 0.15, 0.85, 1] }} />; })}
    <motion.polyline points="35,97 123,97 211,97 299,97 343,97" fill="none" stroke="#fff" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1] }} transition={{ duration: 5, repeat: Infinity }} /></g>,
  hotel: (a, r) => <g>{[0, 1, 2].map((b) => { const x = 70 + b * 100, h = 90 + (b % 2) * 36; return <g key={b}><rect x={x} y={178 - h} width="80" height={h} rx="4" fill="#0b1018" stroke={a} strokeOpacity=".5" />
    {Array.from({ length: Math.floor((h - 12) / 22) * 3 }, (_, i) => <motion.rect key={i} x={x + 10 + (i % 3) * 22} y={178 - h + 10 + Math.floor(i / 3) * 22} width="14" height="14" rx="2" fill={a} animate={{ opacity: [0.1, 0.9, 0.1] }} transition={loop(3 + r() * 3, r() * 3)} />)}</g>; })}
    <rect x="290" y="20" width="96" height="26" rx="13" fill="#0b1018" stroke={a} /><T x={302} y={37} c={a}>Book a room</T></g>,
  chart: (a, r) => { const p = Array.from({ length: 12 }, (_, i) => [30 + i * 31, 150 - i * 6 - r() * 40]); const line = "M" + p.map((q) => q.join(",")).join(" L");
    return <g>{[50, 90, 130].map((y) => <line key={y} x1="20" x2="380" y1={y} y2={y} stroke="#fff" strokeOpacity=".1" />)}
      <motion.path d={`${line} V175 H30 Z`} fill={a} fillOpacity=".12" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.path d={line} fill="none" stroke={a} strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1] }} transition={{ duration: 4, repeat: Infinity }} />
      {p.map(([x, y], i) => <motion.circle key={i} cx={x} cy={y} r="3.5" fill="#fff" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.25, times: [0, 0.1, 0.9, 1] }} />)}</g>; },
  tiles: (a, r) => <g>{Array.from({ length: 16 }, (_, i) => { const v = r() > 0.35 ? 2 ** (1 + Math.floor(r() * 6)) : 0;
    return <g key={i}><rect x={120 + (i % 4) * 40} y={22 + Math.floor(i / 4) * 40} width="36" height="36" rx="6" fill={v ? a : "#fff"} opacity={v ? 0.2 + Math.log2(v) * 0.1 : 0.06} />
      {v > 0 && <motion.text x={138 + (i % 4) * 40} y={45 + Math.floor(i / 4) * 40} textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace" style={fb} animate={{ scale: [1, 1.25, 1] }} transition={loop(2.5, r() * 2)}>{v}</motion.text>}</g>; })}</g>,
  procs: (a) => <g>{[0, 1, 2].map((i) => <g key={i}><rect x={30 + i * 120} y="28" width="100" height="70" rx="8" fill="#0b1018" stroke={a} strokeOpacity=".7" /><T x={42 + i * 120} y={46} c={a}>{`process ${i + 1}`}</T>
    {[0, 1, 2].map((t) => <motion.rect key={t} x={42 + i * 120 + t * 28} y="58" width="22" height="26" rx="3" fill={a} animate={{ opacity: [0.2, 0.9, 0.2] }} transition={loop(2, (i + t) * 0.3)} />)}
    <Dot a="#fff" pts={[[80 + i * 120, 98], [80 + i * 120, 140]]} d={1.8} delay={i * 0.6} /></g>)}
    <rect x="30" y="140" width="340" height="30" rx="6" fill={a} fillOpacity=".12" stroke={a} strokeDasharray="4 4" /><T x={44} y={159}>POSIX shared memory + semaphores</T></g>,
  generic: (a, r) => { const n = Array.from({ length: 24 }, () => [r() * 380 + 10, r() * 180 + 10]);
    return <g>{n.flatMap((p, i) => n.slice(i + 1).filter((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 90).map((q, j) => <line key={`${i}-${j}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={a} strokeOpacity=".3" />))}
      {n.map(([x, y], i) => <motion.circle key={i} cx={x} cy={y} r="3" fill={a} animate={{ opacity: [0.3, 1, 0.3] }} transition={loop(2 + r() * 2, r() * 2)} />)}</g>; },
};

export default function Art({ motif = "generic", accent = "#5eead4", name, className = "" }: { motif?: Motif; accent?: string; name: string; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const on = useInView(ref, { margin: "120px" });
  const id = name.replace(/\W/g, "");
  return (
    <svg ref={ref} viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <radialGradient id={`g${id}`} cx="72%" cy="25%" r="75%"><stop offset="0" stopColor={accent} stopOpacity=".28" /><stop offset="1" stopColor={accent} stopOpacity="0" /></radialGradient>
        <pattern id={`p${id}`} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#fff" strokeOpacity=".05" /></pattern>
      </defs>
      <rect width="400" height="200" fill="#070b11" /><rect width="400" height="200" fill={`url(#p${id})`} /><rect width="400" height="200" fill={`url(#g${id})`} />
      {on && (M[motif] || M.generic)(accent, rng(name))}
    </svg>
  );
}
