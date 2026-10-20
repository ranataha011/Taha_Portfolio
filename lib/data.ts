import type { Motif } from "@/components/ProjectArt";
export type Cat = "ai" | "nlp" | "mobile";
export type Project = {
  name: string; cat: Cat; motif?: Motif; accent?: string; flagship?: boolean; badge?: string; stack: string[]; desc: string;
  pipeline?: string[]; links: { label: string; url: string }[];
};

export const PLAY = "https://play.google.com/store/apps/developer?id=T+Square+Studio";
const gh = (p: string, label = "View on GitHub") => ({ label, url: `https://github.com/${p}` });

export const profile = {
  name: "Taha Jabbar Rana",
  headline: "AI Engineer | Founder at SNQFlow | Mobile App Developer",
  sub: "Building production-ready multi-agent systems, ultra-low-latency voice automation, and enterprise RAG backends.",
  email: "rana.taha5t@gmail.com", phone: "+92 320 5007634", github: "https://github.com/ranataha011",
  location: "Islamabad, Pakistan. Available for remote global contracts and B2B agency work.",
  education: "BSc Computer Science, FAST-NUCES Islamabad (expected June 2028). Coursework: Artificial Intelligence, Data Structures & Algorithms, Operating Systems, OOP, Database Systems.",
};

