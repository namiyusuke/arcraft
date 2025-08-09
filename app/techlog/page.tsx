import { gettechlogList, getCategoryList } from "@/app/_libs/microcms";
import TechlogClient from "./TechlogClient";

export default async function TechlogPage() {
  const [newsData, categoriesData] = await Promise.all([gettechlogList({}), getCategoryList()]);

  return (
    <>
      <TechlogClient
        initialNews={newsData.contents}
        initialCategories={categoriesData.contents}
        totalCount={newsData.totalCount}
      />
    </>
  );
}
