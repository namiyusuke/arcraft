"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

interface AnimatedLinkProps {
  href: string;
  children: string;
  className?: string;
  onNavigate?: () => void; // 遷移開始時のコールバック
}

export default function AnimatedLink({ href, children, className = "", onNavigate }: AnimatedLinkProps) {
  const router = useRouter();
  const letters = children.split("");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // コールバック関数があれば実行
    if (onNavigate) {
      onNavigate();
    }
    
    // 少し遅延してから遷移
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <div onClick={handleClick} className={`${styles.target} ${className}`} style={{ cursor: 'pointer' }}>
      <span className="visually-hidden">{children}</span>
      <span className={`${styles.targetTxt} ${styles.normal}`} aria-hidden="true">
        {letters.map((letter, index) => (
          <span key={index} aria-hidden="true" translate="no" style={{ "--ls-index": index } as React.CSSProperties}>
            {letter}
          </span>
        ))}
      </span>
      <span className={`${styles.targetTxt} ${styles.hover}`} aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={index}
            aria-hidden="true"
            translate="no"
            style={{ "--ls-index": index + 1 } as React.CSSProperties}
          >
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}
