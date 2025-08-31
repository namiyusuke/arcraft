"use client";
import { useEffect } from "react";
import styles from "./not-found.module.css";
// import Chatbot from "./_components/Chatbot";
// import KnowledgeSeeder from "./_components/KnowledgeSeeder";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3); // 3秒後にトップページへリダイレクト
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <dl>
          <dt className={styles.title}>namiの秘密を知りたい？</dt>
          <dd className={styles.text}>
            お探しのページは見つかりませんでしたが、
            <br />
            代わりにAIチャットボットで何でもお聞きください！
          </dd>
        </dl>
      </div>
      {/* <KnowledgeSeeder />
      <Chatbot /> */}
    </div>
  );
}