export const projects: Project[] = [
  { name: "Tigerbite Delivery AI Voice Agent", motif: "pos", accent: "#fb923c", cat: "ai", flagship: true, badge: "Live testing phase · Commercial client",
    stack: ["Vapi", "FastAPI", "Python", "Foodhub POS API", "Webhooks"],
    desc: "Autonomous inbound/outbound delivery ordering agent for UK chain Tigerbite, built under SNQFlow. A high-concurrency FastAPI backend connects Vapi voice streams to Foodhub POS to validate menus, customise orders and dispatch deliveries in real time.",
    pipeline: ["Vapi", "FastAPI", "Foodhub POS"], links: [] },
  { name: "Streaming_Voice_Agent", motif: "voice", accent: "#5eead4", cat: "ai", flagship: true, stack: ["Python", "FastAPI", "WebSockets", "AudioWorklets", "STT/LLM/TTS"],
    desc: "Sub-second, full-duplex voice agent over raw WebSockets. Custom sentence/token chunking, real-time turn arbitration, barge-in handling and granular latency telemetry.",
    pipeline: ["Mic Worklet", "Streaming STT", "LLM", "Chunker", "TTS", "Player Worklet"], links: [gh("ranataha011/Streaming_Voice_Agent/tree/main")] },
  { name: "SEC_Filling_RAG_QA", motif: "rag", accent: "#60a5fa", cat: "ai", flagship: true, stack: ["Python", "FastAPI", "BM25 + Dense", "Cross-Encoder", "Corrective RAG"],
    desc: "Enterprise financial RAG backend for SEC 10-K/10-Q filings: structure-aware HTML parsing, agentic chunking, reciprocal rank fusion, prompt-injection defence tests, citation verification and golden-dataset evals.",
    pipeline: ["Hybrid Search", "Rank Fusion", "Cross-Encoder Reranker", "Cited Answer"], links: [gh("ranataha011/SEC_Filling_RAG_QA/tree/main")] },
  { name: "DevMind", motif: "agents", accent: "#a78bfa", cat: "ai", flagship: true, stack: ["LangGraph", "FastAPI", "ChromaDB", "GitHub API"],
    desc: "Autonomous multi-agent engineering pipeline that turns GitHub issues into tested pull requests, using six specialised agents over a ChromaDB codebase index.",
    pipeline: ["Analyst", "Architect", "Developer", "Critic", "QA", "PR Writer"], links: [gh("ranataha011/DevMind/tree/main")] },
  { name: "DevMate_LLM", motif: "shield", accent: "#34d399", cat: "ai", flagship: true, stack: ["FastAPI", "NeMo Guardrails", "Tavily", "Session Memory"],
    desc: "Production LLM assistant API with input/output safety guardrails, persistent conversation memory, function-calling tools and per-request token cost tracking.",
    pipeline: ["Input Rail", "LLM + Tools", "Output Rail", "Cost Telemetry"], links: [gh("ranataha011/DevMate_LLM/tree/main")] },
  { name: "Order_Management_MCP_Server", motif: "mcp", accent: "#f472b6", cat: "ai", flagship: true, stack: ["MCP", "Python", "FastAPI", "Colang Rails", "Idempotency Keys"],
    desc: "MCP server exposing commerce tools (create_order, restock_product, search_inventory, get_inventory_report, update_order_status) to LLM agents, with idempotency keys preventing duplicate transactions.",
    pipeline: ["LLM Agent", "MCP Tools", "Idempotency Check", "Order Store"], links: [gh("ranataha011/Order_Management_MCP_Server/tree/main")] },
  { name: "AirCursor", motif: "hand", accent: "#22d3ee", cat: "ai", flagship: true, stack: ["OpenCV", "MediaPipe", "Python", "1€ Filter", "pynput"],
    desc: "Touchless mouse control from webcam hand landmarks. A 1€ filter removes jitter while keeping cursor response lag-free.",
    pipeline: ["Webcam", "MediaPipe Landmarks", "1€ Filter", "OS Mouse"], links: [gh("ranataha011/AirCursor/tree/main")] },
  { name: "Dental Clinic Automation Voice Agent", motif: "calendar", accent: "#38bdf8", cat: "ai", flagship: true, badge: "Production client deployment",
    stack: ["Vapi", "ElevenLabs", "n8n", "Agentic AI"],
    desc: "Production voice agent for a dental clinic that automates appointment booking, patient inquiries and follow-up calls with no human involvement.",
    pipeline: ["Vapi", "n8n Workflow", "Calendar", "ElevenLabs TTS"], links: [] },
  { name: "NLP Engineering Roadmap", motif: "tokens", accent: "#fbbf24", cat: "nlp", stack: ["PyTorch", "DistilBERT", "LangChain", "Colab GPU"],
    desc: "Fine-tuned DistilBERT on AG News reaching 90.3% validation accuracy (with overfitting diagnosis and mitigation), plus tool-using LangChain ReAct agents.",
    links: [gh("ranataha011/nlp-engineering-roadmap/tree/main")] },
  { name: "CityMind: Urban Multi-Agent Intelligence", motif: "city", accent: "#4ade80", cat: "nlp", stack: ["Python", "scikit-learn", "NetworkX", "PyQt6", "EventBus"],
    desc: "Real-time city simulation on a 10x10 graph combining CSP (Backtracking + AC-3), Genetic Algorithm, Simulated Annealing, K-Means, Decision Trees and A* emergency routing.",
    links: [gh("ranataha011/CityMind-Urban-Intelligence-System/tree/main")] },
  { name: "Informed & Uninformed Searches", motif: "path", accent: "#f97316", cat: "nlp", stack: ["Python", "Jupyter", "ipywidgets"],
    desc: "BFS, DFS, UCS and A* (Manhattan and Euclidean) built from scratch on weighted terrain grids with custom stack, queue and priority-queue structures.",
    links: [gh("ranataha011/Informed-and-Uninformed-Searches/tree/main")] },
  { name: "InnSight: Hotel Reservation AI", motif: "hotel", accent: "#c084fc", cat: "nlp", stack: ["Java", "JavaFX", "Botpress", "SQLite"],
    desc: "Hotel reservation chatbot and management system handling bookings, cancellations and guest inquiries with SQLite persistence.",
    links: [gh("ranataha011/InnSight-HotelReservationAI/tree/main", "AI Reservation repo"), gh("shahramshafiq/innsight-hotel-management/tree/master", "Management system repo")] },
  { name: "Spendly & Ledgerly", motif: "chart", accent: "#34d399", cat: "mobile", stack: ["Flutter", "Dart", "Firebase Auth", "Firestore", "Provider"],
    desc: "Personal finance and ledger tracking with real-time Firestore sync, custom analytics charts and live currency conversion. Published on Google Play.",
    links: [{ label: "View on Play Store", url: PLAY }, gh("shahramshafiq/ledgerly/tree/main", "Ledgerly on GitHub")] },
  { name: "2048 Mania & Sudoku Game", motif: "tiles", accent: "#fbbf24", cat: "mobile", stack: ["Flutter", "Dart", "SQLite", "React policy portal"],
    desc: "Two puzzle games live on Google Play under T Square Studio, with gesture animations, multi-difficulty puzzle generation and offline high-score storage.",
    links: [{ label: "View on Play Store", url: PLAY }] },
  { name: "OS-Arena: Multi-Process RPG Engine", motif: "procs", accent: "#f87171", cat: "mobile", stack: ["C++17", "POSIX IPC", "pthreads", "Semaphores", "Docker"],
    desc: "Multi-process, multi-threaded turn-based RPG engine that synchronises PvP state across isolated OS processes using shared memory and semaphores.",
    links: [gh("ranataha011/OS-Arena/tree/main")] },
  { name: "Smart City Management System: Islamabad", motif: "city", accent: "#2dd4bf", cat: "mobile", stack: ["C++/Python", "Graph Routing", "DSA"],
    desc: "Urban management system for Islamabad modelling city zones, emergency routing and public resource management.",
    links: [gh("ranataha011/Smart-City-Management-System---Islamabad/tree/main")] },
];

