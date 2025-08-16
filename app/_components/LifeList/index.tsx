import Image from "next/image";
import styles from "./index.module.css";
import { Life } from "@/app/_libs/microcms";
import Date from "@/app/_components/Date";
import Footer from "@/app/_components/Footer";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
interface lifelogListProps {
  life: Life[];
}
export default function LifeList({ life }: lifelogListProps) {
  if (life.length === 0) {
    return <p>ニュースがありません</p>;
  }
  return (
    <div className="u-wrapper u-wrapper--article">
      <div className={styles.titleLifeTxt}>
        <p className={styles.titleTxt}>Visualize the process of growth by testing ideas and experimenting</p>
      </div>
      <ul className={styles.listWrapper}>
        {life.map((content) => (
          <li key={content.id} className={styles.list}>
            <ViewTransition name={`thumbnail-${content.id}`}>
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
            </ViewTransition>
            <div className={styles.content__left}>
              <div className={styles.content__inner}>
                <span className={styles.date}>
                  <Date date={content.publishedAt ?? content.createdAt} />
                </span>
                <dl className={styles.content}>
                  <dt className={styles.title}>
                    <span className={styles.title__line}>{content.title}</span>
                  </dt>
                  <dd className={styles.meta}>{/* <Tag category={content.category} /> */}</dd>
                </dl>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
