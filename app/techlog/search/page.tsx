import { gettechlogList } from "@/app/_libs/microcms";
import SearchField from "@/app/_components/SearchField";
import TechlogList from "@/app/_components/techlogList";

type Props = {
  searchParams: Promise<{
    q: string;
  }>;
};
export default async function NewsSearch({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const { contents: news } = await gettechlogList({
    limit: 10,
    q: resolvedSearchParams.q,
  });
  return (
    <>
      <SearchField />
      <TechlogList news={news} />
    </>
  );
}
