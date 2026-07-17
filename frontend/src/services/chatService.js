import api from "./api";

export const sendMessage = async (message, file = null) => {
  const formData = new FormData();

  formData.append("message", message);

  if (file) {
    formData.append("file", file);
  }

  const response = await api.post(
    "/chat",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};