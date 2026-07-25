import { Plus, Menu } from "lucide-react";

export default function ChatHeader({ onMenu, onNewChat }) {

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/70 backdrop-blur-xl">

      <div className="flex items-center justify-between px-4 sm:px-8 py-4">


        <div className="flex items-center gap-4">

          <button
            onClick={onMenu}
            className="lg:hidden rounded-xl bg-slate-800 p-3 hover:bg-slate-700"
          >
            <Menu size={22}/>
          </button>


          <div>
            <h1 className="text-3xl font-bold">
              AI Assistant
            </h1>

            <p className="text-slate-400">
              Analyze logs and ask follow-up questions.
            </p>
          </div>

        </div>



        <button
          onClick={onNewChat}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700"
        >

          <Plus size={18}/>

          <span className="hidden sm:block">
            New Chat
          </span>

        </button>


      </div>

    </header>
  );
}