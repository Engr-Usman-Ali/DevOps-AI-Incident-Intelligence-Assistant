import {
  Bot,
  User,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center">
          <Bot size={20} />
        </div>
      )}

      <div
        className={`max-w-3xl rounded-3xl p-6 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-slate-900 border border-slate-800"
        }`}
      >
        {message.text && (
          <p className="leading-7">{message.text}</p>
        )}

        {message.analysis && (
          <div className="space-y-6">

            {/* Severity */}

            <div className="flex justify-between items-center">

              <h2 className="text-xl font-bold">
                Incident Analysis
              </h2>

              <span className="rounded-full bg-red-500/20 px-4 py-1 text-red-400">
                {message.analysis.severity}
              </span>

            </div>

            {/* Confidence */}

            <div>

              <div className="flex justify-between mb-2">

                <span>Confidence</span>

                <span>{message.analysis.confidence}</span>

              </div>

              <div className="h-2 rounded-full bg-slate-700">

                <div
                  style={{ width: message.analysis.confidence }}
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-cyan-400"
                />

              </div>

            </div>

            {/* Root Cause */}

            <div className="rounded-2xl bg-slate-800 p-5">

              <div className="flex items-center gap-2 mb-3">

                <AlertTriangle className="text-red-400" />

                <h3 className="font-semibold">
                  Root Cause
                </h3>

              </div>

              <p>{message.analysis.rootCause}</p>

            </div>

            {/* Suggested Fixes */}

            <div className="rounded-2xl bg-slate-800 p-5">

              <h3 className="mb-4 font-semibold">
                Suggested Fixes
              </h3>

              <div className="space-y-3">

                {message.analysis.fixes.map((fix, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <CheckCircle2 className="text-green-400 mt-1" />

                    <span>{fix}</span>

                  </div>
                ))}

              </div>

            </div>

            {/* Prevention */}

            <div className="rounded-2xl bg-slate-800 p-5">

              <h3 className="mb-4 font-semibold">
                Prevention
              </h3>

              <div className="space-y-3">

                {message.analysis.prevention.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <ShieldCheck className="text-cyan-400 mt-1" />

                    <span>{item}</span>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}
      </div>

      {isUser && (
        <div className="h-11 w-11 rounded-full bg-slate-700 flex items-center justify-center">
          <User size={20} />
        </div>
      )}
    </div>
  );
}