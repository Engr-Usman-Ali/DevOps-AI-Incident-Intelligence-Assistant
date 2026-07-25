import { useState } from "react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCards from "../components/dashboard/StatsCards";
import RecentAnalysis from "../components/dashboard/RecentAnalysis";
import AIStatusCard from "../components/dashboard/AIStatusCard";


export default function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);


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



      {/* Main Content */}

      <main className="lg:ml-72">


        <TopBar
          onMenu={() => setSidebarOpen(true)}
        />



        <div className="p-4 sm:p-6 lg:p-8">


          <WelcomeCard />



          <div className="mt-6">
            <StatsCards />
          </div>



          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

            <div className="xl:col-span-2">
              <RecentAnalysis />
            </div>


            <AIStatusCard />

          </div>


        </div>


      </main>


    </div>

  );
}