import { getLifeList } from "@/app/_libs/microcms";
import LifeList from "@/app/_components/LifeList";
import Pagination from "@/app/_components/Pagination";
import Menu from "@/app/_components/menu";
import Image from "next/image";
import DumbbellModel from "@/app/_components/DumbbellModel";
import styles from "./page.module.css";
import ParallaxImages, { ParallaxImageItem } from "@/app/_components/ParallaxImages";
import ScrollToTopButton from "../_components/ScrollToTopButton";
export default async function Life() {
  const { contents: life, totalCount } = await getLifeList({});
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
    <div>
      <ScrollToTopButton />
      <Menu />
      <ParallaxImages
        images={parallaxImages}
        containerClassName="parallax-container"
        triggerStart="top top"
        triggerEnd="bottom bottom"
      />
      {/* <div className="model__dumbbellModel">
        <DumbbellModel />
      </div> */}
      <LifeList life={life} />
      <Pagination totalCount={totalCount} basePath="/life" />
    </div>
  );
}
