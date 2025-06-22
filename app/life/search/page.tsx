import { gettechlogList } from "@/app/_libs/microcms";
import SearchField from "@/app/_components/SearchField";
import techlogList from "@/app/_components/techlogList";

type Props = {
  searchParams: {
    q: string;
  };
};
export default async function NewsSearch({ searchParams }: Props) {
  const { contents: news } = await get({
    limit: 10,
    q: searchParams.q,
  });
  return (
    <>
      <SearchField />
      <techlogList news={news} />
    </>
  );
}
