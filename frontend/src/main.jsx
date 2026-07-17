import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Toaster } from "react-hot-toast";

import AuthProvider from "./context/AuthContext";
import ChatProvider from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AuthProvider>

      <ChatProvider>

        <App />

        <Toaster position="top-right" />

      </ChatProvider>

    </AuthProvider>

  </React.StrictMode>
);