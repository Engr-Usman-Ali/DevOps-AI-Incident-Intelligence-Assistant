import {
  createContext,
  useEffect,
  useState,
} from "react";

import { sendMessage } from "../services/chatService";
import {
  getSessions,
  getMessages,
} from "../services/memoryService";

export const ChatContext = createContext();

export default function ChatProvider({ children }) {
  // -----------------------------
  // Chat State
  // -----------------------------

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Current active chat session
  const [sessionId, setSessionId] = useState(null);

  // User history
  const [sessions, setSessions] = useState([]);

  // -----------------------------
  // Load history when token exists
  // -----------------------------

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      loadSessions();
    }
  }, []);

  // -----------------------------
  // Send Message
  // -----------------------------

  const send = async (text, file = null) => {
    if (!text.trim() && !file) return;

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

    const loadingMessage = {
      id: Date.now() + 1,
      role: "assistant",
      loading: true,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      loadingMessage,
    ]);

    setLoading(true);

    try {
      const response = await sendMessage(
        text,
        file,
        sessionId,
      );

      // Save newly created session
      if (
        !sessionId &&
        response.session_id
      ) {
        setSessionId(response.session_id);
      }

      // Refresh dashboard/history
      await loadSessions();

      // Replace loading bubble
      setMessages((prev) =>
        prev.map((msg) => {
          if (!msg.loading) return msg;

          return {
            id: msg.id,
            role: "assistant",
            analysis: response.reply,
            parsedLog: response.parsed_log,
            loading: false,
          };
        }),
      );
    } catch (error) {
      console.error(error);

      setMessages((prev) =>
        prev.map((msg) => {
          if (!msg.loading) return msg;

          return {
            id: msg.id,
            role: "assistant",
            content:
              "❌ Something went wrong.",
            loading: false,
          };
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Load User Sessions
  // -----------------------------

  const loadSessions = async () => {
    const token =
      localStorage.getItem("access_token");

    if (!token) {
      setSessions([]);
      return;
    }

    try {
      const data = await getSessions();

      if (Array.isArray(data)) {
        setSessions(data);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error(
        "Failed to load sessions:",
        error,
      );

      setSessions([]);
    }
  };

  // -----------------------------
  // Load Previous Conversation
  // -----------------------------

  const loadConversation = async (
    id,
  ) => {
    const token =
      localStorage.getItem("access_token");

    if (!token) return;

    try {
      const data = await getMessages(id);

      const formatted = [];

      (data || []).forEach((msg) => {
        if (msg.role === "user") {
          formatted.push({
            id: msg.id,
            role: "user",
            content: msg.message,
          });
        } else {
          formatted.push({
            id: msg.id,
            role: "assistant",
            analysis:
              msg.analysis_json || null,
          });
        }
      });

      setMessages(formatted);
      setSessionId(id);
    } catch (error) {
      console.error(
        "Failed to load conversation:",
        error,
      );
    }
  };

  // -----------------------------
  // Start New Chat
  // -----------------------------

  const clearChat = () => {
    setMessages([]);
    setSessionId(null);
  };

  // -----------------------------
  // Provider
  // -----------------------------

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,

        sessionId,
        sessions,

        send,
        clearChat,

        loadSessions,
        loadConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}