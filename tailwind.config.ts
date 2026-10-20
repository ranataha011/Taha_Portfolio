import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#05070b", signal: "#5eead4", volt: "#a78bfa", ember: "#fbbf24" },
      fontFamily: { sans: ["var(--font-sans)", "system-ui"], mono: ["var(--font-mono)", "monospace"] },
      keyframes: {
        beam: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(400%)" } },
        blink: { "50%": { opacity: "0" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        meteor: { "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" }, "70%": { opacity: "1" }, "100%": { transform: "rotate(215deg) translateX(-700px)", opacity: "0" } },
        shimmer: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
        spin: { to: { transform: "rotate(360deg)" } },
      },
      animation: { beam: "beam 3s linear infinite", blink: "blink 1s step-end infinite",
        marquee: "marquee 35s linear infinite", meteor: "meteor 5s linear infinite", shimmer: "shimmer 5s linear infinite", "spin-slow": "spin 8s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
