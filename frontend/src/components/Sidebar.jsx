import {
  LayoutDashboard,
  Bot,
  History,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";


export default function Sidebar() { 

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
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const { logout } = useAuth();

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}

      <div className="border-b border-slate-800 p-5">

        <div className="flex items-center gap-4">

          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/30">

            <ShieldCheck size={30} />

          </div>

          <div>

            <h1 className="text-xl font-bold text-white">
              DevOps AI
            </h1>

            <p className="text-sm text-slate-400">
              Incident Assistant
            </p>

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

                <span className="font-medium">
                  {menu.title}
                </span>
              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* AI Status */}

      <div className="mx-5 mb-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="flex items-center gap-3">

          <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>

          <span className="text-sm text-green-400">
            AI Engine Online
          </span>

        </div>

        <div className="mt-4 text-sm text-slate-400">

          Provider

          <div className="mt-1 font-semibold text-white">
            Hugging Face
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
  );
}