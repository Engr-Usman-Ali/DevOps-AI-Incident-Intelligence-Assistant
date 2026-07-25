import { Brain, Database, Workflow } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <h2 className="text-5xl font-bold">About Our Platform</h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            DevOps AI Incident Intelligence Assistant is an AI-powered platform
            that analyzes infrastructure logs, identifies root causes, retrieves
            relevant troubleshooting knowledge using Retrieval-Augmented
            Generation (RAG), performs live web search for the latest solutions,
            and automatically generates structured incident reports for DevOps
            teams.
          </p>
        </div>

        {/* Feature Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* AI Analysis */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <Brain className="mb-4 text-blue-500" size={40} />

            <h3 className="mb-3 text-2xl font-semibold">
              AI Incident Analysis
            </h3>

            <p className="text-gray-400">
              Powered by <strong>LangGraph</strong> and the{" "}
              <strong>Groq LLM</strong> to analyze uploaded logs, detect
              incident severity, identify root causes, and generate actionable
              remediation steps with confidence scoring.
            </p>
          </div>

          {/* RAG */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <Database className="mb-4 text-green-500" size={40} />

            <h3 className="mb-3 text-2xl font-semibold">
              Smart Knowledge Retrieval
            </h3>

            <p className="text-gray-400">
              Uses <strong>Google Gemini Embeddings</strong>,
              <strong> ChromaDB</strong>, and
              <strong> DuckDuckGo Web Search</strong> to combine internal
              knowledge with the latest troubleshooting information for accurate
              and context-aware incident analysis.
            </p>
          </div>

          {/* Automation */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <Workflow className="mb-4 text-purple-500" size={40} />

            <h3 className="mb-3 text-2xl font-semibold">
              Automated Incident Reporting
            </h3>

            <p className="text-gray-400">
              Integrates with <strong>n8n</strong> to automatically create
              professional incident reports and deliver them through
              <strong> Gmail</strong>, reducing manual reporting and
              accelerating DevOps response workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
