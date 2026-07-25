import { ShieldCheck, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-600 p-2">
                <ShieldCheck size={26} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">DevOps AI</h2>

                <p className="text-sm text-slate-400">
                  Incident Intelligence Assistant
                </p>
              </div>
            </div>

            <p className="mt-6 leading-7 text-slate-400">
              An AI-powered DevOps incident analysis platform that understands
              infrastructure logs, identifies root causes, recommends fixes,
              retrieves similar incidents using RAG, searches live
              documentation, and automates incident reporting through
              intelligent workflows.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Navigation
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-slate-400 transition hover:text-blue-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="text-slate-400 transition hover:text-blue-400"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="text-slate-400 transition hover:text-blue-400"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              AI & Technology
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li>⚛ React.js</li>
              <li>⚡ FastAPI</li>
              <li>🧠 LangGraph</li>
              <li>🤖 Groq LLM</li>
              <li>✨ Gemini Embeddings</li>
              <li>🗄 ChromaDB (RAG)</li>
              <li>🌐 DuckDuckGo Search</li>
              <li>🔄 n8n Automation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Connect</h3>

            <p className="mb-5 text-sm leading-6 text-slate-400">
              Interested in AI, DevOps, RAG systems, or automation? Let's
              connect and collaborate.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/Engr-Usman-Ali"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-blue-600"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://linkedin.com/in/engr-usman--ali/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-blue-600"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="mailto:usmanali08675@gmail.com"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-blue-600"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-10 border-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} DevOps AI Incident Intelligence
            Assistant. All Rights Reserved.
          </p>

          <p className="text-center text-sm text-slate-400">
            Built with <span className="text-red-500">❤️</span> using React,
            FastAPI, LangGraph, Groq, Gemini Embeddings, ChromaDB, DuckDuckGo
            Search & n8n by{" "}
            <span className="font-semibold text-blue-500">Usman Ali</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
