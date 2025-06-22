import { gettechlogList, getCategoryDetail } from "@/app/_libs/microcms";
import Pagination from "@/app/_components/Pagination";
import TechlogList from "@/app/_components/techlogList";
import { notFound } from "next/navigation";
type Props = {
  params: {
    id: string;
  };
};
export default async function News({ params }: Props) {
  const category = await getCategoryDetail(params.id).catch((err) => {
    notFound();
  });
  const { contents: techlog, totalCount } = await gettechlogList({
    filters: `category[equals]${category.id}`,
  });
  return (
    <>
      <h1>{category.name}の記事一覧</h1>
      <TechlogList news={techlog} />
      <Pagination totalCount={totalCount} basePath={`/techlog/category/${category.id}`} />
    </>
  );
}
