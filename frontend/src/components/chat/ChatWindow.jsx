import ChatMessage from "./ChatMessage";

const messages = [
  {
    id: 1,
    role: "assistant",
    text: "👋 Welcome! I'm your AI DevOps Incident Assistant. Upload a log file using the 📎 button or ask me a DevOps question.",
  },
  {
    id: 2,
    role: "user",
    text: "Analyze my Kubernetes log.",
  },
  {
    id: 3,
    role: "assistant",
    analysis: {
      severity: "High",
      confidence: "96%",
      rootCause:
        "CrashLoopBackOff detected because the container exceeded its memory limit.",
      fixes: [
        "Increase container memory limit.",
        "Review application memory usage.",
        "Restart deployment after updating resources.",
      ],
      prevention: [
        "Enable Horizontal Pod Autoscaler.",
        "Monitor memory usage with Prometheus.",
      ],
    },
  },
];

export default function ChatWindow() {
  return (
    <div className="space-y-6">

      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
        />
      ))}

    </div>
  );
}