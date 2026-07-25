import { FileText, MessageSquare } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function HistoryCard({ item }) {
  const navigate = useNavigate();

  const badgeColor = {
    Critical: "bg-red-600/20 text-red-400",
    High: "bg-red-500/20 text-red-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    Low: "bg-green-500/20 text-green-400",
    Unknown: "bg-slate-700 text-slate-300",
  };

  const handleContinueChat = () => {
    // Open exact previous chat session

    navigate(`/chatbot/${item.id}`);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-blue-600 p-4">
            <FileText />
          </div>

          <div>
            <h2 className="text-xl font-semibold">{item.title}</h2>

            <p className="mt-2 max-w-2xl text-slate-400">
              {item.summary || "No summary available."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  badgeColor[item.severity] || badgeColor.Unknown
                }`}
              >
                {item.severity || "Unknown"}
              </span>

              <span className="text-cyan-400">{item.confidence}%</span>

              <span className="text-slate-500">
                {new Date(item.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Continue Chat Only */}

        <div>
          <button
            onClick={handleContinueChat}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700 transition"
          >
            <MessageSquare size={18} />
            Continue Chat
          </button>
        </div>
      </div>
    </div>
  );
}
