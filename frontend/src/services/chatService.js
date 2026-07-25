import api from "./api";

export const sendMessage = async (message, file = null, sessionId = null) => {
  const formData = new FormData();

  formData.append("message", message);

  // Continue existing chat session
  if (sessionId !== null) {
    formData.append("session_id", sessionId);
  }

  // Upload log file
  if (file) {
    formData.append("file", file);
  }

  const response = await api.post("/chat", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
