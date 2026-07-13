import { useRef, useState } from "react";
import {
  Paperclip,
  SendHorizontal,
  X,
  FileText,
} from "lucide-react";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef();

  const handleFile = (e) => {
    const selected = e.target.files[0];

    if (selected) {
      setFile(selected);
    }
  };

  const removeFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sendMessage = () => {
    if (!message.trim() && !file) return;

    console.log({
      message,
      file,
    });

    // TODO:
    // Send to FastAPI Backend

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
            >
              <X size={16} />
            </button>

          </div>

        )}

        <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2">
          {/* Upload */}

          <button
            onClick={() => fileInputRef.current.click()}
            className="rounded-lg p-2 hover:bg-slate-800 transition"
          >

            <Paperclip size={18} />

          </button>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".log,.txt,.json"
            onChange={handleFile}
          />

          {/* Textarea */}

          <textarea
            rows={1}
            value={message}
            placeholder="Ask AI about your logs..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {

                e.preventDefault();

                sendMessage();

              }

            }}
            className="max-h-40 flex-1 resize-none bg-transparent outline-none placeholder:text-slate-500"
          />

          {/* Send */}

          <button
            onClick={sendMessage}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-2.5 transition hover:scale-105"
          >

            <SendHorizontal size={18} />

          </button>

        </div>

        <p className="mt-3 text-center text-xs text-slate-500">
          Upload a log file or ask a follow-up question. Press Enter to send, Shift + Enter for a new line.
        </p>

      </div>

    </div>
  );
}