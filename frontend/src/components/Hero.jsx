import { ArrowRight, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-36 pb-28"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <span className="bg-slate-800 text-blue-400 px-4 py-2 rounded-full text-sm">
            AI Powered DevOps Assistant
          </span>

          <h1 className="text-5xl lg:text-6xl font-black mt-8 leading-tight">

            Detect

            <span className="text-blue-500">
              {" "}Incidents
            </span>

            <br />

            Before They Become

            <span className="text-cyan-400">
              {" "}Disasters
            </span>

          </h1>

          <p className="mt-8 text-gray-400 leading-8 text-lg">

            Upload Linux, Docker or Kubernetes logs.

            Our AI automatically analyzes incidents,

            identifies root causes,

            recommends solutions,

            and helps engineers resolve issues faster.

          </p>

          <div className="mt-10 flex gap-5">

            <button className="bg-blue-600 px-7 py-4 rounded-xl flex items-center gap-3 hover:bg-blue-700 transition">

              Get Started

              <ArrowRight />

            </button>

            <button className="border border-slate-700 px-7 py-4 rounded-xl hover:bg-slate-900">

              Documentation

            </button>

          </div>

        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl">

            <div className="flex justify-between">

              <h3 className="font-bold text-xl">
                AI Incident Report
              </h3>

              <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                HIGH
              </span>

            </div>

            <div className="mt-8">

              <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-4">

                <UploadCloud className="text-blue-400" />

                system.log uploaded successfully

              </div>

              <div className="mt-6 space-y-5">

                <div>

                  <p className="text-gray-400">
                    Root Cause
                  </p>

                  <h4 className="font-semibold mt-2">
                    Kubernetes CrashLoopBackOff
                  </h4>

                </div>

                <div>

                  <p className="text-gray-400">
                    Confidence
                  </p>

                  <div className="bg-slate-700 rounded-full h-3 mt-2">

                    <div className="bg-green-500 h-3 rounded-full w-[96%]"></div>

                  </div>

                  <p className="mt-2">
                    96%
                  </p>

                </div>

                <div>

                  <p className="text-gray-400">
                    Suggested Fix
                  </p>

                  <ul className="mt-2 space-y-2 text-sm">

                    <li>✔ Restart Deployment</li>

                    <li>✔ Increase Memory Limit</li>

                    <li>✔ Check Readiness Probe</li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}