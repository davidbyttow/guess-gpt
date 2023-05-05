import axiosClient from "./Client";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

interface ChatResponse {
  messages: ChatMessage[];
}

export const chat = async (req: ChatRequest): Promise<ChatResponse> => {
  const response = await axiosClient.post<ChatResponse>("/v1/chat", req);
  return response.data;
};
