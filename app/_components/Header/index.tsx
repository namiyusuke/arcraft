import styles from "./index.module.css";
import Link from "next/link";
import Menu from "@/app/_components/menu";
import { getCategoryList } from "@/app/_libs/microcms";
import { useFilterStore } from "@/app/_stores/filterStore";
export default async function Header() {
  const { contents: categories } = await getCategoryList();
  console.log(categories);
  return (
    <header className={styles.header}>
      <Link href="/">
        {/* <Image className={styles.logo} src="/logo.svg" alt="Logo" width={348} height={133} /> */}
      </Link>
      {/* <Menu categories={categories} /> */}
    </header>
  );
}
