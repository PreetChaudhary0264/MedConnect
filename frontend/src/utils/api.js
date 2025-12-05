import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // no extra /api
});

export const uploadReport = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
//fixed api connector
export const fetchReports = () => api.get("/reports");
export const fetchReport = (id) => api.get(`/reports/${id}`);
export const fetchMessages = (reportId) => api.get(`/messages/${reportId}`);
export const sendMessage = (reportId, message) =>
  api.post(`/chat/${reportId}`, { message });
