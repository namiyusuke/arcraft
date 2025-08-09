import { getLifeDetail } from "@/app/_libs/microcms";
import ArticleLife from "@/app/_components/articleLife";
import Link from "next/link";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import Menu from "@/app/_components/menu";
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
  const data = await getLifeDetail(resolvedParams.slug, {
    draftKey: resolvedSearchParams.dk,
  }).catch(() => {
    notFound();
  });
  return (
    <>
      <Menu />
      <ArticleLife data={data} />
    </>
  );
}
