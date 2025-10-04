"use client";
import { useState } from "react";
import { sendChatMessage } from "../actions/chat";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const result = await sendChatMessage(text);

      if (result.success && result.data) {
        setMessages((prev) => [...prev, { role: "assistant", content: result.data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "エラーが発生しました。もう一度お試しください。" },
        ]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "エラーが発生しました。もう一度お試しください。" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isLoading && input.trim()) {
            sendMessage(input);
            setInput("");
          }
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
