// 子コンポーネント例
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TransitionComponent({ children }) {
  const elementRef = useRef(null);
  useEffect(() => {
    // ページ遷移後、GSAPでページ内アニメーション
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3, // ViewTransitionの後に実行
      }
    );
  }, []);

  return <div ref={elementRef}>{children}</div>;
}
