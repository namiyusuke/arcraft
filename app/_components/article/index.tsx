import Link from "next/link";
import Image from "next/image";
import type { News } from "@/app/_libs/microcms";
import Date from "../Date";
import Category from "../Category";
import styles from "./index.module.css";
import {
  codeBlockFileNameTransformer,
  microCMSRichEditorHandler,
  syntaxHighlightingByShikiTransformer,
  tocExtractor,
} from "microcms-rich-editor-handler";
import TocLink from "./TocLink";
import { unstable_ViewTransition as ViewTransition } from "react";

type Props = {
  data: News;
};

export default async function Article({ data }: Props) {
  const post = data.content;
  const {
    html,
    data: { toc },
  } = await microCMSRichEditorHandler(post, {
    transformers: [
      codeBlockFileNameTransformer(), // ファイル名を表示
      syntaxHighlightingByShikiTransformer({
        highlightOptions: {
          html: {
            lang: "html",
            theme: "github-dark",
          },
          typescript: {
            lang: "typescript",
            theme: "github-dark",
          },
          css: {
            lang: "css",
            theme: "github-dark",
          },
          javascript: {
            lang: "javascript",
            theme: "github-dark",
          },
        },
        defaultHighlightOptions: {
          lang: "text",
          theme: "vitesse-dark",
        },
      }),
    ],
    extractors: {
      toc: [
        tocExtractor({
          ignoreLevels: [4, 5], // 無視したい見出しのレベル
        }),
        { phase: "before" },
      ],
    },
  });
  return (
    <main>
      <div className="article-margin">
        <div className="u-wrapper">
          {data.thumbnail && (
            <ViewTransition name={`thumbnail-${data.id}`}>
              <Image
                src={data.thumbnail.url}
                alt=""
                className={styles.thumbnail}
                width={data.thumbnail.width}
                height={data.thumbnail.height}
              />
            </ViewTransition>
          )}

          <div className={styles.top}>
            <div className={styles.meta}>
              <Link href={`/techlog/category/${data.category.id}`} className={styles.categoryLink}>
                <Category category={data.category} />
              </Link>
              <span className={styles.date}>
                <Date date={data.publishedAt ?? data.createdAt} />
              </span>
            </div>
            <h1 className={styles.title}>{data.title}</h1>
          </div>
          {/* <p className={styles.description}>{data.description}</p> */}
          {toc.length > 0 && (
            <div className={styles.toc}>
              <h2 className={styles.tocTitle}>目次</h2>
              <ol className={styles.tocList}>
                {toc.map((item) => (
                  <li key={item.id} className={styles.tocItem}>
                    <TocLink id={item.id} text={item.text} className={styles.tocLink} />
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
      </div>
    </main>
  );
}
