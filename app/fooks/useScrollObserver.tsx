"use client";
import { useEffect, useRef } from "react";

export const useScrollObserver = (target: string) => {
  const ref = useRef(null);

  useEffect(() => {
    // 初期状態でクラスを削除
    document.documentElement.classList.remove(target);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.documentElement.classList.add(target);
        } else {
          document.documentElement.classList.remove(target);
        }
      },
      {
        threshold: 0.1, // 10%見えたらトリガー
        rootMargin: "0px 0px -30% 0px", // 下から30%手前でトリガー
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      // クリーンアップ時にクラスを削除
      document.documentElement.classList.remove(target);
    };
  }, []);

  return { ref, target: "is-active" };
};
