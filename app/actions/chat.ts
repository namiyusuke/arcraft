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
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      env: {
        hasDatabaseUrl: !!process.env.TURSO_DATABASE_URL,
        hasAuthToken: !!process.env.TURSO_AUTH_TOKEN,
        hasOpenAiKey: !!process.env.OPENAI_API_KEY,
      },
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to process message",
    };
  }
}
