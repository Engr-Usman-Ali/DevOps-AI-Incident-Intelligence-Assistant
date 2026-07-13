import {
  FileText,
  Bot,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Logs Analyzed",
    value: "1,284",
    icon: FileText,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "AI Sessions",
    value: "742",
    icon: Bot,
    color: "from-purple-600 to-pink-500",
  },
  {
    title: "Accuracy",
    value: "96%",
    icon: ShieldCheck,
    color: "from-green-600 to-emerald-500",
  },
  {
    title: "Response",
    value: "1.2s",
    icon: Clock,
    color: "from-orange-500 to-yellow-500",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item, index) => {

        const Icon = item.icon;

        return (

          <motion.div
            key={index}
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >

            <div className="flex justify-between">

              <div>

                <p className="text-slate-400">

                  {item.title}

                </p>

                <h2 className="text-4xl font-bold mt-4">

                  {item.value}

                </h2>

              </div>

              <div
                className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center`}
              >
                <Icon className="text-white" />
              </div>

            </div>

          </motion.div>

        );

      })}

    </div>
  );
}