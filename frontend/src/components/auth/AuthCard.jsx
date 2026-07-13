import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function AuthCard({ mode }) {
  const isSignIn = mode === "signin";

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

      <div className="flex flex-col items-center">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500">
          <ShieldCheck size={32} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h1>

        <p className="mt-2 text-center text-slate-400">
          {isSignIn
            ? "Sign in to access your private AI conversations."
            : "Create your account to securely store AI analyses and chat history."}
        </p>

      </div>

      <form className="mt-8 space-y-5">

        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        {!isSignIn && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.02]"
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </button>

      </form>

      <div className="mt-6 text-center text-slate-400">

        {isSignIn ? (
          <>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-cyan-400 hover:underline"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-cyan-400 hover:underline"
            >
              Sign In
            </Link>
          </>
        )}

      </div>

    </div>
  );
}