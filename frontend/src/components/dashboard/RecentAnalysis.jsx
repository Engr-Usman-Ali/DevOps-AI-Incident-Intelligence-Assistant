import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useChat from "../../hooks/useChat";

export default function RecentAnalysis() {
  const navigate = useNavigate();

  const { sessions, loadConversation } = useChat();

  const recentSessions = (sessions || []).slice(0, 3);

  const openChat = async (sessionId) => {
    await loadConversation(sessionId);

    navigate("/chatbot");
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Recent Analysis
        </h2>

        <span className="text-sm text-slate-400">
          Last 3 Sessions
        </span>
      </div>

      {recentSessions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 py-12 text-center">
          <p className="text-slate-400">
            No incident analysis available.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentSessions.map((session) => (
            <div
              key={session.id}
              className="rounded-2xl bg-slate-800 p-5 transition hover:bg-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {session.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {new Date(session.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400">
                    Session #{session.id}
                  </span>

                  <button
                    onClick={() => openChat(session.id)}
                    className="rounded-xl bg-blue-600 p-2 transition hover:bg-blue-700"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}