import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function WelcomeCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 p-10">

      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative z-10">

        <div className="flex items-center gap-2 text-cyan-100">

          <Sparkles size={18} />

          AI Powered Assistant

        </div>

        <h1 className="mt-6 text-5xl font-bold">

          Welcome Back 👋

        </h1>

        <p className="mt-5 max-w-2xl text-blue-100 text-lg">

          Monitor previous AI analyses, track incidents,
          and continue troubleshooting with the AI Assistant.

        </p>

        <div className="flex gap-4 mt-8">

          <Link
            to="/chatbot"
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition"
          >
            Open AI Assistant

            <ArrowRight size={18} />

          </Link>

          <Link
            to="/history"
            className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition"
          >
            View History
          </Link>

        </div>

      </div>

    </div>
  );
}