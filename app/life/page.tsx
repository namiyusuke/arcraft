import { getLifeList } from "@/app/_libs/microcms";
import LifeList from "@/app/_components/LifeList";
import Pagination from "@/app/_components/Pagination";

export default async function Life() {
  const { contents: life, totalCount } = await getLifeList({});
  return (
    <div>
      <LifeList life={life} />
      <Pagination totalCount={totalCount} basePath="/life" />
    </div>
  );
}
