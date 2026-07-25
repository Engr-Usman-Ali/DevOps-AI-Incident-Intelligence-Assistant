import { Bell, Menu } from "lucide-react";

export default function TopBar({ onMenu }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">

      <div className="px-4 sm:px-8 py-4 flex justify-between items-center">

        {/* Left Side */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu Button */}
          <button
            onClick={onMenu}
            className="lg:hidden bg-slate-900 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <Menu size={22} />
          </button>


          <div>
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

            <p className="text-slate-400">
              DevOps AI Incident Intelligence
            </p>
          </div>

        </div>


        {/* Right Side */}
        <div className="flex items-center gap-6">

          <button className="relative bg-slate-900 p-3 rounded-xl hover:bg-slate-800 transition">

            <Bell size={20} />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button>


          <div className="hidden sm:flex items-center gap-3">

            <img
              src="https://i.pravatar.cc/100"
              alt="avatar"
              className="h-11 w-11 rounded-full"
            />

            <div>

              <h3 className="font-semibold">
                Usman Ali
              </h3>

              <p className="text-xs text-slate-400">
                AI Engineer
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}