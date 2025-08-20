import { gettechlogList, getCategoryList } from "@/app/_libs/microcms";
import TechlogClient from "./TechlogClient";
import ParallaxImages, { ParallaxImageItem } from "@/app/_components/ParallaxImages";
export default async function TechlogPage() {
  const [newsData, categoriesData] = await Promise.all([gettechlogList({}), getCategoryList()]);
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
      <ParallaxImages
        images={parallaxImages}
        containerClassName="parallax-container"
        triggerStart="top top"
        triggerEnd="bottom bottom"
      />
      <TechlogClient
        initialNews={newsData.contents}
        initialCategories={categoriesData.contents}
        totalCount={newsData.totalCount}
      />
    </>
  );
}
