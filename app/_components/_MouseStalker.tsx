"use client";
import { useEffect, useState } from "react";
import styles from "./MouseStalker.module.css";

export default function MouseStalker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // カスタムカーソルが有効な時のみマウスストーカーを表示
    const handleCustomCursorChange = () => {
      const hasCustomCursor = document.body.classList.contains("custom-cursor");
      setIsVisible(hasCustomCursor);
    };

    // ホバー状態の監視
    const handleHoverChange = () => {
      const mouseStalker = document.querySelector("[data-mouse-stalker]");
      const isHovered = mouseStalker?.classList.contains("is-hover") || false;
      setIsHovered(isHovered);
    };

    // MutationObserverでクラス変更を監視
    const observer = new MutationObserver(() => {
      handleCustomCursorChange();
      handleHoverChange();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    observer.observe(document, { subtree: true, attributes: true, attributeFilter: ["class"] });

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      data-mouse-stalker
      className={`g-mouseStalker ${isVisible ? styles.visible : ""} ${isHovered ? styles.isHover : ""}`}
    >
      <div
        className={styles.mouseStalker__cursor}
        style={{
          transform: `translate(${position.x - 50}px, ${position.y - 50}px)`,
        }}
      ></div>
      <div
        className={styles.mouseStalker__follower}
        style={{
          transform: `translate(${position.x - 50}px, ${position.y - 50}px)`,
        }}
      ></div>
    </div>
  );
}
