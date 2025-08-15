import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";
import Footer from "../_components/Footer";

type Props = {
  children: React.ReactNode;
};

export default function NewsLayout({ children }: Props) {
  return (
    <>
      <div className="g-bg-privacy">
        {/* <Hero title="privacy policy" className="text__about" /> */}
        <Sheet>{children}</Sheet>
      </div>
    </>
  );
}
