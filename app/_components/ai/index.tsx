"use client";
import { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "../../actions/chat";
import styles from "./index.module.css";
import { useQueryState } from "nuqs";
import Image from "next/image";

// 初回表示する質問候補
const SUGGESTED_QUESTIONS = [
  "namiの趣味は何ですか?",
  "namiの強みはなんですか？",
  "namiの休みの日のルーティンを教えて！",
  "attcraftって何？",
  "namiの秘密は？",
];

export default function Ai() {
  const [isOpen, setIsOpen] = useQueryState("panel-active", {
    defaultValue: "false",
  });
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (isOpen === "true") {
      document.documentElement.classList.add("is-open");
    } else {
      document.documentElement.classList.remove("is-open");
      // モーダルが閉じたらメッセージと入力をリセット
      setMessages([]);
      setInput("");
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      console.log("[Client] Sending message:", text);
      const result = await sendChatMessage(text);
      console.log("[Client] Result received:", result);

      if (result.success && result.data) {
        setMessages((prev) => [...prev, { role: "assistant", content: result.data.answer }]);
      } else {
        console.error("[Client] Error from server:", result.error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `エラーが発生しました: ${result.error || "もう一度お試しください。"}` },
        ]);
      }
    } catch (error) {
      console.error("[Client] Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "エラーが発生しました。もう一度お試しください。" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className={styles.open} onClick={() => setIsOpen("true")}>
        <Image width={1536} height={1024} alt="吹き出し" className={styles.image} src="/ai-fukidahi.png" />
      </button>
      <div
        onClick={() => setIsOpen(null)}
        className={`${styles.chatainerWrapper} ${isOpen === "true" ? styles.isOpen : ""}`}
      >
        <div className={styles.chatainerInner}>
          <div className={`${styles.chatai}`} onWheel={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setIsOpen(null)}></button>
            <div className={styles.chatText}>
              <p className={styles.chatProfile}>
                このチャットボットではサイト運営者にまつわることが聞けます！
                <br />
                存分に聞いてあげてください
              </p>
              <div className={styles.chatTextInner}>
                {messages.length === 0 ? (
                  <div className={styles.suggestedQuestions}>
                    <p className={styles.suggestedTitle}>例えばこんなことが聞けます:</p>
                    <ul className={`${styles.questionList} ${isOpen === "true" ? styles.chatActive : ""}`}>
                      {SUGGESTED_QUESTIONS.map((question, i) => (
                        <li key={i}>
                          <button
                            className={styles.questionButton}
                            onClick={() => sendMessage(question)}
                            disabled={isLoading}
                          >
                            {question}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  messages.map((message, i) => (
                    <div
                      key={i}
                      className={`${styles.message} ${
                        message.role === "user" ? styles.userMessage : styles.assistantMessage
                      }`}
                    >
                      {/* <span className={styles.messageRole}>{message.role === "user" ? "" : ""}</span> */}
                      <span className={styles.messageContent}>{message.content}</span>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isLoading && input.trim()) {
                  sendMessage(input);
                  setInput("");
                }
              }}
            >
              <div className={styles.inputWrapper}>
                <input
                  className={styles.input}
                  value={input}
                  placeholder="聞いてみて！"
                  onChange={(e) => setInput(e.currentTarget.value)}
                  disabled={isLoading}
                />
                <button
                  onClick={() => {
                    if (!isLoading && input.trim()) {
                      sendMessage(input);
                      setInput("");
                    }
                  }}
                  className={styles.inputBtn}
                  type="button"
                  aria-label="メッセージを送信"
                ></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
