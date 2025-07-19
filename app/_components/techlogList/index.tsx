import Image from "next/image";
import styles from "./index.module.css";
import { News } from "@/app/_libs/microcms";
import Tag from "@/app/_components/Category";
import Date from "@/app/_components/Date";
import Link from "next/link";
import { useMemo } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
interface TechlogListProps {
  news: News[];
  selectedCategories?: string[];
}

export default function TechlogList({ news, selectedCategories = [] }: TechlogListProps) {
  // フィルタリングされた記事を計算
  const filteredNews = useMemo(() => {
    if (selectedCategories.length === 0) {
      return news;
    }
    return news.filter((content) => selectedCategories.includes(content.category.id));
  }, [news, selectedCategories]);

  if (news.length === 0) {
    return <p className={styles.emptyMessage}>記事がありません</p>;
  }

  if (filteredNews.length === 0) {
    return (
      <div className={styles.emptyFilterResult}>
        <p>選択されたカテゴリーの記事はありません</p>
        <p className={styles.totalCount}>全{news.length}件の記事があります</p>
      </div>
    );
  }

  return (
    <div className="u-wrapper ">
      <p className={styles.titleTxt}>Visualize the process of growth by testing ideas and experimenting</p>
      <ul className={styles.listWrapper}>
        {filteredNews.map((content, index) => (
          <li
            key={`${content.id}-${selectedCategories.join("-")}`}
            className={`${styles.list} ${styles.animateItem}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ViewTransition name={`thumbnail-${content.id}`}>
              <Link aria-label={content.title} href={`/techlog/${content.id}`} className={styles.link}></Link>
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
                  <dd className={styles.meta}>
                    <Tag category={content.category} />
                  </dd>
                </dl>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
