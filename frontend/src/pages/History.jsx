import Sidebar from "../components/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import HistoryFilter from "../components/history/HistoryFilter";
import HistoryCard from "../components/history/HistoryCard";

const history = [
  {
    id: 1,
    file: "kubernetes.log",
    severity: "High",
    confidence: "96%",
    rootCause: "CrashLoopBackOff due to memory limit.",
    date: "2 hours ago",
  },
  {
    id: 2,
    file: "docker.log",
    severity: "Medium",
    confidence: "91%",
    rootCause: "Container restarted unexpectedly.",
    date: "Yesterday",
  },
  {
    id: 3,
    file: "linux.log",
    severity: "Low",
    confidence: "88%",
    rootCause: "SSH authentication warning.",
    date: "3 days ago",
  },
];

export default function History() {
  return (
    <div className="flex h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <TopBar />

        <div className="flex-1 overflow-y-auto p-8">

          <div className="mx-auto max-w-6xl">

            <h1 className="text-4xl font-bold">
              Analysis History
            </h1>

            <p className="mt-2 text-slate-400">
              View previous AI log analyses and continue conversations.
            </p>

            <HistoryFilter />

            <div className="mt-8 space-y-6">

              {history.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                />
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}