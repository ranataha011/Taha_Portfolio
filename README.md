# Taha Jabbar Rana: Portfolio
Next.js 14 (App Router), TypeScript, Tailwind, Framer Motion, Lucide.

    npm install
    npm run dev      # http://localhost:3000
    npm run build

All content lives in `lib/data.ts`. Deploy to Vercel by importing the repo.

## Adding a project
Append an object to `projects` in `lib/data.ts`:

    { name: "My Project", cat: "ai", motif: "agents", accent: "#a78bfa", stack: ["Python"], desc: "...", links: [gh("user/repo/tree/main")] }

`motif` picks the animated cover: voice, pos, rag, agents, shield, mcp, hand, calendar, tokens, city, path, hotel, chart, tiles, procs.
Leave it out and a unique constellation is generated from the project name. Set `flagship: true` to list it under the flagship tab and `badge` to span two columns.

## Contact form
The form posts to FormSubmit (https://formsubmit.co) and delivers to the email in `lib/data.ts`.
The first submission after deploying sends an activation email to that inbox: click the confirm link once (check Spam), and every later message arrives normally.
