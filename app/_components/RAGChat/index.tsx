"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import styles from "./index.module.css";

export default function RAGChat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/rag-chat",
      body: {
        minSimilarity: 0.3,
        maxResults: 3,
      },
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        <h2>RAG チャット</h2>

        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={styles.emptyState}>
              質問を入力してください
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user" ? styles.userMessage : styles.aiMessage
              }
            >
              <div className={styles.messageRole}>
                {message.role === "user" ? "あなた" : "AI"}
              </div>
              <div className={styles.messageContent}>
                {message.parts.map((part, j) => (
                  <span key={j}>{part.type === "text" ? part.text : ""}</span>
                ))}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={styles.aiMessage}>
              <div className={styles.messageRole}>AI</div>
              <div className={styles.messageContent}>
                <div className={styles.loadingDots}>
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="質問を入力..."
            disabled={isLoading}
            className={styles.input}
          />
          <button
            type="submit"
            disabled={isLoading || !input?.trim()}
            className={styles.button}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}
