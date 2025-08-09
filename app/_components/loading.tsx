import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";

const CELL_SIZE = 60; // セルの大きさ(px)

function useGridSize() {
  const [grid, setGrid] = useState({ rows: 1, cols: 1 });

  useEffect(() => {
    function updateGrid() {
      const cols = Math.ceil(window.innerWidth / CELL_SIZE);
      const rows = Math.ceil(window.innerHeight / CELL_SIZE);
      setGrid({ rows, cols });
    }
    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  return grid;
}

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { progress } = useProgress();
  const [isCounterReady, setIsCounterReady] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const currentProgressRef = useRef(0);
  const { rows, cols } = useGridSize();

  // 追加: 線アニメーション用state
  const [isLineAnimating, setIsLineAnimating] = useState(false);

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
            div.style.fontSize = "40px";
            div.style.color = "#212121";
            div.style.fontFamily = "monospace";
            div.style.fontWeight = "bold";
            div.style.pointerEvents = "none";
            div.style.letterSpacing = ".1em";
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

          // 3桁に分解（100の場合も含む）
          let hundreds, tens, ones;

          if (currentValue >= 100) {
            // 100以上の場合は100として表示
            hundreds = 1;
            tens = 0;
            ones = 0;
          } else {
            hundreds = Math.floor(currentValue / 100);
            tens = Math.floor((currentValue % 100) / 10);
            ones = currentValue % 10;
          }

          // 各桁を更新（durationを短くして即座に更新）
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
            if (counterRef.current) {
              gsap.to(counterRef.current, {
                opacity: 0,
                duration: 1.2,
                ease: "power1.out",
                delay: 0.5,
              });
            }
            setTimeout(() => {
              setIsLineAnimating(true);
              setTimeout(() => {
                setAnimationCompleted(true);
              }, 900); // 線アニメーション終了後にセル消し
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

        if (lineRef.current) {
          gsap.to(lineRef.current, {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        setTimeout(() => {
          if (overlayRef.current) {
            gsap.to(overlayRef.current, {
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        }, 500);
      }, maxDelay * 1000);

      return () => clearTimeout(timer);
    }
  }, [animationCompleted, onComplete, rows]);

  // グリッド全体のサイズ
  const gridWidth = cols * CELL_SIZE;
  const gridHeight = rows * CELL_SIZE;

  return (
    <>
      {/* 線アニメーション用レイヤー */}
      <div
        ref={lineRef}
        className="line-anime"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: gridWidth,
          height: gridHeight,
          pointerEvents: "none",
          zIndex: 11000,
          opacity: isLoading ? 1 : 0,
        }}
      >
        {/* 縦線 */}
        {Array.from({ length: cols + 1 }).map((_, i) => (
          <div
            key={`vline-${i}`}
            style={{
              position: "absolute",
              left: `${i * CELL_SIZE}px`,
              top: 0,
              width: "2px",
              height: isLineAnimating ? `${gridHeight}px` : "0px",
              background: "#262626",
              transition: "height 0.7s cubic-bezier(.77,0,.18,1)",
              transitionDelay: isLineAnimating ? "0.1s" : "0s",
              zIndex: 1100,
            }}
          />
        ))}
        {/* 横線 */}
        {Array.from({ length: rows + 1 }).map((_, i) => (
          <div
            key={`hline-${i}`}
            style={{
              position: "absolute",
              left: 0,
              top: `${i * CELL_SIZE}px`,
              width: isLineAnimating ? `${gridWidth}px` : "0px",
              height: "2px",
              background: "#262626",
              transition: "width 0.7s cubic-bezier(.77,0,.18,1)",
              transitionDelay: isLineAnimating ? "0.1s" : "0s",
              zIndex: 1100,
            }}
          />
        ))}
      </div>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${rows}, ${CELL_SIZE}px)`,
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
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                color: "#222",
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
          bottom: "10%",
          right: "10%",
          // transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "0px",
          overflow: "hidden",
          zIndex: 2000,
          backgroundColor: "#fff",
          color: "#222",
          fontSize: "10px",
        }}
      >
        <div
          className="counter-1"
          style={{
            // overflow: "hidden",
            height: "60px",
            width: "max-content",
            position: "relative",
            color: "#222",
          }}
        >
          {/* 数字は動的に生成される */}
        </div>
        <div
          className="counter-2"
          style={{
            //  overflow: "hidden",
            height: "60px",
            width: "max-content",
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
            width: "max-content",
            position: "relative",
          }}
        >
          {/* 数字は動的に生成される */}
        </div>
        <div
          style={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            fontSize: "30px",
            color: "#212121",
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              position: "relative",
              top: "5px",
              color: "#212121",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          >
            %
          </span>
        </div>
      </div>
    </>
  );
}
