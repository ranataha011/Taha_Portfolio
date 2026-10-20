"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const links = [["Projects", "#projects"], ["Experience", "#experience"], ["Skills", "#skills"], ["Work with me", "#agency"]];
export default function Navbar() {
  const [h, setH] = useState<string | null>(null);
  return (
    <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 16 }}
      className="glass fixed left-1/2 top-4 z-50 flex max-w-[94vw] -translate-x-1/2 gap-1 overflow-x-auto rounded-full px-2 py-1.5" onMouseLeave={() => setH(null)}>
      {links.map(([t, href]) => (
        <a key={t} href={href} onMouseEnter={() => setH(t)} className="relative whitespace-nowrap rounded-full px-4 py-1.5 text-sm text-zinc-300 hover:text-white">
          {h === t && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10" />}
          <span className="relative">{t}</span>
        </a>
      ))}
    </motion.nav>
  );
}
