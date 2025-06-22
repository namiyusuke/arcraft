import styles from "./index.module.css";
import { Category } from "@/app/_libs/microcms";

type props = {
  category: Category;
};

export default function Tag({ category }: props) {
  return <span className={styles.tag}>#{category.name}</span>;
}
