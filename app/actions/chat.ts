"use server";

import { ragChat } from "@/rag-chat";

export async function sendChatMessage(message: string) {
  // 入力検証
  if (!message || typeof message !== "string") {
    throw new Error("Invalid message");
  }

  if (message.length > 5000) {
    throw new Error("Message too long");
  }

  if (!message.trim()) {
    throw new Error("Message cannot be empty");
  }

  try {
    const result = await ragChat(message, {
      includeSearchDetails: true,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Chat error:", error);
    return {
      success: false,
      error: "Failed to process message",
    };
  }
}
