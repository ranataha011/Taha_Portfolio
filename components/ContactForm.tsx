"use client";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Mail, Send } from "lucide-react";
import { profile } from "@/lib/data";

const field = "w-full rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm text-white outline-none backdrop-blur-md transition placeholder:text-zinc-600 focus:border-signal/60";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState({ name: "", email: "", message: "" });

  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent("SNQFlow project inquiry")}&body=${encodeURIComponent(msg.message)}`;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...msg, _subject: `SNQFlow inquiry from ${msg.name}`, _replyto: msg.email, _template: "table", _captcha: "false" }),
      });
      const data = await res.json();
      setState(res.ok && data.success !== "false" ? "sent" : "error");
    } catch { setState("error"); }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
  }

  if (state === "sent")
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-10 rounded-xl border border-signal/40 bg-signal/10 p-6 text-signal" role="status">
        <p className="flex items-center gap-2 font-semibold"><Check size={18} />Message sent</p>
        <p className="mt-1 text-sm text-zinc-300">Thanks, {msg.name}. You will get a reply at {msg.email}.</p>
      </motion.div>
    );

  return (
    <form onSubmit={submit} className="mt-10 grid max-w-xl gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required className={field} placeholder="Your name" aria-label="Your name" value={msg.name} onChange={(e) => setMsg({ ...msg, name: e.target.value })} />
        <input required type="email" className={field} placeholder="Your email" aria-label="Your email" value={msg.email} onChange={(e) => setMsg({ ...msg, email: e.target.value })} />
      </div>
      <textarea required rows={4} className={field} placeholder="What do you want to build? (voice agent, RAG, POS integration, mobile app)" aria-label="Project details" value={msg.message} onChange={(e) => setMsg({ ...msg, message: e.target.value })} />
      <div className="flex flex-wrap items-center gap-3">
        <button disabled={state === "sending"} className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-medium text-ink transition hover:bg-white disabled:opacity-60"><Send size={16} />{state === "sending" ? "Sending..." : "Send message"}</button>
        <a href={gmail} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-zinc-300 hover:border-white/30 hover:text-white"><Mail size={15} />Open in Gmail</a>
        <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-zinc-300 hover:border-white/30 hover:text-white">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Copied" : profile.email}</button>
      </div>
      {state === "error" && <p role="alert" className="text-sm text-ember">The message did not go through. Use Open in Gmail or copy the address and email {profile.email} directly.</p>}
    </form>
  );
}
