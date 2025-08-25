import { NEWS_LIST_LIMIT } from "@/app/constants";
import styles from "./index.module.css";
import Link from "next/link";

type Props = {
  totalCount: number;
  current?: number;
  basePath: string;
};

export default function Pagination({ totalCount, current = 1, basePath = "/news" }: Props) {
  const pages = Array.from({ length: Math.ceil(totalCount / NEWS_LIST_LIMIT) }, (_, i) => i + 1);

  return (
    <nav>
      <ul className={styles.container}>
        {pages.map((p) => (
          <li key={p} className={styles.list}>
            {current !== p ? (
              <Link className={styles.item} href={`${basePath}/p/${p}`}>
                <span className={styles.number}>{p}</span>
              </Link>
            ) : (
              <span className={`${styles.item} ${styles.current}`}>
                <span className={styles.number}>{p}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
