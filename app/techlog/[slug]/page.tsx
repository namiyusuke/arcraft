import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/article";
import Link from "next/link";
import Menu from "@/app/_components/menu";
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
      <Menu />

      <Article data={data} />
    </>
  );
}
