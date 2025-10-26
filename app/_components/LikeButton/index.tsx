"use client";
import { useLikes } from "@/app/_hooks/useLikes";
import styles from "./index.module.css";
export default function LikeButton(props: { articleId: string }) {
  const { count, isLiked, toggleLike } = useLikes(props.articleId);
  return (
    <>
      <div className="buttonWrapper">
        <button className={`${styles.button} ${isLiked ? styles.liked : ""}`} onClick={toggleLike}>
          {isLiked ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#f65b5bff" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8.00001L10.7 6.80001C9.83043 5.99169 8.68719 5.54239 7.49998 5.54239C6.31276 5.54239 5.16952 5.99169 4.29998 6.80001C3.49166 7.66955 3.04236 8.81279 3.04236 10C3.04236 11.1872 3.49166 12.3305 4.29998 13.2L12 21L19.7 13.2C20.5083 12.3305 20.9576 11.1872 20.9576 10C20.9576 8.81279 20.5083 7.66955 19.7 6.80001C18.8304 5.99169 17.6872 5.54239 16.5 5.54239C15.3128 5.54239 14.1695 5.99169 13.3 6.80001L12 8.00001Z"></path>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8.00001L10.7 6.80001C9.83043 5.99169 8.68719 5.54239 7.49998 5.54239C6.31276 5.54239 5.16952 5.99169 4.29998 6.80001C3.49166 7.66955 3.04236 8.81279 3.04236 10C3.04236 11.1872 3.49166 12.3305 4.29998 13.2L12 21L19.7 13.2C20.5083 12.3305 20.9576 11.1872 20.9576 10C20.9576 8.81279 20.5083 7.66955 19.7 6.80001C18.8304 5.99169 17.6872 5.54239 16.5 5.54239C15.3128 5.54239 14.1695 5.99169 13.3 6.80001L12 8.00001Z"></path>
            </svg>
          )}
        </button>
        <span className={styles.number}>{count}</span>
      </div>
    </>
  );
}
