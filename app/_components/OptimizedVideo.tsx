"use client";

import { useEffect, useRef, useState } from "react";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

export default function OptimizedVideo({ src, className, muted = true, loop = true, playsInline = true }: OptimizedVideoProps) {
  // console.log("OptimizedVideo component rendering with src:", src);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 状態変化をログ出力
  // useEffect(() => {
  //   console.log("State changed:", { isVisible, isLoaded, isMobile });
  // }, [isVisible, isLoaded, isMobile]);

  useEffect(() => {
    console.log("Mobile detection useEffect triggered");
    // モバイルデバイスの判定
    const checkIsMobile = () => {
      return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    const mobile = checkIsMobile();
    console.log("Mobile detection result:", mobile, "window.innerWidth:", window.innerWidth);
    setIsMobile(mobile);

    // デスクトップでは最初から読み込み完了状態にする
    if (!mobile) {
      console.log("Desktop detected, setting isLoaded to true");
      setIsLoaded(true);
    } else {
      console.log("Mobile detected, keeping isLoaded as false");
    }

    const handleResize = () => {
      const newMobile = checkIsMobile();
      setIsMobile(newMobile);
      if (!newMobile) {
        setIsLoaded(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Setting up Intersection Observer, videoRef.current:", !!videoRef.current);
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Intersection Observer triggered, entries:", entries.length);
        entries.forEach((entry) => {
          console.log("Entry:", {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            target: entry.target.tagName,
          });
          if (entry.isIntersecting) {
            console.log("Video is visible, setting isVisible to true");
            setIsVisible(true);
            // モバイルでは表示されてから動画を読み込む
            if (isMobile && !isLoaded) {
              console.log("Mobile detected, setting isLoaded to true");
              setIsLoaded(true);
            }
          } else {
            console.log("Video is not visible, setting isVisible to false");
            setIsVisible(false);
            // 表示されていない時は再生を停止
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.1, // より早く検出するため閾値を下げる
        rootMargin: "100px", // より早く読み込み開始
      }
    );

    // console.log('Starting to observe video element');
    observer.observe(videoRef.current);

    return () => {
      console.log("Disconnecting Intersection Observer");
      observer.disconnect();
    };
  }, [isMobile, isLoaded]);

  useEffect(() => {
    if (!videoRef.current || !isVisible) return;

    const video = videoRef.current;

    // TODO(human) - 動画再生の制御ロジックを実装してください
    // Context: スマートフォンでのパフォーマンス最適化のため、表示状態に応じた動画制御が必要です
    // Your Task: handleVideoPlayback 関数内で、isMobile と isLoaded の状態に基づいて動画再生を制御してください
    // Guidance: モバイルでは遅延読み込み、デスクトップでは即座に再生。エラーハンドリングも考慮してください

    const handleVideoPlayback = async () => {
      // console.log("handleVideoPlayback called:", { isMobile, isLoaded, isVisible, readyState: video.readyState, src: video.src });

      // モバイルでは読み込み完了後に再生開始
      if (isMobile && !isLoaded) {
        console.log("Skipping playback: mobile and not loaded");
        return;
      }

      // srcが設定されていない場合は再生しない
      if (!video.src) {
        // console.log("Skipping playback: no src");
        return;
      }

      // preload="none"の場合、手動で読み込みを開始する必要がある
      if (video.readyState === 0) {
        // console.log("Video not loaded yet, calling load()");
        video.load();
      }

      // 動画の準備状態を確認
      if (video.readyState >= 2) {
        // HAVE_CURRENT_DATA 以上
        try {
          console.log("Playing video immediately");
          await video.play();
        } catch (error) {
          console.error("Error playing video:", error);
        }
      } else {
        console.log("Waiting for canplay event");
        // データが準備できていない場合は準備完了を待つ
        const onCanPlay = async () => {
          try {
            // console.log("canplay event fired, playing video");
            await video.play();
          } catch (error) {
            console.error("Error playing video:", error);
          }
          video.removeEventListener("canplay", onCanPlay);
        };

        // 既存のイベントリスナーを削除して重複を防ぐ
        video.removeEventListener("canplay", onCanPlay);
        video.addEventListener("canplay", onCanPlay);
      }
    };

    handleVideoPlayback();
  }, [isVisible, isLoaded, isMobile]);

  // デスクトップでは初期状態で読み込み、モバイルでは遅延読み込み
  const shouldLoadVideo = !isMobile || isLoaded;

  // console.log("Render decision:", { shouldLoadVideo, isMobile, isLoaded, src: shouldLoadVideo ? src : "undefined" });

  return (
    <video
      ref={videoRef}
      src={shouldLoadVideo ? src : undefined}
      className={className}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={isMobile ? "none" : "metadata"}
      style={{
        opacity: isVisible ? 1 : 0.8,
        transition: "opacity 0.3s ease",
      }}
      // onLoadedMetadata={() => console.log("Video metadata loaded for:", src)}
      onCanPlay={() => console.log("Video can play:", src)}
      onError={(e) => console.error("Video error:", src, e)}
    />
  );
}
