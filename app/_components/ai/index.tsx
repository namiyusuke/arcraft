"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useQueryState } from "nuqs";
import Image from "next/image";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

// 初回表示する質問候補
const SUGGESTED_QUESTIONS = [
  "namiの趣味は何ですか?",
  "namiの強みはなんですか？",
  "namiの休みの日のルーティンを教えて！",
  "attcraftって何なの？",
  "namiの秘密は？",
  "デザインはどうしてるの？",
];

export default function Ai() {
  const [isOpen, setIsOpen] = useQueryState("panel-active", {
    defaultValue: "false",
  });

  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage: sendChatMessage,
    status,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        minSimilarity: 0.3,
        maxResults: 3,
      },
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen === "true") {
      document.documentElement.classList.add("is-open");
    } else {
      document.documentElement.classList.remove("is-open");
    }
  }, [isOpen]);

  const sendMessage = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!text.trim() || isLoading) return;

    sendChatMessage({ text });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendChatMessage({ text: input });
    setInput("");
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
                            onClick={(e) => sendMessage(question, e)}
                            disabled={isLoading}
                          >
                            {question}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <>
                    {messages.map((message, i) => (
                      <div
                        key={i}
                        className={`${styles.message} ${
                          message.role === "user" ? styles.userMessage : styles.assistantMessage
                        }`}
                      >
                        {/* <span className={styles.messageRole}>{message.role === "user" ? "" : ""}</span> */}
                        <span className={styles.messageContent}>
                          {message.parts.map((part, j) => (
                            <span key={j}>{part.type === "text" ? part.text : ""}</span>
                          ))}
                        </span>
                      </div>
                    ))}
                    {isLoading && (
                      <div className={`${styles.message} ${styles.assistantMessage}`}>
                        <span className={`${styles.messageContent} ${styles.loadingMessage}`}>
                          <span className={styles.loadingDots}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                          </span>
                        </span>
                      </div>
                    )}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                handleSubmit(e);
              }}
            >
              <div className={styles.inputWrapper}>
                <input
                  className={styles.input}
                  value={input}
                  placeholder="聞いてみて！"
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={styles.inputBtn}
                  disabled={isLoading || !input?.trim()}
                  aria-label="メッセージを送信"
                ></button>
              </div>
              <p className={styles.privacy}>
                こちら
                <Link className={styles.privacyLine} href="/privacy#ai">
                  サイトポリシー
                </Link>
                に同意した方のみご利用ください
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
