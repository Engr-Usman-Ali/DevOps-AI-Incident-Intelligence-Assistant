import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="bg-blue-600 p-2 rounded-xl">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h2 className="font-bold text-xl">
              DevOps AI
            </h2>

            <p className="text-xs text-gray-400">
              Incident Intelligence
            </p>
          </div>

        </div>

        <nav className="hidden md:flex gap-8 text-gray-300">

          <a href="#home" className="hover:text-blue-400">
            Home
          </a>

          <a href="#features" className="hover:text-blue-400">
            Features
          </a>

          <a href="#about" className="hover:text-blue-400">
            About
          </a>

        </nav>

        <button className="bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-700 transition">
          Launch App
        </button>

      </div>
    </header>
  );
}