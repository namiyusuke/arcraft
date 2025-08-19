"use client";
import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";
import Footer from "../_components/Footer";
import { useScrollObserver } from "@/app/fooks/useScrollObserver";
type Props = {
  children: React.ReactNode;
};

export default function NewsLayout({ children }: Props) {
  const { ref } = useScrollObserver("is-observer");
  return (
    <>
      <div className="g-bg-about">
        <Hero title="about" className="text__about" />
        <Sheet>{children}</Sheet>
        <div ref={ref} className="js-observer">
          <Footer />
        </div>
      </div>
    </>
  );
}
