"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

interface LenisProviderProps {
  children: React.ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    // Lenisインスタンスを作成（カスタム設定付き）
    const lenis = new Lenis({
      // 基本設定
      duration: 1.2, // スクロールアニメーションの長さ
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // イージング関数
      orientation: "vertical", // スクロール方向
      gestureOrientation: "vertical", // ジェスチャー方向
      smoothWheel: true, // マウスホイールのスムーズ化
      touchMultiplier: 2, // タッチ時のスクロール速度倍率

      // 追加のカスタマイズ
      wheelMultiplier: 1, // マウスホイールの速度倍率
      infinite: false, // 無限スクロール

      // View Transitions対応
      autoResize: true, // 自動リサイズ検知
    });

    lenisRef.current = lenis;

    // グローバルに公開（他のコンポーネントから使用可能に）
    (window as any).lenis = lenis;

    // アニメーションループ
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // クリーンアップ
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // ページ遷移時の処理（View Transitions対応）
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // View Transition対応: ページ遷移時にスクロール位置をリセット
    const handlePageTransition = () => {
      // Lenisを一時停止
      lenis.stop();

      // スクロール位置を即座にトップに
      lenis.scrollTo(0, {
        immediate: true,
        force: true, // 強制的にスクロール
        lock: true, // スクロール中は他の操作をロック
      });

      // DOMの更新を待ってから再開
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lenis.resize(); // サイズを再計算
          lenis.start(); // Lenisを再開
        });
      });
    };

    // View Transitionが実行中かチェック
    if ("startViewTransition" in document) {
      // ViewTransitionの検知
      const checkTransition = () => {
        const animations = document.getAnimations();
        const viewTransition = animations.find((animation) => animation.constructor.name === "ViewTransition");

        if (viewTransition) {
          viewTransition.finished.then(handlePageTransition);
        } else {
          handlePageTransition();
        }
      };

      // 少し遅延を入れて実行（View Transitionの開始を待つ）
      setTimeout(checkTransition, 0);
    } else {
      handlePageTransition();
    }
  }, [pathname]);

  // スクロール関連のイベントを監視（デバッグ用）
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // スクロールイベント
    const handleScroll = (e: any) => {
      // console.log("Lenis scroll:", e.scroll, "Progress:", e.progress);
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, []);

  // ウィンドウリサイズ対応
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{children}</>;
};

// 便利なカスタムフック（オプション）
export const useLenis = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Lenisインスタンスが利用可能になるまで待つ
    const checkLenis = () => {
      const instance = (window as any).lenis;
      if (instance) {
        setLenis(instance);
      } else {
        requestAnimationFrame(checkLenis);
      }
    };

    checkLenis();
  }, []);

  return lenis;
};

// 使用例
// const lenis = useLenis();
// lenis?.scrollTo("#section", { duration: 2 });
