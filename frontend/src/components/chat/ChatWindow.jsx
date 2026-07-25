import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages = [] }) {


  if (messages.length === 0) {

    return (

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">

        <h2 className="text-2xl font-bold">
          👋 Welcome
        </h2>


        <p className="mt-4 text-slate-400">
          Upload a Linux, Kubernetes, or JSON log file and ask any DevOps troubleshooting question.
        </p>


      </div>

    );

  }



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