import { getLifeList } from "@/app/_libs/microcms";
import LifeList from "@/app/_components/LifeList";
import Pagination from "@/app/_components/Pagination";
import Menu from "@/app/_components/menu";
import Image from "next/image";
import DumbbellModel from "@/app/_components/DumbbellModel";
import styles from "./page.module.css";
import ScrollToTopButton from "../_components/ScrollToTopButton";
export default async function Life() {
  const { contents: life, totalCount } = await getLifeList({});
  return (
    <div>
      <ScrollToTopButton />
      <Menu />

      {/* <div className="model__dumbbellModel">
        <DumbbellModel />
      </div> */}
      <LifeList life={life} />
      <Pagination totalCount={totalCount} basePath="/life" />
    </div>
  );
}
