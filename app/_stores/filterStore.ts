// @/app/_stores/filterStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category, News } from "@/app/_libs/microcms";
import { getCategoryList } from "@/app/_libs/microcms";

interface FilterState {
  // データ
  categories: Category[];
  selectedCategories: string[];
  currentPage: number;

  // アクション
  setCategories: (categories: Category[]) => void;
  setSelectedCategories: (categoryIds: string[]) => void;
  addCategory: (categoryId: string) => void;
  removeCategory: (categoryId: string) => void;
  toggleCategory: (categoryId: string) => void;
  clearFilters: () => void;
  setCurrentPage: (page: number) => void;
  resetToCategory: (categoryId: string) => void;

  // セレクター（計算されたプロパティ）
  getSelectedCategoryNames: () => string[];
  isFiltered: () => boolean;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      // 初期状態
      categories: [],
      selectedCategories: [],
      currentPage: 1,

      // アクション
      setCategories: (categories) => set({ categories }),

      setSelectedCategories: (categoryIds) => set({ selectedCategories: categoryIds, currentPage: 1 }),

      addCategory: (categoryId) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(categoryId)
            ? state.selectedCategories
            : [...state.selectedCategories, categoryId],
          currentPage: 1,
        })),

      removeCategory: (categoryId) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.filter((id) => id !== categoryId),
          currentPage: 1,
        })),

      toggleCategory: (categoryId) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(categoryId)
            ? state.selectedCategories.filter((id) => id !== categoryId)
            : [...state.selectedCategories, categoryId],
          currentPage: 1,
        })),

      clearFilters: () => set({ selectedCategories: [], currentPage: 1 }),

      setCurrentPage: (page) => set({ currentPage: page }),

      resetToCategory: (categoryId) => set({ selectedCategories: [categoryId], currentPage: 1 }),

      // セレクター
      getSelectedCategoryNames: () => {
        const { categories, selectedCategories } = get();
        return selectedCategories
          .map((id) => categories.find((cat) => cat.id === id)?.name)
          .filter(Boolean) as string[];
      },

      isFiltered: () => {
        const { selectedCategories } = get();
        return selectedCategories.length > 0;
      },
    }),
    {
      name: "filter-store", // localStorage のキー名
      partialize: (state) => ({
        selectedCategories: state.selectedCategories,
        currentPage: state.currentPage,
      }), // 永続化する項目を限定
    }
  )
);
