import styles from "./index.module.css";
import Link from "next/link";
import { getCategoryList } from "@/app/_libs/microcms";

export default async function TagList() {
  const { contents: categories } = await getCategoryList();
  return (
    <ul className={styles.list}>
      <li>
        <Link href="/news/">すべて</Link>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <Link href={`/techlog/category/${category.id}`}>
            <span className={styles.tag}>{category.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
