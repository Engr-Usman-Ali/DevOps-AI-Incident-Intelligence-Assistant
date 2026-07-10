import { Cpu, Brain, Database } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold">
            About Our Platform
          </h2>

          <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg">
            AI DevOps Incident Intelligence Assistant helps DevOps engineers
            analyze logs, identify root causes, retrieve troubleshooting
            knowledge, and generate intelligent solutions using Artificial Intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <Brain className="text-blue-500 mb-4" size={40} />
            <h3 className="text-2xl font-semibold mb-3">AI Analysis</h3>
            <p className="text-gray-400">
              Detects errors and explains incidents with intelligent reasoning.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <Database className="text-green-500 mb-4" size={40} />
            <h3 className="text-2xl font-semibold mb-3">RAG Knowledge</h3>
            <p className="text-gray-400">
              Searches troubleshooting documentation to provide relevant fixes.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <Cpu className="text-purple-500 mb-4" size={40} />
            <h3 className="text-2xl font-semibold mb-3">Modern AI Stack</h3>
            <p className="text-gray-400">
              Built using React, FastAPI, Hugging Face, LangGraph, and ChromaDB.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}