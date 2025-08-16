"use client";

import { useState } from "react";
import TechlogList from "@/app/_components/techlogList";
import Pagination from "@/app/_components/Pagination";
import Menu from "@/app/_components/menu";
import type { News, Category } from "@/app/_libs/microcms";
import ScrollToTopButton from "../_components/ScrollToTopButton";
interface TechlogClientProps {
  initialNews: News[];
  initialCategories: Category[];
  totalCount: number;
}

export default function TechlogClient({ initialNews, initialCategories, totalCount }: TechlogClientProps) {
  const [news] = useState<News[]>(initialNews);
  const [categories] = useState<Category[]>(initialCategories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
  };

  return (
    <div>
      <ScrollToTopButton />
      <Menu categories={categories} selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
      <TechlogList news={news} selectedCategories={selectedCategories} />
      <Pagination totalCount={totalCount} basePath="/techlog" />
    </div>
  );
}
