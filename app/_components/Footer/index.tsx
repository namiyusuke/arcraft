"use client";
import { useScrollObserver } from "@/app/fooks/useScrollObserver";
import styles from "./index.module.css";
import Link from "next/link";

// spanText関数をコンポーネント外で定義
function spanText(title: string) {
  return title.split("").map((char, index) => (
    <span style={{ "--index": index } as React.CSSProperties} key={index} className="textspan">
      {char}
    </span>
  ));
}

export default function Footer() {
  const { ref } = useScrollObserver("is-footer");

  return (
    <footer ref={ref} className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerSticky}>
          <div className={styles.content}>
            <div className={styles.container}>
              <div className={styles.inner}>
                {/* <div className={styles.logo}>
                  <Image src="/logo.svg" alt="logo" width={100} height={100} />
                </div> */}
                <nav className={styles.nav}>
                  <ul className={styles.items}>
                    <li className={styles.item}>
                      <Link href="/">top</Link>
                    </li>
                    <li className={styles.item}>
                      <Link href="/techlog">techlog</Link>
                    </li>
                    <li className={styles.item}>
                      <Link href="/life">lifelog</Link>
                    </li>
                    <li className={styles.item}>
                      <Link href="/about">about</Link>
                    </li>
                    <li className={styles.item}>
                      <Link href="/contact">contact</Link>
                    </li>
                    <li className={styles.item}>
                      <Link href="/privacy">Privacy policy</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <p className={`${styles.footerTitle} footerTitle`}>{spanText("teclog")}</p>
            <p className={styles.copy}>© SIMPLE. All Rights Reserved 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
