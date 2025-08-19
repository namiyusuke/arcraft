"use client";
import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";
import Footer from "../_components/Footer";
import Image from "next/image";
import { useScrollObserver } from "@/app/fooks/useScrollObserver";
type Props = {
  children: React.ReactNode;
};

export default function NewsLayout({ children }: Props) {
  const { ref } = useScrollObserver("is-observer");
  return (
    <>
      <div className="g-bg-purple">
        <Image className="hero__lifelog-coffee" width={1092} height={602} alt="dumbbell" src="/coffee_new.png" />
        <Image className="hero__lifelog-cushion" width={1092} height={602} alt="dumbbell" src="/cushion_new.png" />
        <Image className="hero__lifelog-dumbbell" width={1092} height={602} alt="dumbbell" src="/dumbbell_new.png" />
        <Hero title="lifelog" className="text__life" />
        <Sheet>{children}</Sheet>
        <div ref={ref} className="js-observer">
          <Footer />
        </div>
      </div>
    </>
  );
}
