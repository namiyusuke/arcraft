import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
          </div>
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
      <p className={styles.cr}>© SIMPLE. All Rights Reserved 2024</p>
    </footer>
  );
}
