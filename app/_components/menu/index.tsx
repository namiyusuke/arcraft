"use client";

import styles from "./index.module.css";
import Link from "next/link";
import { useState } from "react";
import cx from "classnames";

interface MenuProps {
  categories?: Array<{ id: string; name: string }>;
  selectedCategories?: string[];
  onCategoryChange?: (categoryIds: string[]) => void;
}

export default function Menu({ categories = [], selectedCategories = [], onCategoryChange }: MenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
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
    <div>
      <nav className={cx(styles.nav, isOpen && styles.open)}>
        <ul className={styles.items}>
          <li>
            <Link href="/techlog">techlog</Link>
          </li>
          <li>
            <Link href="/life">lifelog</Link>
          </li>
          <li>
            <Link href="/about">about</Link>
          </li>
          <li className={styles.filterContainer}>
            <p className={styles.filter}>
              <a className={styles.filterButton} onClick={handleFilterClick}>
                filter {selectedCategories.length > 0 && `(${selectedCategories.length})`}
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
          </li>
        </ul>
      </nav>
    </div>
  );
}
