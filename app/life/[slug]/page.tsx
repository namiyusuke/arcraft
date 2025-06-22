import { getLifeDetail } from "@/app/_libs/microcms";
import ArticleLife from "@/app/_components/articleLife";
import Link from "next/link";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: string;
  };
};

export default async function NewsDetail({ params, searchParams }: Props) {
  const data = await getLifeDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(() => {
    notFound();
  });
  return (
    <>
      <ArticleLife data={data} />
      <div className={styles.footer}>
        <Link href="/life">一覧に戻る</Link>
      </div>
    </>
  );
}
