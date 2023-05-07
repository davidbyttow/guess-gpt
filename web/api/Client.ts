import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001"
      : undefined,
  timeout: 1000 * 60 * 3, // 3 min, gpt requests can take a long time :)
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
