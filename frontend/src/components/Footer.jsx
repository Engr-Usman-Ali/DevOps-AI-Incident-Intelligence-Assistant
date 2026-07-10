import { ShieldCheck, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <ShieldCheck size={26} />
              </div>

              <div>
                <h2 className="font-bold text-xl text-white">DevOps AI</h2>

                <p className="text-gray-400 text-sm">
                  Incident Intelligence Assistant
                </p>
              </div>
            </div>

            <p className="text-gray-400 mt-6 leading-7">
              AI-powered DevOps platform for intelligent log analysis, root
              cause detection, automated troubleshooting, and AI-assisted
              incident resolution.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">
              Navigation
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">
              Technology
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>⚛ React.js</li>

              <li>⚡ FastAPI</li>

              <li>🤖 Hugging Face</li>

              <li>🧠 LangGraph</li>

              <li>🗄 ChromaDB</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">Connect</h3>

            <div className="flex gap-4">
              <a
                href="https://github.com/Engr-Usman-Ali"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 hover:bg-blue-600 p-3 rounded-xl transition duration-300"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://linkedin.com/in/engr-usman--ali/"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 hover:bg-blue-600 p-3 rounded-xl transition duration-300"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="mailto:usmanali08675@gmail.com"
                className="bg-slate-800 hover:bg-blue-600 p-3 rounded-xl transition duration-300"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-slate-800 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} AI DevOps Incident Intelligence
            Assistant. All Rights Reserved.
          </div>

          <div className="text-sm">
            Built with ❤️ by{" "}
            <span className="font-bold text-blue-500">Usman Ali</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