export const tabs: { id: "all" | "flagship" | "nlp" | "mobile"; label: string }[] = [
  { id: "all", label: "All" }, { id: "flagship", label: "Production AI & Voice (Flagship)" },
  { id: "nlp", label: "Classical AI & NLP" }, { id: "mobile", label: "Mobile & Systems Engineering" },
];

export const experience = [
  { role: "Founder & Lead AI Engineer", org: "SNQFlow", when: "Present · Independent AI startup",
    pts: ["Leading a technology company building custom AI automation software and full-duplex voice agents for B2B clients.",
          "Architecting end-to-end AI pipelines with FastAPI, WebSockets, Vapi, LangGraph and modern LLM frameworks to automate high-volume operational workflows."] },
  { role: "STEM Trainer & Python Instructor", org: "Junior Coderz", when: "Feb 2026 – Present · Remote, part-time",
    pts: ["Teaching Python and computer science fundamentals to international students using CodeHS and Scratch."] },
  { role: "Mobile App Developer (Full-time & Internship)", org: "ETOS Way IT Services", when: "Feb 2025 – Sep 2025 · Islamabad",
    pts: ["Shipped 3 Flutter/Dart apps (Spendly, 2048 Mania, Sudoku Game) with Firebase backends, from architecture and state management (Provider/Riverpod) to Play Store release.",
          "Built real-time Firestore sync, Firebase Auth, REST integrations and policy-compliant web portals, holding a 4.0+ rating."] },
];

export const skills: Record<string, string[]> = {
  "LLM & Agentic AI": ["LangGraph", "LangChain", "Anthropic MCP", "Agentic RAG", "Hybrid Search (BM25 + Vector)", "Cross-Encoder Reranking", "NeMo Guardrails", "Prompt Engineering"],
  "Voice AI & Automation": ["Vapi", "ElevenLabs", "WebSocket Audio Streaming", "AudioWorklets", "n8n", "Botpress", "Foodhub POS Integration", "Workflow Automation"],
  "ML & Deep Learning": ["PyTorch", "Hugging Face Transformers", "scikit-learn", "MediaPipe", "OpenCV", "A*", "CSP (AC-3)", "Genetic Algorithms", "Simulated Annealing", "K-Means", "Decision Trees"],
  "Backend, Vector DBs & DevOps": ["Python", "FastAPI", "ChromaDB", "SQLAlchemy", "REST APIs", "Docker", "Linux", "Git/GitHub", "SQLite", "Firebase"],
  "Mobile & Systems": ["Flutter", "Dart", "Provider", "Riverpod", "C++17", "Java", "SQL", "POSIX IPC", "pthreads", "PyQt6"],
};

export const offers = [
  { t: "Voice agents", d: "Full-duplex inbound and outbound agents on Vapi and ElevenLabs, tuned for sub-second response." },
  { t: "POS and system integrations", d: "Connect agents to Foodhub and other order or booking systems through FastAPI and webhooks." },
  { t: "RAG pipelines", d: "Hybrid search, reranking, citation checks and evals for document-heavy domains." },
  { t: "Mobile apps", d: "Flutter and Firebase apps taken from design to Google Play release." },
];
