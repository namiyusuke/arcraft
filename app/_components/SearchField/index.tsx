"use client";
import styles from "./index.module.css";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
function SearchFieldComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
    if (q) {
      const params = new URLSearchParams();
      params.set("q", q.value.trim());
      router.push(`/techlog/search?${params.toString()}`);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Image className={styles.searchIcon} src="/search.svg" alt="検索" width={16} height={16} />
        <label htmlFor="keyword">
          <input
            defaultValue={searchParams.get("q") || ""}
            className={styles.searchInput}
            autoComplete="off"
            type="text"
            id="keyword"
            name="q"
            placeholder="キーワードを入力"
          />
        </label>
      </form>
    </div>
  );
}
export default function SearchField() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchFieldComponent />
    </Suspense>
  );
}
