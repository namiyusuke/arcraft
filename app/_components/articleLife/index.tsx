import Image from "next/image";
import type { Life } from "@/app/_libs/microcms";
import Date from "../Date";
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
  data: Life;
};

export default async function ArticleLife({ data }: Props) {
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
  console.log(toc);
  return (
    <main>
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
            <Date date={data.publishedAt ?? data.createdAt} />
          </div>
          <h1 className={styles.title}>{data.title}</h1>
        </div>
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
    </main>
  );
}
