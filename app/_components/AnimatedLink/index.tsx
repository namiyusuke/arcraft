"use client";

import Link from "next/link";
import styles from "./index.module.css";

interface AnimatedLinkProps {
  href: string;
  children: string;
  className?: string;
}

export default function AnimatedLink({ href, children, className = "" }: AnimatedLinkProps) {
  const letters = children.split("");

  return (
    <Link href={href} className={`${styles.target} ${className}`}>
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
    </Link>
  );
}
