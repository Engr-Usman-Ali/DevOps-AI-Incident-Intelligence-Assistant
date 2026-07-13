import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import SuggestedQuestions from "../components/chat/SuggestedQuestions";

export default function Chatbot() {
  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <ChatHeader />

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto">

          <div className="mx-auto max-w-5xl p-8">

            <SuggestedQuestions />

            <ChatWindow />

          </div>

        </div>

        {/* Fixed Bottom Input */}
        <ChatInput />

      </div>

    </div>
  );
}