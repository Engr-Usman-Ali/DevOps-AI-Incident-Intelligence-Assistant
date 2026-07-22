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

  const formatFileSize = (bytes) => {
    if (!bytes) return "";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ===============================
  // Loading Bubble
  // ===============================

  if (message.loading) {
    return (
      <div className="flex gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600">
          <Bot size={20} />
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>

            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]"></span>

            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]"></span>

            <span className="ml-2 text-slate-400">
              AI is analyzing ...
            </span>
          </div>
        </div>
      </div>
    );
  }

  const analysis = message.analysis;

  const confidence = analysis?.confidence ?? 0;

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}

      {!isUser && (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600">
          <Bot size={20} />
        </div>
      )}

      {/* Bubble */}

      <div
        className={`max-w-3xl rounded-3xl p-6 ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-800 bg-slate-900"
        }`}
      >
        {/* Uploaded File */}

        {message.file && (
          <div className="mb-4 flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-4">
            <div className="rounded-xl bg-cyan-500/20 p-3">
              <Paperclip
                size={20}
                className="text-cyan-400"
              />
            </div>

            <div className="flex-1">
              <div className="font-medium">
                {message.file.name}
              </div>

              <div className="text-sm text-slate-400">
                {formatFileSize(message.file.size)}
              </div>
            </div>

            <FileText
              size={20}
              className="text-cyan-400"
            />
          </div>
        )}

        {/* User Message */}

        {message.content && (
          <p className="whitespace-pre-wrap leading-7">
            {message.content}
          </p>
        )}

        {/* AI Analysis */}

        {analysis && (
          <div className="space-y-6">
            {/* Header */}

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Incident Analysis
              </h2>

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
                <h3 className="mb-3 font-semibold">
                  Summary
                </h3>

                <p>{analysis.summary}</p>
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
                  style={{
                    width: `${confidence}%`,
                  }}
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-cyan-400"
                />
              </div>
            </div>

            {/* Root Cause */}

            {analysis.root_cause && (
              <div className="rounded-2xl bg-slate-800 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle className="text-red-400" />

                  <h3 className="font-semibold">
                    Root Cause
                  </h3>
                </div>

                <p>{analysis.root_cause}</p>
              </div>
            )}

            {/* Fixes */}

            {analysis.fixes?.length > 0 && (
              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="mb-4 font-semibold">
                  Suggested Fixes
                </h3>

                <div className="space-y-3">
                  {analysis.fixes.map(
                    (fix, index) => (
                      <div
                        key={index}
                        className="flex gap-3"
                      >
                        <CheckCircle2 className="mt-1 text-green-400" />

                        <span>{fix}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Prevention */}

            {analysis.prevention?.length > 0 && (
              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="mb-4 font-semibold">
                  Prevention
                </h3>

                <div className="space-y-3">
                  {analysis.prevention.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex gap-3"
                      >
                        <ShieldCheck className="mt-1 text-cyan-400" />

                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Web Search */}

            {analysis.used_web_search && (
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-sm text-cyan-300">
                🌐 Additional information was retrieved from web search.
              </div>
            )}

            {/* Sources */}

            {analysis.sources?.length > 0 && (
              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="mb-3 font-semibold">
                  Sources
                </h3>

                <ul className="space-y-2">
                  {analysis.sources.map(
                    (source, index) => (
                      <li
                        key={index}
                        className="text-cyan-400"
                      >
                        • {source}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* User Avatar */}

      {isUser && (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-700">
          <User size={20} />
        </div>
      )}
    </div>
  );
}