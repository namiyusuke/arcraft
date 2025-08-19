"use client";
import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";
import Footer from "../_components/Footer";
import ParallaxImages, { ParallaxImageItem } from "@/app/_components/ParallaxImages";
import { useScrollObserver } from "@/app/fooks/useScrollObserver";
type Props = {
  children: React.ReactNode;
};

export default function NewsLayout({ children }: Props) {
  const { ref } = useScrollObserver("is-observer");

  const parallaxImages: ParallaxImageItem[] = [
    {
      src: "/coffee_new.png",
      alt: "coffee",
      width: 1092,
      height: 602,
      speed: -1.3, // 背景的な役割で遅く動く
      className: "hero__lifelog-coffee",
    },
    {
      src: "/cushion_new.png",
      alt: "cushion",
      width: 1092,
      height: 602,
      speed: -1.4, // 中間の速度
      className: "hero__lifelog-cushion",
    },
    {
      src: "/dumbbell_new.png",
      alt: "dumbbell",
      width: 1092,
      height: 602,
      speed: -1, // 前景的な役割で速く動く
      className: "hero__lifelog-dumbbell",
    },
  ];

  return (
    <>
      <div className="g-bg-purple">
        <ParallaxImages
          images={parallaxImages}
          containerClassName="parallax-container"
          triggerStart="top top"
          triggerEnd="bottom bottom"
        />
        <Hero title="lifelog" className="text__life" />
        <Sheet>{children}</Sheet>
        <div ref={ref} className="js-observer">
          <Footer />
        </div>
      </div>
    </>
  );
}
