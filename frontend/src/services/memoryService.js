import api from "./api";

// Get all chat sessions
export const getSessions = async () => {
  const response = await api.get("/memory/sessions");
  return response.data;
};

// Get all messages of one session
export const getMessages = async (sessionId) => {
  const response = await api.get(`/memory/messages/${sessionId}`);
  return response.data;
};