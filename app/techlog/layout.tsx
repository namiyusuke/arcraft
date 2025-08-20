"use client";
import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";
import Footer from "../_components/Footer";
import { useScrollObserver } from "@/app/fooks/useScrollObserver";
import ParallaxImages, { ParallaxImageItem } from "@/app/_components/ParallaxImages";
type Props = {
  children: React.ReactNode;
};

export default function NewsLayout({ children }: Props) {
  const { ref } = useScrollObserver("is-observer");
  const parallaxImages: ParallaxImageItem[] = [
    {
      src: "/book_new.png",
      alt: "book",
      width: 176,
      height: 155,
      speed: -1.3, // 背景的な役割で遅く動く
      className: "hero__techlog-book",
    },
    {
      src: "/book01_new.png",
      alt: "book01",
      width: 1092,
      height: 602,
      speed: -1.4, // 中間の速度
      className: "hero__techlog-book01",
    },
    {
      src: "/keybord_new.png",
      alt: "keybord",
      width: 1092,
      height: 602,
      speed: -1, // 前景的な役割で速く動く
      className: "hero__techlog-keybord",
    },
    {
      src: "/mouth_new.png",
      alt: "mouth",
      width: 1092,
      height: 602,
      speed: -1, // 前景的な役割で速く動く
      className: "hero__techlog-mouth",
    },
  ];
  return (
    <>
      <div className="g-bg-dark">
        <ParallaxImages
          images={parallaxImages}
          containerClassName="parallax-container"
          triggerStart="top top"
          triggerEnd="bottom bottom"
        />
        <Hero title="techlog" />
        <Sheet>{children}</Sheet>
        <div ref={ref} className="js-observer">
          <Footer />
        </div>
      </div>
    </>
  );
}
