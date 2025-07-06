import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";

type Props = {
  children: React.ReactNode;
};

export default function NewsLayout({ children }: Props) {
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
