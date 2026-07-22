import { useRef, useState } from "react";
import {
  Paperclip,
  SendHorizontal,
  X,
  FileText,
} from "lucide-react";

import useChat from "../../hooks/useChat";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const { send, loading } = useChat();

  const fileInputRef = useRef(null);

  // ----------------------------
  // Select File
  // ----------------------------

  const handleFile = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);
  };

  // ----------------------------
  // Remove File
  // ----------------------------

  const removeFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ----------------------------
  // Send Message
  // ----------------------------

  const handleSend = async () => {
    if (loading) return;

    if (!message.trim() && !file) return;

    await send(message, file);

    setMessage("");
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl p-2">

        {/* File Preview */}

        {file && (
          <div className="mb-4 inline-flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-3">

            <FileText
              size={18}
              className="text-cyan-400"
            />

            <span className="text-sm">
              {file.name}
            </span>

            <button
              onClick={removeFile}
              disabled={loading}
              className="transition hover:text-red-400 disabled:opacity-50"
            >
              <X size={16} />
            </button>

          </div>
        )}

        {/* Input */}

        <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2">

          {/* Upload */}

          <button
            onClick={() => fileInputRef.current.click()}
            disabled={loading}
            className="rounded-lg p-2 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Paperclip size={18} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            disabled={loading}
            accept=".log,.txt,.json"
            onChange={handleFile}
          />

          {/* Textarea */}

          <textarea
            rows={1}
            value={message}
            disabled={loading}
            placeholder="Ask AI about your logs..."
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();

                handleSend();
              }
            }}
            className="max-h-40 flex-1 resize-none bg-transparent outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {/* Send */}

          <button
            onClick={handleSend}
            disabled={
              loading ||
              (!message.trim() && !file)
            }
            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-2.5 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizontal size={18} />
          </button>

        </div>

        <p className="mt-3 text-center text-xs text-slate-500">
          Upload a Linux, Kubernetes, or JSON log file.
          Press <strong>Enter</strong> to send and{" "}
          <strong>Shift + Enter</strong> for a new line.
        </p>

      </div>
    </div>
  );
}