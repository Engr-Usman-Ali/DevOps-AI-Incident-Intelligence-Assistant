import {
  LayoutDashboard,
  Bot,
  History,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

export default function Sidebar({ mobile = false, open = false, setOpen }) {
  const { logout } = useAuth();

  const menus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "AI Assistant",
      icon: Bot,
      path: "/chatbot",
    },
    {
      title: "History",
      icon: History,
      path: "/history",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {mobile && open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
    z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300

    ${
      mobile
        ? `
          fixed left-0 top-0
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:hidden
        `
        : `
          hidden
          lg:flex
          lg:fixed
          lg:left-0
          lg:top-0
        `
    }
  `}
      >
        {/* Mobile Close */}

        {mobile && (
          <div className="absolute right-4 top-4 lg:hidden">
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl bg-slate-800 p-2 text-slate-300 hover:bg-slate-700"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Logo */}

        <div className="border-b border-slate-800 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/30">
              <ShieldCheck size={30} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">DevOps AI</h1>

              <p className="text-sm text-slate-400">Incident Assistant</p>
            </div>
          </div>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-5 py-8">
          <div className="space-y-3">
            {menus.map((menu) => {
              const Icon = menu.icon;

              return (
                <NavLink
                  key={menu.title}
                  to={menu.path}
                  onClick={() => mobile && setOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <motion.div whileHover={{ rotate: 8 }}>
                    <Icon size={22} />
                  </motion.div>

                  <span className="font-medium">{menu.title}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* AI Status */}

        <div className="mx-5 mb-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

            <span className="text-sm font-medium text-green-400">
              AI Monitoring Active
            </span>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">LLM</span>

              <span className="font-semibold text-white">Groq</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Embeddings</span>

              <span className="font-semibold text-cyan-400">Gemini</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Search</span>

              <span className="font-semibold text-blue-400">DuckDuckGo</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Automation</span>

              <span className="font-semibold text-yellow-400">Gmail + n8n</span>
            </div>
          </div>
        </div>

        {/* Logout */}

        <div className="border-t border-slate-800 p-5">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
