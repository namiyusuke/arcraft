"use client";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
type Props = {
  title: string;
  className?: string;
};

export default function Hero({ title, className }: Props) {
  const pathname = usePathname();
  function spanText(title: string) {
    return title.split("").map((char, index) => (
      <span style={{ "--index": index } as React.CSSProperties} key={index} className={styles.spantext}>
        {char}
      </span>
    ));
  }
  useEffect(() => {
    document.documentElement.classList.remove("is-loaded");
    setTimeout(() => {
      document.documentElement.classList.add("is-loaded");
    }, 40);
  }, [pathname]);

  return (
    <section className={`${styles.container} ${className}`}>
      <div className="title__wrap">
        <h1 className={styles.title}>{spanText(title)}</h1>
      </div>
    </section>
  );
}
