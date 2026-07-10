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
    title: "AI Root Cause Analysis",
    description:
      "Automatically detects the root cause of incidents using AI reasoning and intelligent log analysis.",
  },
  {
    icon: <FileSearch size={36} />,
    title: "Log Analysis",
    description:
      "Upload Linux, Docker, Kubernetes, or application logs for instant analysis.",
  },
  {
    icon: <Database size={36} />,
    title: "RAG Knowledge Base",
    description:
      "Retrieves relevant troubleshooting documents using vector search with ChromaDB.",
  },
  {
    icon: <Bot size={36} />,
    title: "AI Assistant",
    description:
      "Interact with an AI chatbot to ask questions about logs and receive detailed explanations.",
  },
  {
    icon: <Workflow size={36} />,
    title: "Workflow Automation",
    description:
      "Automatically create incident reports and integrate with automation platforms.",
  },
  {
    icon: <ShieldCheck size={36} />,
    title: "Security Monitoring",
    description:
      "Identify suspicious activities, configuration issues, and infrastructure failures quickly.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold">

            Powerful Features

          </h2>

          <p className="text-gray-400 mt-5 text-lg max-w-3xl mx-auto">

            Everything a DevOps engineer needs to analyze incidents,
            understand failures, and resolve problems faster using Artificial Intelligence.

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

              <h3 className="text-2xl font-bold mt-6">

                {feature.title}

              </h3>

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