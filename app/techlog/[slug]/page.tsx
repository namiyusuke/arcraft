import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/article";
import Link from "next/link";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    dk?: string;
  }>;
};

export default async function NewsDetail({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const data = await getNewsDetail(resolvedParams.slug, {
    draftKey: resolvedSearchParams.dk,
  }).catch(() => {
    notFound();
  });
  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <Link href="/techlog">一覧に戻る</Link>
      </div>
    </>
  );
}
