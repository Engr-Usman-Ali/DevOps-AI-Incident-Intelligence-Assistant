import {
  BrainCircuit,
  Database,
  ShieldCheck,
  FileSearch,
  Bot,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <BrainCircuit size={36} />,
    title: "Intelligent DevOps Features",
    description:
      "Analyzes infrastructure logs using LangGraph and Groq AI to identify incidents, determine severity, and explain root causes in seconds.",
  },
  {
    icon: <FileSearch size={36} />,
    title: "Multi-Platform Log Analysis",
    description:
      "Upload Linux, Docker, Kubernetes, Nginx, Apache, or application logs for intelligent parsing and automated incident detection.",
  },
  {
    icon: <Database size={36} />,
    title: "RAG Knowledge Base",
    description:
      "Retrieves the most relevant troubleshooting guides from ChromaDB using Google Gemini Embeddings for accurate AI responses.",
  },
  {
    icon: <Bot size={36} />,
    title: "Conversational AI Assistant",
    description:
      "Continue chatting about the same incident, ask follow-up questions, and receive contextual explanations powered by Groq AI.",
  },
  {
    icon: <Workflow size={36} />,
    title: "Automation & Incident Reporting",
    description:
      "Automatically generates structured incident reports and sends them through n8n workflows, enabling instant notification and ticket-ready summaries.",
  },
  {
    icon: <ShieldCheck size={36} />,
    title: "Hybrid AI Intelligence",
    description:
      "Combines AI reasoning, RAG knowledge retrieval, and live DuckDuckGo web search to deliver accurate troubleshooting recommendations for DevOps incidents.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Intelligent DevOps Features</h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-400">
            An end-to-end AI-powered DevOps Incident Intelligence platform that
            combines LangGraph workflows, Groq AI, RAG with ChromaDB and Gemini
            Embeddings, DuckDuckGo web search, and n8n automation to detect,
            analyze, and resolve infrastructure incidents faster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-blue-500 transition"
            >
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">{feature.title}</h3>

              <p className="text-gray-400 mt-4 leading-7">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
