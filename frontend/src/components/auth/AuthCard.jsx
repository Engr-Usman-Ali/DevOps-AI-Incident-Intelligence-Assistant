import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Loader2 } from "lucide-react";
import { signup } from "../../services/authService";
import toast from "react-hot-toast";

export default function AuthCard({ mode }) {
  const isSignIn = mode === "signin";

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignIn) {
      if (
        formData.full_name.trim() === "" ||
        formData.email.trim() === "" ||
        formData.password.trim() === ""
      ) {
        toast.error("Please fill all fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        setLoading(true);

        await signup({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
        });

        toast.success("Account created successfully!");

        navigate("/signin");
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("Server not responding");
        }
      } finally {
        setLoading(false);
      }

      return;
    }

    toast("Login API will be connected next.");
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

      <div className="flex flex-col items-center">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500">
          <ShieldCheck size={32} className="text-white" />
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

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">

        {!isSignIn && (
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        {!isSignIn && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={20} />
              Creating...
            </>
          ) : (
            <>
              {isSignIn ? "Sign In" : "Create Account"}
            </>
          )}
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