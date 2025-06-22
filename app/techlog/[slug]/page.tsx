import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/article";
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
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
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
