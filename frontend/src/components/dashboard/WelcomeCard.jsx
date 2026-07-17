import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function WelcomeCard() {
  const { user, loading } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 p-10">

      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative z-10">

        <div className="flex items-center gap-2 text-cyan-100">

          <Sparkles size={18} />

          AI Powered Assistant

        </div>

        <h1 className="mt-6 text-5xl font-bold">

          {loading
            ? "Loading..."
            : `Welcome Back, ${user?.full_name || "User"} 👋`}

        </h1>

        <p className="mt-5 max-w-2xl text-blue-100 text-lg">

          Monitor previous AI analyses, track incidents,
          and continue troubleshooting with the AI Assistant.

        </p>

        <div className="mt-4 text-blue-100">

          {!loading && user && (
            <>
              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Member Since:</strong>{" "}
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </>
          )}

        </div>

        <div className="mt-8 flex gap-4">

          <Link
            to="/chatbot"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-105"
          >
            Open AI Assistant

            <ArrowRight size={18} />

          </Link>

          <Link
            to="/history"
            className="rounded-xl border border-white/40 px-6 py-3 transition hover:bg-white/10"
          >
            View History
          </Link>

        </div>

      </div>

    </div>
  );
}