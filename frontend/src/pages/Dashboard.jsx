import Sidebar from "../components/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCards from "../components/dashboard/StatsCards";
import RecentAnalysis from "../components/dashboard/RecentAnalysis";
import AIStatusCard from "../components/dashboard/AIStatusCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <main className="flex-1 overflow-y-auto">

        <TopBar />

        <div className="p-8">

          <WelcomeCard />

          <div className="mt-8">
            <StatsCards />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

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