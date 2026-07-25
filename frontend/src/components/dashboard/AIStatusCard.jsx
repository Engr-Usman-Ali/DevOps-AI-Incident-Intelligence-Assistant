import {
  Brain,
  Database,
  Search,
  Workflow,
  Mail,
  Activity,
} from "lucide-react";

export default function AIStatusCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          AI Infrastructure
        </h2>

        <span className="flex items-center gap-2 text-green-400">
          <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
          Online
        </span>
      </div>

      <div className="mt-8 space-y-6">
        <StatusItem
          icon={<Brain />}
          title="LLM"
          value="Groq • Llama 3"
        />

        <StatusItem
          icon={<Database />}
          title="Embeddings"
          value="Google Gemini"
        />

        <StatusItem
          icon={<Search />}
          title="Web Search"
          value="DuckDuckGo"
        />

        <StatusItem
          icon={<Workflow />}
          title="Workflow"
          value="LangGraph"
        />

        <StatusItem
          icon={<Mail />}
          title="Automation"
          value="n8n + Gmail"
        />

        <StatusItem
          icon={<Activity />}
          title="Status"
          value="Operational"
          valueColor="text-green-400"
        />
      </div>

      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <h3 className="mb-3 font-semibold text-cyan-400">
          AI Pipeline
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Pipeline>Upload Log</Pipeline>

          <Arrow />

          <Pipeline>Parser</Pipeline>

          <Arrow />

          <Pipeline>RAG</Pipeline>

          <Arrow />

          <Pipeline>LLM</Pipeline>

          <Arrow />

          <Pipeline>Report</Pipeline>

          <Arrow />

          <Pipeline>Email</Pipeline>
        </div>
      </div>
    </div>
  );
}

function StatusItem({
  icon,
  title,
  value,
  valueColor = "text-white",
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-cyan-400">
          {icon}
        </div>

        <span className="text-slate-400">
          {title}
        </span>
      </div>

      <span className={`font-semibold ${valueColor}`}>
        {value}
      </span>
    </div>
  );
}

function Pipeline({ children }) {
  return (
    <span className="rounded-lg bg-slate-800 px-3 py-2 text-slate-300">
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <span className="text-slate-500">
      →
    </span>
  );
}