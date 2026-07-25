import { useRef, useState } from "react";

import {
  Paperclip,
  SendHorizontal,
  X,
  FileText,
} from "lucide-react";

import useChat from "../../hooks/useChat";


export default function ChatInput() {


  const [message, setMessage] = useState("");

  const [file, setFile] = useState(null);



  const { send, loading } = useChat();



  const fileInputRef = useRef(null);





  const handleFile = (e) => {

    const selected = e.target.files[0];

    if (!selected) return;


    setFile(selected);

  };





  const removeFile = () => {

    setFile(null);


    if(fileInputRef.current){

      fileInputRef.current.value="";

    }

  };






  const handleSend = async () => {


    if(loading) return;


    if(!message.trim() && !file) return;



    const text = message;



    // clear input immediately

    setMessage("");



    await send(
      text,
      file
    );



    setFile(null);



    if(fileInputRef.current){

      fileInputRef.current.value="";

    }


  };







  return (

    <div className="sticky bottom-0 border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl">


      <div className="mx-auto max-w-5xl p-2">



        {/* File Preview */}

        {file && (

          <div className="mb-4 inline-flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-3">


            <FileText
              size={18}
              className="text-cyan-400"
            />


            <span className="text-sm">
              {file.name}
            </span>



            <button
              onClick={removeFile}
              disabled={loading}
            >

              <X size={16}/>

            </button>



          </div>

        )}








        <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2">



          {/* Upload */}

          <button

            onClick={() =>
              fileInputRef.current.click()
            }

            disabled={loading}

            className="rounded-lg p-2 hover:bg-slate-800"

          >

            <Paperclip size={18}/>

          </button>





          <input

            ref={fileInputRef}

            type="file"

            hidden

            accept=".log,.txt,.json"

            onChange={handleFile}

          />








          <textarea

            rows={1}

            value={message}

            disabled={loading}

            placeholder="Ask AI about your logs..."

            onChange={(e)=>
              setMessage(e.target.value)
            }


            onKeyDown={(e)=>{


              if(
                e.key==="Enter" &&
                !e.shiftKey
              ){

                e.preventDefault();

                handleSend();

              }


            }}


            className="flex-1 resize-none bg-transparent outline-none"

          />








          <button

            onClick={handleSend}

            disabled={
              loading ||
              (!message.trim() && !file)
            }


            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-2.5"

          >

            <SendHorizontal size={18}/>

          </button>



        </div>


      </div>


    </div>

  );

}