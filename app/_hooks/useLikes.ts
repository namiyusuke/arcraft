import useSWR from "swr";
import { useCallback } from "react";
import { fetcher } from "../_libs/utils";

export const useLikes = (articleId: string) => {
  // TODO(human): SWRのオプション設定を最適化して、不要なデータベースアクセスを削減してください
  // ヒント: refreshInterval, revalidateOnFocus, revalidateOnReconnect, fallbackData, dedupingIntervalを検討
  const { data, mutate } = useSWR<{ count: number; isLiked: boolean }>(`/api/articles/${articleId}/likes`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData: { count: 0, isLiked: false },
    dedupingInterval: 60000,
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
