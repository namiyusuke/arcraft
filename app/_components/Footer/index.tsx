"use client";
import { useScrollObserver } from "@/app/fooks/useScrollObserver";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const menuItems = [
  { label: "techlog", path: "/techlog", name: "techlog" },
  { label: "life", path: "/life", name: "lifelog" },
  { label: "about", path: "/about", name: "about" },
];
// spanText関数をコンポーネント外で定義
function spanText(title: string) {
  return title.split("").map((char, index) => (
    <span style={{ "--index": index } as React.CSSProperties} key={index} className="textspan">
      {char}
    </span>
  ));
}

export default function Footer() {
  const pathname = usePathname();
  const firstPath = pathname.split("/")[1];
  const { ref } = useScrollObserver("is-footer");

  return (
    <footer ref={ref} className={`${styles.footer} is-${firstPath}`}>
      <div className={styles.footerInner}>
        <div className={styles.footerSticky}>
          <div className={styles.content}>
            <div className={styles.container}>
              <div className={styles.inner}>
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
                      <Link className={styles.footerPrivacy} href="/privacy">
                        Privacy policy
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <ul className={styles.snsList}>
                <li className="">
                  <a href="#">
                    <Image width={20} height={20} alt="X" className={styles.snsLogo} src="/x-logo-white.svg" />
                  </a>
                </li>
                <li className="">
                  <a href="#">
                    <Image
                      width={24}
                      height={24}
                      alt="codepen"
                      className={styles.snsLogo}
                      src="/codepen-logo-white.svg"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <p className={`${styles.footerTitle} footerTitle`}>
              {menuItems.map((item) => (item.label === firstPath ? spanText(`${item.name}`) : ""))}
            </p>
            <p className={styles.copy}>© SIMPLE. All Rights Reserved 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
