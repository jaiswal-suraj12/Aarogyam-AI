import type { ChatMessage } from "../types/chat";

export const sendMessage = async (
  messages: ChatMessage[]
) => {
  const response = await fetch(
    "http://localhost:5000/api/ai/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
      }),
    }
  );

  return response.json();
};