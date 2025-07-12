import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const { progress } = useProgress();
  const [isCounterReady, setIsCounterReady] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const currentProgressRef = useRef(0);
  const rows = 10;
  const cols = 10;

  // カウンターの初期化
  useEffect(() => {
    if (counterRef.current && !isCounterReady) {
      const counter = counterRef.current;
      const counters = [
        counter.querySelector(".counter-1"),
        counter.querySelector(".counter-2"),
        counter.querySelector(".counter-3"),
      ];

      counters.forEach((counterElement) => {
        if (counterElement) {
          counterElement.innerHTML = "";
          // 0-9の数字を縦に並べる
          for (let i = 0; i <= 9; i++) {
            const div = document.createElement("div");
            div.className = "num";
            div.textContent = i.toString();
            div.style.height = "60px";
            div.style.display = "flex";
            div.style.alignItems = "center";
            div.style.justifyContent = "center";
            div.style.fontSize = "48px";
            div.style.color = "#fff";
            div.style.fontFamily = "monospace";
            div.style.fontWeight = "bold";
            div.style.pointerEvents = "none";
            counterElement.appendChild(div);
          }
          // 初期位置を0に設定
          gsap.set(counterElement, { y: 0 });
        }
      });
      setIsCounterReady(true);
    }
  }, [isCounterReady]);

  // プログレスに応じてカウンターをアニメーション
  useEffect(() => {
    if (!isCounterReady || !counterRef.current) return;

    const targetProgress = Math.min(progress, 100);
    const startProgress = currentProgressRef.current;

    // プログレスが変わった時のみアニメーション実行
    if (Math.abs(targetProgress - startProgress) < 0.5) return;

    const counter = counterRef.current;
    const counter1 = counter.querySelector(".counter-1");
    const counter2 = counter.querySelector(".counter-2");
    const counter3 = counter.querySelector(".counter-3");

    // 段階的にカウントアップするアニメーション
    gsap.to(
      { value: startProgress },
      {
        value: targetProgress,
        duration: Math.max(0.8, (targetProgress - startProgress) * 0.02), // プログレス差に応じて時間調整
        ease: "power2.out",
        onUpdate: function () {
          const currentValue = Math.floor(this.targets()[0].value);

          // 3桁に分解
          const hundreds = Math.floor(currentValue / 100);
          const tens = Math.floor((currentValue % 100) / 10);
          const ones = currentValue % 10;

          // 各桁を即座に更新（アニメーション内で段階的に変化）
          if (counter1) {
            gsap.set(counter1, { y: -hundreds * 60 });
          }
          if (counter2) {
            gsap.set(counter2, { y: -tens * 60 });
          }
          if (counter3) {
            gsap.set(counter3, { y: -ones * 60 });
          }
        },
        onComplete: () => {
          currentProgressRef.current = targetProgress;
          if (targetProgress >= 100) {
            setTimeout(() => {
              setAnimationCompleted(true);
            }, 1500);
          }
        },
      }
    );
  }, [progress, isCounterReady]);

  // ローディング完了時のアニメーション
  useEffect(() => {
    if (overlayRef.current && animationCompleted) {
      const blocks = Array.from(overlayRef.current.children).filter(
        (child) => !child.classList.contains("counter")
      ) as HTMLElement[];

      // カウンターをフェードアウト
      if (counterRef.current) {
        gsap.to(counterRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // ブロックを消すアニメーション
      blocks.forEach((block) => {
        const row = parseInt(block.dataset.row || "0");
        const delayBase = (rows - row - 1) * 0.1;
        const delayRandom = Math.random() * 0.08;
        const totalDelay = delayBase + delayRandom + 0.8;

        gsap.to(block, {
          opacity: 0,
          duration: 0.5,
          delay: totalDelay,
          ease: "power2.out",
        });
      });

      const maxDelay = rows * 0.1 + 1.3;
      const timer = setTimeout(() => {
        onComplete?.();
        if (overlayRef.current) {
          gsap.to(overlayRef.current, {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }, maxDelay * 1000);

      return () => clearTimeout(timer);
    }
  }, [animationCompleted, onComplete, rows]);

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          backgroundColor: "#262626",
          zIndex: 1000,
          opacity: isLoading ? 1 : 0,
          pointerEvents: isLoading ? "auto" : "none",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          return (
            <div
              key={i}
              data-row={row}
              data-col={col}
              style={{
                backgroundColor: "#fff",
                opacity: 1,
                transform: "scale(1)",
              }}
            />
          );
        })}
      </div>
      <div
        ref={counterRef}
        className="counter"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "5px",
          zIndex: 2000,
          backgroundColor: "#000",
        }}
      >
        <div
          className="counter-1"
          style={{
            // overflow: "hidden",
            height: "60px",
            width: "45px",
            position: "relative",
          }}
        >
          {/* 数字は動的に生成される */}
        </div>
        <div
          className="counter-2"
          style={{
            //  overflow: "hidden",
            height: "60px",
            width: "45px",
            position: "relative",
          }}
        >
          {/* 数字は動的に生成される */}
        </div>
        <div
          className="counter-3"
          style={{
            // overflow: "hidden",
            height: "60px",
            width: "45px",
            position: "relative",
          }}
        >
          {/* 数字は動的に生成される */}
        </div>
      </div>
    </>
  );
}
