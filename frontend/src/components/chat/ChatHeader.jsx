import { Plus } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-xl">

      <div className="flex items-center justify-between px-8 py-4">

        <div>

          <h1 className="text-3xl font-bold">

            AI Assistant

          </h1>

          <p className="text-slate-400">

            Analyze logs and ask follow-up questions.

          </p>

        </div>

        <button className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700">
          
          <Plus size={18} />

          <span>New Chat</span>

        </button>


      </div>

    </header>
  );
}