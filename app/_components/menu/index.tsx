"use client";
import { usePathname } from "next/navigation";
import styles from "./index.module.css";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import { useModel3DStore } from "../../store/model3dStore";
import cx from "classnames";
import { unstable_ViewTransition as ViewTransition } from "react";
import gsap from "gsap";
import { useDrawer } from "@/app/fooks/useDrawer";
interface MenuProps {
  categories?: Array<{ id: string; name: string }>;
  selectedCategories?: string[];
  onCategoryChange?: (categoryIds: string[]) => void;
}
const menuItems = [
  { label: "top", path: "/", current: "" },
  { label: "techlog", path: "/techlog", current: "techlog" },
  { label: "lifelog", path: "/life", current: "life" },
  { label: "about", path: "/about", current: "about" },
  // { label: "privacy", path: "/privacy", name: "privacy" },
];
export default function Menu({ categories = [], selectedCategories = [], onCategoryChange }: MenuProps) {
  const { drawerref: navDrawerRef, isOpen, handleClick, handleClose } = useDrawer();
  const {
    drawerref: filterDrawerRef,
    isOpen: isFilterDrawerOpen,
    handleClick: handleFilterDrawerClick,
    handleClose: handleFilterDrawerClose,
  } = useDrawer();
  const { isScreenClicked, setIsScreenClicked, isDumbbleClicked, setIsDumbbleClicked } = useModel3DStore();
  // const menuWrapRef = useRef<HTMLDivElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const firstPath = pathname.split("/")[1];

  // const handleClick = () => {
  //   setIsOpen(true);
  //   if (menuWrapRef.current) {
  //     menuWrapRef.current.style.visibility = "visible";
  //     gsap.to(menuWrapRef.current, {
  //       clipPath: "polygon(0px 0%, 100% 0%, 100% 100%, 0px 100%)",
  //       duration: 0.8,
  //       ease: "power4.out",
  //     });
  //   }
  // };

  // const handleClose = () => {
  //   if (menuWrapRef.current) {
  //     gsap.to(menuWrapRef.current, {
  //       clipPath: "polygon(0px 100%, 100% 100%, 100% 100%, 0px 100%)",
  //       duration: 0.6,
  //       ease: "power1.out",
  //       onComplete: () => {
  //         setIsOpen(false);
  //         if (menuWrapRef.current) menuWrapRef.current.style.visibility = "hidden";
  //         if (menuWrapRef.current) menuWrapRef.current.style.clipPath = "polygon(0px 0%, 100% 0%, 100% 0%, 0px 0%)";
  //       },
  //     });
  //   }
  // };
  const handleFilterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO(human): フィルタードロップダウンのアニメーション制御ロジックを実装
    if (!isFilterOpen) {
      handleFilterDrawerClick();
      setIsFilterOpen(!isFilterOpen);
    }
    if (isFilterOpen) {
      handleFilterDrawerClose();
      setIsFilterOpen(!isFilterOpen);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    console.log("カテゴリ変更:", categoryId);
    console.log("現在の選択:", selectedCategories);

    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    console.log("更新後の選択:", updatedCategories);
    onCategoryChange?.(updatedCategories);
  };

  const handleResetFilter = () => {
    console.log("リセットボタンクリック");
    onCategoryChange?.([]);
  };

  return (
    <ViewTransition>
      <div className="">
        <div className="logo">
          <Link href="/">
            {firstPath === "life" || firstPath === "privacy" ? (
              <Image src="/logo-footer.png" alt="nami logo" width={120} height={24} />
            ) : (
              <Image src="/logo.png" alt="nami logo" width={120} height={24} />
            )}
          </Link>
        </div>
      </div>
      <button className={styles.navbutton} onClick={handleClick}>
        menu
      </button>
      <nav className={cx(styles.nav, isOpen && "is-active")}>
        <div ref={navDrawerRef} className={cx(styles.navwrap, "menu-item-wrap")}>
          <span onClick={handleClose} className={styles.closebtn}></span>
          <div className={styles.navinner}>
            <ul className={cx(styles.items, "menu-item")}>
              {menuItems.map((item) => (
                <li
                  onClick={() => {
                    if (item.current === "") {
                      setIsScreenClicked(false);
                      setIsDumbbleClicked(false);
                    }
                    // if (item.current === "" && isDumbbleClicked) {

                    // }
                  }}
                  key={item.path}
                  className={firstPath == item.current ? "is-current" : ""}
                >
                  <Link href={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {firstPath === "techlog" ? (
          <div className={styles.filterContainer}>
            <p className={styles.filter}>
              <a className={styles.filterButton} onClick={handleFilterClick}>
                <span className="u-wbr">filter</span>
              </a>
            </p>
            <div className={isFilterOpen ? styles.filterDropdownOpen + " " + styles.filterMenu : styles.filterMenu}>
              <div ref={filterDrawerRef} className={cx(styles.filterDropdown, "menu-item-wrap filter-item-wrap")}>
                <div className={styles.filterHeader}>
                  <h3>カテゴリーで絞り込み</h3>
                  <button className={styles.resetButton} onClick={handleResetFilter} type="button">
                    リセット
                  </button>
                </div>
                <div className={styles.categoryList}>
                  {categories.map((category) => {
                    const isChecked = selectedCategories.includes(category.id);
                    console.log(`カテゴリ ${category.name}: ${isChecked ? "チェック済み" : "未チェック"}`);
                    return (
                      <label key={category.id} className={styles.categoryItem}>
                        <input
                          type="checkbox"
                          name="category"
                          checked={isChecked}
                          onChange={() => handleCategoryChange(category.id)}
                          className={styles.categoryCheckbox}
                        />
                        <span className={styles.categoryName}>{category.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </ViewTransition>
  );
}
