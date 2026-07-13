import {
  Brain,
  Cpu,
  Database,
  Activity,
} from "lucide-react";

export default function AIStatusCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex justify-between">

        <h2 className="text-xl font-bold">

          AI Engine

        </h2>

        <span className="flex items-center gap-2 text-green-400">

          <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>

          Online

        </span>

      </div>

      <div className="space-y-6 mt-8">

        <StatusItem
          icon={<Brain />}
          title="Model"
          value="Mistral 7B"
        />

        <StatusItem
          icon={<Database />}
          title="Provider"
          value="Hugging Face"
        />

        <StatusItem
          icon={<Cpu />}
          title="Latency"
          value="1.2 sec"
        />

        <StatusItem
          icon={<Activity />}
          title="Accuracy"
          value="96%"
        />

      </div>

      <div className="mt-10">

        <h3 className="font-semibold mb-4">

          System Health

        </h3>

        <Progress title="CPU" value={24} />

        <Progress title="Memory" value={47} />

        <Progress title="Storage" value={36} />

      </div>

    </div>
  );
}

function StatusItem({ icon, title, value }) {
  return (
    <div className="flex justify-between items-center">

      <div className="flex gap-3 items-center">

        <div className="text-cyan-400">

          {icon}

        </div>

        <span className="text-slate-400">

          {title}

        </span>

      </div>

      <span className="font-semibold">

        {value}

      </span>

    </div>
  );
}

function Progress({ title, value }) {
  return (
    <div className="mb-5">

      <div className="flex justify-between mb-2">

        <span>{title}</span>

        <span>{value}%</span>

      </div>

      <div className="h-2 rounded-full bg-slate-700">

        <div
          style={{ width: `${value}%` }}
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
        />

      </div>

    </div>
  );
}