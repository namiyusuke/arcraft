"use client";
import { usePathname } from "next/navigation";
import styles from "./index.module.css";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import cx from "classnames";
import { unstable_ViewTransition as ViewTransition } from "react";
interface MenuProps {
  categories?: Array<{ id: string; name: string }>;
  selectedCategories?: string[];
  onCategoryChange?: (categoryIds: string[]) => void;
}
const menuItems = [
  { label: "top", path: "/" },
  { label: "techlog", path: "/techlog" },
  { label: "lifelog", path: "/life" },
  { label: "about", path: "/about" },
];
export default function Menu({ categories = [], selectedCategories = [], onCategoryChange }: MenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const firstPath = pathname.split("/")[1];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    console.log(isOpen);
  };

  const handleFilterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFilterOpen(!isFilterOpen);
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
      <button className={styles.navbutton} onClick={handleClick}>
        menu
      </button>
      <nav className={cx(styles.nav, isOpen && "is-active")}>
        <div className={cx(styles.navwrap, "menu-item-wrap")}>
          <span onClick={handleClose} className={styles.closebtn}></span>
          <div className={styles.navinner}>
            <ul className={cx(styles.items, "menu-item")}>
              {menuItems.map((item) => (
                <li key={item.path} className={firstPath == item.label ? "is-current" : ""}>
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
              <div className={styles.filterDropdown}>
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
