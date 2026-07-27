import {
  Bot,
  User,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Paperclip,
} from "lucide-react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  const analysis = message.analysis;
  const confidence = analysis?.confidence ?? 0;

  const formatFileSize = (bytes) => {
    if (!bytes) return "";

    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ============================
  // Loading
  // ============================

  if (message.loading) {
    return (
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600">
          <Bot size={20} />
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]" />

            <span className="ml-2 text-slate-400">AI is analyzing...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}

      {!isUser && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600">
          <Bot size={20} />
        </div>
      )}

      {/* Bubble */}

      <div
        className={`w-fit max-w-[85%] rounded-3xl p-6 break-words overflow-hidden ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-800 bg-slate-900"
        }`}
      >
        {/* Uploaded File */}

        {message.file && (
          <div className="mb-4 flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-4">
            <div className="rounded-xl bg-cyan-500/20 p-3">
              <Paperclip className="text-cyan-400" size={20} />
            </div>

            <div className="flex-1">
              <div className="font-medium">{message.file.name}</div>

              {message.file.size && (
                <div className="text-sm text-slate-400">
                  {formatFileSize(message.file.size)}
                </div>
              )}
            </div>

            <FileText className="text-cyan-400" size={20} />
          </div>
        )}

        {/* User Text */}

        {message.content && (
          <p className="whitespace-pre-wrap break-words leading-7">
            {message.content}
          </p>
        )}

        {/* AI Analysis */}

        {analysis && (
          <div className="space-y-6">
            {/* Header */}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Incident Analysis</h2>

              <span
                className={`rounded-full px-4 py-1 text-sm font-medium ${
                  analysis.severity === "Critical"
                    ? "bg-red-500/20 text-red-400"
                    : analysis.severity === "High"
                      ? "bg-orange-500/20 text-orange-400"
                      : analysis.severity === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                }`}
              >
                {analysis.severity}
              </span>
            </div>

            {/* Summary */}

            {analysis.summary && (
              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="mb-3 font-semibold">Summary</h3>

                <p className="whitespace-pre-wrap break-words">
                  {analysis.summary}
                </p>
              </div>
            )}

            {/* Confidence */}

            <div>
              <div className="mb-2 flex justify-between">
                <span>Confidence</span>

                <span>{confidence}%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-cyan-400"
                  style={{
                    width: `${confidence}%`,
                  }}
                />
              </div>
            </div>

            {/* Root Cause */}

            {analysis.root_cause && (
              <div className="rounded-2xl bg-slate-800 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle className="text-red-400" />

                  <h3 className="font-semibold">Root Cause</h3>
                </div>

                <p className="whitespace-pre-wrap break-words">
                  {analysis.root_cause}
                </p>
              </div>
            )}

            {/* Fixes */}

            {analysis.fixes?.length > 0 && (
              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="mb-4 font-semibold">Suggested Fixes</h3>

                <div className="space-y-3">
                  {analysis.fixes.map((fix, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 shrink-0 text-green-400" />

                      <span className="break-words">{fix}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prevention */}

            {analysis.prevention?.length > 0 && (
              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="mb-4 font-semibold">Prevention</h3>

                <div className="space-y-3">
                  {analysis.prevention.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 shrink-0 text-cyan-400" />

                      <span className="break-words">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Web Search */}

            {analysis.used_web_search && (
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-sm text-cyan-300">
                🌐 Additional information was retrieved using web search.
              </div>
            )}

            {/* Sources */}

            {analysis.sources?.length > 0 && (
              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="mb-3 font-semibold">Sources</h3>

                <ul className="space-y-2">
                  {analysis.sources.map((source, index) => (
                    <li key={index} className="break-all text-cyan-400">
                      • {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* User Avatar */}

      {isUser && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-700">
          <User size={20} />
        </div>
      )}
    </div>
  );
}
