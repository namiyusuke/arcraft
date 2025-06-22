import styles from "./index.module.css";
import { formatDate } from "@/app/_libs/utils";
type props = {
  date: string;
};

export default function Date({ date }: props) {
  return <span className={styles.date}>{formatDate(date)}</span>;
}
