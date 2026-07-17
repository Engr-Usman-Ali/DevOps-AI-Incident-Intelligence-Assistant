import { createContext, useState } from "react";
import { sendMessage } from "../services/chatService";

export const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async (text, file = null) => {
    if (!text.trim() && !file) return;

    // User message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
      file: file
        ? {
            name: file.name,
            size: file.size,
            type: file.type,
          }
        : null,
    };

    // Temporary AI loading message
    const thinkingMessage = {
      id: Date.now() + 1,
      role: "assistant",
      loading: true,
    };

    // Show user message + loading bubble immediately
    setMessages((prev) => [
      ...prev,
      userMessage,
      thinkingMessage,
    ]);

    setLoading(true);

    try {
      const response = await sendMessage(text, file);

      // Replace loading bubble with AI response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? {
                id: msg.id,
                role: "assistant",
                content: response.reply,
                analysis: response.analysis || null,
              }
            : msg
        )
      );
    } catch (error) {
      // Replace loading bubble with error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? {
                id: msg.id,
                role: "assistant",
                content: "❌ Something went wrong.",
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        send,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}