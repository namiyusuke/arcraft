import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";
import CategoryList from "@/app/_components/CategoryList";
import SearchField from "@/app/_components/SearchField";
type Props = {
  children: React.ReactNode;
  title: string;
};

export default function NewsLayout({ children, title }: Props) {
  return (
    <>
      <div className="g-bg-dark">
        <Hero title="techlog" />
        {/* <div className="g-container-category">
          <CategoryList />
          <SearchField />
        </div> */}
        <Sheet>{children}</Sheet>
      </div>
    </>
  );
}
