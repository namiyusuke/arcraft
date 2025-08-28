// "use client";

// import { useState } from "react";
// import styles from "./index.module.css";

// interface Message {
//   id: string;
//   text: string;
//   sender: "user" | "ai";
//   timestamp: Date;
// }

// export default function Chatbot() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: input,
//       sender: "user",
//       timestamp: new Date(),
//     };

//     const currentInput = input;
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           messages: [
//             ...messages.map((msg) => ({
//               role: msg.sender === "user" ? "user" : "assistant",
//               content: msg.text,
//             })),
//             { role: "user", content: currentInput },
//           ],
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("API request failed");
//       }

//       const data = await response.json();

//       // デバッグ情報をコンソールに出力
//       if (data.debug) {
//         console.group('🔍 RAGデバッグ情報');
//         console.log('検索クエリ:', data.debug.query);
//         console.log('検索結果数:', data.debug.searchResultsCount);
//         console.log('コンテキスト使用:', data.debug.contextUsed ? '✅' : '❌');
//         if (data.debug.searchResults) {
//           console.log('検索結果詳細:', data.debug.searchResults);
//         }
//         if (data.debug.error) {
//           console.error('検索エラー:', data.debug.error);
//         }
//         console.groupEnd();
//       }

//       const aiMessage: Message = {
//         id: Date.now().toString() + "-ai",
//         text: data.message,
//         sender: "ai",
//         timestamp: new Date(),
//       };

//       console.log("AIからの応答:", data.message);
//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       const errorMessage: Message = {
//         id: Date.now().toString() + "-error",
//         text: "申し訳ありませんが、現在応答できません。しばらく経ってからもう一度お試しください。",
//         sender: "ai",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className={styles.chatbot}>
//       <div className={styles.header}>
//         <h2>AIチャットボット</h2>
//       </div>

//       <div className={styles.messagesContainer}>
//         {messages.length === 0 && (
//           <div className={styles.emptyState}>
//             <p>こんにちは！何でもお聞きください。</p>
//           </div>
//         )}

//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`${styles.message} ${message.sender === "user" ? "userMessage" : "aiMessage"}`}
//           >
//             <div className={styles.messageContent}>{message.text}</div>
//           </div>
//         ))}

//         {isLoading && (
//           <div className={`${styles.message} ${styles.aiMessage}`}>
//             <div className={styles.messageContent}>
//               <div className={styles.loadingDots}>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="chat-form">
//         <form onSubmit={handleSubmit} className={styles.inputForm}>
//           <div className="sendButton-wrapper">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="textfield"
//               disabled={isLoading}
//             />
//             <button type="submit" disabled={isLoading || !input.trim()} className="sendButton"></button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
