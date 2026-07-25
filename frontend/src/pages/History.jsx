import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/dashboard/TopBar";

import HistoryFilter from "../components/history/HistoryFilter";
import HistoryCard from "../components/history/HistoryCard";

import { getSessions } from "../services/memoryService";


export default function History() {


  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(true);


  const [sidebarOpen, setSidebarOpen] = useState(false);



  // Filter states

  const [severity, setSeverity] = useState("All");

  const [search, setSearch] = useState("");




  useEffect(() => {

    loadHistory();

  }, []);





  const loadHistory = async () => {

    try {

      const data = await getSessions();

      console.log("History Data:", data);

      setSessions(data);


    } catch(error){

      console.error(error);


    } finally {

      setLoading(false);

    }

  };






  // Apply Filters

  const filteredSessions = sessions.filter((session)=>{


    const matchSeverity =
      severity === "All" ||
      session.severity === severity;



    const matchSearch =
      session.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      session.summary
        ?.toLowerCase()
        .includes(search.toLowerCase());



    return matchSeverity && matchSearch;


  });






  return (

    <div className="min-h-screen bg-slate-950 text-white">



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






      <main className="lg:ml-72">



        <TopBar
          onMenu={() => setSidebarOpen(true)}
        />





        <div className="p-4 sm:p-6 lg:p-8">


          <div className="mx-auto max-w-6xl">



            <h1 className="text-4xl font-bold">

              Chat History

            </h1>




            <p className="mt-2 text-slate-400">

              View all previous AI incident analyses.

            </p>






            <HistoryFilter

              severity={severity}

              setSeverity={setSeverity}

              search={search}

              setSearch={setSearch}

            />







            <div className="mt-8 space-y-6">


              {loading ? (


                <p className="text-slate-400">
                  Loading history...
                </p>



              ) : filteredSessions.length === 0 ? (


                <p className="text-slate-400">
                  No matching history found.
                </p>



              ) : (


                filteredSessions.map((session)=>(


                  <HistoryCard

                    key={session.id}

                    item={session}

                  />


                ))


              )}



            </div>




          </div>


        </div>



      </main>


    </div>

  );

}