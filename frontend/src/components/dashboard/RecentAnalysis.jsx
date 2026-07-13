import { Eye } from "lucide-react";

const logs = [
  {
    name: "kubernetes.log",
    severity: "High",
    confidence: "96%",
    time: "5 min ago",
  },
  {
    name: "docker.log",
    severity: "Medium",
    confidence: "91%",
    time: "20 min ago",
  },
  {
    name: "linux.log",
    severity: "Low",
    confidence: "88%",
    time: "1 hour ago",
  },
];

export default function RecentAnalysis() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold">

          Recent Analysis

        </h2>

      </div>

      <div className="space-y-4">

        {logs.map((log, index) => (

          <div
            key={index}
            className="rounded-2xl bg-slate-800 p-5 hover:bg-slate-700 transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-semibold">

                  {log.name}

                </h3>

                <p className="text-slate-400 mt-2">

                  {log.time}

                </p>

              </div>

              <div className="flex items-center gap-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm
                  ${
                    log.severity === "High"
                      ? "bg-red-500/20 text-red-400"
                      : log.severity === "Medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {log.severity}
                </span>

                <span className="text-cyan-400">

                  {log.confidence}

                </span>

                <button className="rounded-xl bg-blue-600 p-2 hover:bg-blue-700">

                  <Eye size={18} />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}