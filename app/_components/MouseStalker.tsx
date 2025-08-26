"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import styles from "./MouseStalker.module.css";

// TypeScript型定義
interface Position {
  x: number;
  y: number;
}

interface MarqueeConfig {
  hoverOutDelay: number;
  followDuration: number;
  speedMultiplier: number;
}

// Three.js用のマーキーエフェクト管理
interface ThreeMarqueeManager {
  showMarquee: (text: string) => void;
  hideMarquee: () => void;
}

// グローバルマーキーマネージャー
let globalMarqueeManager: ThreeMarqueeManager | null = null;

export const useThreeMarquee = () => globalMarqueeManager;

export default function MouseStalker() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [marqueeStatus, setMarqueeStatus] = useState<'active' | 'not-active'>('not-active');
  const [marqueeText, setMarqueeText] = useState('');
  
  // Refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const marqueeTextRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeElementRef = useRef<Element | null>(null);
  const lastPositionRef = useRef<Position>({ x: 0, y: 0 });
  const quickToRef = useRef<{ x: (value: number) => void; y: (value: number) => void } | null>(null);
  
  // マーキー設定
  const marqueeConfig: MarqueeConfig = {
    hoverOutDelay: 0.4,
    followDuration: 0.4,
    speedMultiplier: 5
  };

  // マーキーエフェクトのヘルパー関数
  const playMarqueeFor = useCallback((element: Element) => {
    if (!element) return;
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    const text = element.getAttribute('data-cursor-marquee-text') || '';
    const duration = (text.length || 1) / marqueeConfig.speedMultiplier;
    
    setMarqueeText(text);
    setMarqueeStatus('active');
    activeElementRef.current = element;
    
    // CSSアニメーションの設定
    if (marqueeTextRef.current) {
      const textElements = marqueeTextRef.current.querySelectorAll('[data-cursor-marquee-text-target]');
      textElements.forEach((textEl) => {
        if (textEl instanceof HTMLElement) {
          textEl.style.animationPlayState = 'running';
          textEl.style.animationDuration = `${duration}s`;
        }
      });
    }
  }, [marqueeConfig.speedMultiplier]);
  
  const pauseMarqueeLater = useCallback(() => {
    setMarqueeStatus('not-active');
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    pauseTimeoutRef.current = setTimeout(() => {
      if (marqueeTextRef.current) {
        const textElements = marqueeTextRef.current.querySelectorAll('[data-cursor-marquee-text-target]');
        textElements.forEach((textEl) => {
          if (textEl instanceof HTMLElement) {
            textEl.style.animationPlayState = 'paused';
          }
        });
      }
    }, marqueeConfig.hoverOutDelay * 1000);
    
    activeElementRef.current = null;
  }, [marqueeConfig.hoverOutDelay]);
  
  const checkMarqueeTarget = useCallback(() => {
    const { x, y } = lastPositionRef.current;
    const element = document.elementFromPoint(x, y);
    const hitTarget = element?.closest('[data-cursor-marquee-text]');
    
    if (hitTarget !== activeElementRef.current) {
      if (activeElementRef.current) {
        pauseMarqueeLater();
      }
      if (hitTarget) {
        playMarqueeFor(hitTarget);
      }
    }
  }, [playMarqueeFor, pauseMarqueeLater]);

  // Three.js用のマーキーマネージャー実装
  const showThreeMarquee = useCallback((text: string) => {
    const duration = (text.length || 1) / marqueeConfig.speedMultiplier;
    
    setMarqueeText(text);
    setMarqueeStatus('active');
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    if (marqueeTextRef.current) {
      const textElements = marqueeTextRef.current.querySelectorAll('[data-cursor-marquee-text-target]');
      textElements.forEach((textEl) => {
        if (textEl instanceof HTMLElement) {
          textEl.style.animationPlayState = 'running';
          textEl.style.animationDuration = `${duration}s`;
        }
      });
    }
  }, [marqueeConfig.speedMultiplier]);

  const hideThreeMarquee = useCallback(() => {
    pauseMarqueeLater();
  }, [pauseMarqueeLater]);

  useEffect(() => {
    // グローバルマーキーマネージャーを登録
    globalMarqueeManager = {
      showMarquee: showThreeMarquee,
      hideMarquee: hideThreeMarquee
    };
    
    // GSAP quickTo の初期化
    if (cursorRef.current) {
      quickToRef.current = {
        x: gsap.quickTo(cursorRef.current, 'x', { duration: marqueeConfig.followDuration, ease: 'power3' }),
        y: gsap.quickTo(cursorRef.current, 'y', { duration: marqueeConfig.followDuration, ease: 'power3' })
      };
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      lastPositionRef.current = newPosition;
      
      // GSAP アニメーションの適用
      if (quickToRef.current) {
        quickToRef.current.x(newPosition.x);
        quickToRef.current.y(newPosition.y);
      }
      
      checkMarqueeTarget();
    };
    
    const handleScroll = () => {
      const { x, y } = lastPositionRef.current;
      if (quickToRef.current) {
        quickToRef.current.x(x);
        quickToRef.current.y(y);
      }
      checkMarqueeTarget();
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

    document.addEventListener("pointermove", handleMouseMove, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    
    // 初期化時の遅延
    const initTimeout = setTimeout(() => {
      setMarqueeStatus('not-active');
    }, 500);

    return () => {
      // グローバルマネージャーをクリーンアップ
      globalMarqueeManager = null;
      
      document.removeEventListener("pointermove", handleMouseMove);
      document.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      clearTimeout(initTimeout);
    };
  }, [checkMarqueeTarget, marqueeConfig.followDuration]);

  return (
    <div
      data-mouse-stalker
      data-cursor-marquee-status={marqueeStatus}
      className={`g-mouseStalker ${isVisible ? styles.visible : ""} ${isHovered ? styles.isHover : ""}${marqueeStatus === 'active' ? ` ${styles.marqueeActive}` : ""}`}
    >
      <div
        ref={cursorRef}
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
      
      {/* マーキーテキスト表示エリア */}
      <div 
        ref={marqueeTextRef}
        className={styles.cursorMarquee}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div className={styles.cursorMarqueeCard}>
          <span 
            data-cursor-marquee-text-target 
            className={styles.cursorMarqueeTextSpan}
          >
            {marqueeText}
          </span>
          <span 
            data-cursor-marquee-text-target 
            className={`${styles.cursorMarqueeTextSpan} ${styles.isDuplicate}`}
          >
            {marqueeText}
          </span>
        </div>
      </div>
    </div>
  );
}
