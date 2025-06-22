import Image from "next/image";
import styles from "./index.module.css";
import { Life } from "@/app/_libs/microcms";
import Date from "@/app/_components/Date";
import Link from "next/link";
interface lifelogListProps {
  life: Life[];
}
export default function LifeList({ life }: lifelogListProps) {
  if (life.length === 0) {
    return <p>ニュースがありません</p>;
  }
  return (
    <ul className={styles.listWrapper}>
      {life.map((content) => (
        <li key={content.id} className={styles.list}>
          <Link aria-label={content.title} href={`/life/${content.id}`} className={styles.link}></Link>
          {content.thumbnail ? (
            <div className={styles.image_wrapper}>
              <Image
                className={styles.image}
                src={content.thumbnail.url}
                alt={content.title}
                width={content.thumbnail.width}
                height={content.thumbnail.height}
              />
            </div>
          ) : (
            <Image className={styles.image} src="/no-image.png" alt={content.title} width={1200} height={630} />
          )}
          <div className={styles.content__left}>
            <div className={styles.content__inner}>
              <Date date={content.publishedAt ?? content.createdAt} />
              <dl className={styles.content}>
                <dt className={styles.title}>
                  <span className={styles.title__line}>{content.title}</span>
                </dt>
              </dl>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
