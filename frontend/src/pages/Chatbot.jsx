import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import useChat from "../hooks/useChat";

export default function Chatbot() {
  const {
    messages,
    clearChat,
    loadConversation,
  } = useChat();

  const { sessionId } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sessionId) {
      loadConversation(Number(sessionId));
    }
  }, [sessionId]);

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <Sidebar
        mobile
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Main */}
      <main className="flex flex-1 flex-col lg:ml-72 min-w-0">
        <ChatHeader
          onMenu={() => setSidebarOpen(true)}
          onNewChat={clearChat}
        />

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-5xl p-4 sm:p-6 lg:p-8">
            <ChatWindow messages={messages} />
          </div>
        </div>

        <ChatInput />
      </main>
    </div>
  );
}