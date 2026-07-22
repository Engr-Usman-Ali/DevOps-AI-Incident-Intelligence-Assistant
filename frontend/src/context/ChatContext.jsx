import { createContext, useState } from "react";
import { sendMessage } from "../services/chatService";

export const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async (text, file = null) => {
    if (!text.trim() && !file) return;

    // ----------------------------
    // User Message
    // ----------------------------

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

    // ----------------------------
    // AI Loading Message
    // ----------------------------

    const thinkingMessage = {
      id: Date.now() + 1,
      role: "assistant",
      loading: true,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      thinkingMessage,
    ]);

    setLoading(true);

    try {
      const response = await sendMessage(
        text,
        file
      );

      console.log(response);

      // ----------------------------
      // Replace Loading Bubble
      // ----------------------------

      setMessages((prev) =>
        prev.map((msg) => {
          if (!msg.loading) return msg;

          return {
            id: msg.id,
            role: "assistant",

            // Complete AI JSON
            analysis: response.reply,

            // Parsed Log
            parsedLog: response.parsed_log,

            loading: false,
          };
        })
      );
    } catch (error) {
      console.error(error);

      setMessages((prev) =>
        prev.map((msg) => {
          if (!msg.loading) return msg;

          return {
            id: msg.id,
            role: "assistant",
            content: "❌ Something went wrong.",
            loading: false,
          };
        })
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