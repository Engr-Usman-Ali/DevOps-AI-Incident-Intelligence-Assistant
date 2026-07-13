import {
  FileText,
  Eye,
  MessageSquare,
} from "lucide-react";

export default function HistoryCard({ item }) {

  const badgeColor = {
    High: "bg-red-500/20 text-red-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    Low: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500 transition">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-start gap-4">

          <div className="rounded-2xl bg-blue-600 p-4">

            <FileText />

          </div>

          <div>

            <h2 className="text-xl font-semibold">
              {item.file}
            </h2>

            <p className="mt-2 text-slate-400">
              {item.rootCause}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">

              <span
                className={`rounded-full px-3 py-1 text-sm ${badgeColor[item.severity]}`}
              >
                {item.severity}
              </span>

              <span className="text-cyan-400">
                Confidence: {item.confidence}
              </span>

              <span className="text-slate-500">
                {item.date}
              </span>

            </div>

          </div>

        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 hover:bg-slate-800">

            <Eye size={18} />

            View Report

          </button>

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700">

            <MessageSquare size={18} />

            Continue Chat

          </button>

        </div>

      </div>

    </div>
  );
}