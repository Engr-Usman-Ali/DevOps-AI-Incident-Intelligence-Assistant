import ChatMessage from "./ChatMessage";
import useChat from "../../hooks/useChat";

export default function ChatWindow() {

  const { messages, loading } = useChat();

  if (messages.length === 0) {

    return (

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">

        <h2 className="text-2xl font-bold">
          👋 Welcome
        </h2>

        <p className="mt-4 text-slate-400">
          Upload a log file or ask any DevOps question.
        </p>

      </div>

    );

  }

  return (

    <div className="space-y-6">

      {messages.map((message, index) => (

        <ChatMessage
          key={index}
          message={message}
        />

      ))}

      {loading && (

        <ChatMessage
          message={{
            role: "assistant",
            content: "Thinking..."
          }}
        />

      )}

    </div>

  );

}