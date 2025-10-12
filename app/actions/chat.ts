"use server";

import { ragChat } from "@/rag-chat";
import { db } from "@/db";
import { inputSchema } from "@/db/schemas/input";
import { nanoid } from "nanoid";

export async function sendChatMessage(message: string) {
  // console.log("[Server Action] Received message:", message);
  // console.log("[Server Action] Environment check:", {
  //   hasDatabaseUrl: !!process.env.TURSO_DATABASE_URL,
  //   hasAuthToken: !!process.env.TURSO_AUTH_TOKEN,
  //   hasOpenAiKey: !!process.env.OPENAI_API_KEY,
  //   nodeEnv: process.env.NODE_ENV,
  // });

  // 入力検証
  if (!message || typeof message !== "string") {
    console.error("[Server Action] Invalid message type");
    throw new Error("Invalid message");
  }

  if (message.length > 5000) {
    console.error("[Server Action] Message too long");
    throw new Error("Message too long");
  }

  if (!message.trim()) {
    console.error("[Server Action] Empty message");
    throw new Error("Message cannot be empty");
  }

  try {
    console.log("[Server Action] Calling ragChat...");
    const result = await ragChat(message, {
      includeSearchDetails: true,
    });

    // データベースに質問を保存
    try {
      await db.insert(inputSchema).values({
        id: nanoid(),
        text: message,
      });
      // console.log("[Server Action] Question saved to database");
    } catch (dbError) {
      // データベース保存エラーはログに記録するが、ユーザーへの応答は継続
      console.error("[Server Action] Failed to save question to database:", dbError);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("[Server Action] Chat error:", error);
    console.error("[Server Action] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to process message",
    };
  }
}
