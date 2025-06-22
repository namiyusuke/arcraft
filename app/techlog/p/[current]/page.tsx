import { gettechlogList, getCategoryDetail } from "@/app/_libs/microcms";
import techlogList from "@/app/_components/techlogList";
import { notFound } from "next/navigation";
import { NEWS_LIST_LIMIT } from "@/app/constants";
import Pagination from "@/app/_components/Pagination";
type Props = {
  params: {
    current: string;
    id: string;
  };
};
export default async function News({ params }: Props) {
  const category = await getCategoryDetail(params.id).catch((err) => {
    notFound();
  });
  const current = parseInt(params.current, 10);
  if (isNaN(current) || current < 1) {
    notFound();
  }
  const { contents: news, totalCount } = await gettechlogList({
    filters: `category[equals]${category.id}`,
    limit: NEWS_LIST_LIMIT,
    offset: (Number(current) - 1) * NEWS_LIST_LIMIT,
  });
  return (
    <>
      <techlogList news={news} />
      <Pagination totalCount={totalCount} current={current} basePath={`/news/category/${category.id}`} />
    </>
  );
}
