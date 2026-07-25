import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import useChat from "../hooks/useChat";
import { getMessages } from "../services/memoryService";


export default function Chatbot() {


  const [sidebarOpen, setSidebarOpen] = useState(false);


  const { sessionId } = useParams();

  const navigate = useNavigate();



  const {
    messages,
    clearChat,
    loadConversation,
  } = useChat();







  // Load old conversation

  useEffect(() => {


    if (sessionId) {


      loadConversation(sessionId);


    } 
    else {


      clearChat();


    }


  }, [sessionId]);









  // New Chat

  const handleNewChat = () => {


    clearChat();


    navigate("/chatbot");


  };









  return (

    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">





      {/* Desktop Sidebar */}

      <div className="hidden lg:block">

        <Sidebar />

      </div>








      {/* Mobile Sidebar */}

      <Sidebar

        mobile

        open={sidebarOpen}

        setOpen={setSidebarOpen}

      />









      {/* Main */}

      <main className="lg:ml-72 flex h-screen flex-col">






        <ChatHeader

          onMenu={() => setSidebarOpen(true)}

          onNewChat={handleNewChat}

        />









        {/* Messages */}

        <div className="flex-1 overflow-y-auto">



          <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">



            <ChatWindow

              messages={messages}

            />



          </div>



        </div>








        {/* Input */}

        <ChatInput />





      </main>




    </div>

  );

}