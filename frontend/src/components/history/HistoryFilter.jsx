import { Search } from "lucide-react";

export default function HistoryFilter() {
  return (
    <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div className="flex flex-wrap gap-3">

        {["All", "High", "Medium", "Low"].map((item) => (
          <button
            key={item}
            className="rounded-full border border-slate-700 px-5 py-2 hover:bg-blue-600 transition"
          >
            {item}
          </button>
        ))}

      </div>

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-3 text-slate-400"
        />

        <input
          placeholder="Search log..."
          className="rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
        />

      </div>

    </div>
  );
}