import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/article";
import Menu from "@/app/_components/menu";
import { notFound } from "next/navigation";
import { Metadata } from "next";
type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    dk?: string;
  }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const data = await getNewsDetail(resolvedParams.slug, {
    draftKey: resolvedSearchParams.dk,
  }).catch(() => {
    notFound();
  });

  // TODO(human): OGP画像のデフォルトURLを設定
  const ogImageUrl = data.thumbnail?.url || "https://yourdomain.com/default-ogp.png";

  return {
    title: data.title,
    openGraph: {
      title: data.title,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      images: [ogImageUrl],
    },
  };
}

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
