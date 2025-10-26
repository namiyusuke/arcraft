import useSWR from "swr";
import { useCallback } from "react"; // ← これを追加
import { fetcher } from "../_libs/utils";

export const useLikes = (articleId: string) => {
  const { data, mutate } = useSWR<{ count: number; isLiked: boolean }>(`/api/articles/${articleId}/likes`, fetcher, {
    refreshInterval: 5000,
  });

  const toggleLike = useCallback(async () => {
    if (!data) return;

    if (data.isLiked) {
      await fetch(`/api/articles/${articleId}/likes`, {
        method: "DELETE",
      });
      mutate(
        {
          count: data.count - 1,
          isLiked: false,
        },
        true
      );
    } else {
      await fetch(`/api/articles/${articleId}/likes`, {
        method: "POST",
      });
      mutate(
        {
          count: data.count + 1,
          isLiked: true,
        },
        true
      );
    }
  }, [data, articleId, mutate]);

  return {
    count: data?.count || 0,
    isLiked: data?.isLiked || false,
    toggleLike,
  };
};
