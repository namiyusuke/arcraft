import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";
import SearchField from "@/app/_components/SearchField";
import Footer from "../_components/Footer";
type Props = {
  children: React.ReactNode;
};

export default function NewsLayout({ children }: Props) {
  return (
    <>
      <div className="g-bg-purple">
        <Hero title="lifelog" className="text__life" />
        <Sheet>{children}</Sheet>
        <Footer />
      </div>
    </>
  );
}
