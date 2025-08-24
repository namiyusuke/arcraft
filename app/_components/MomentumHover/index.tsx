"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import styles from "./index.module.css";

// GSAPプラグインを登録
gsap.registerPlugin(InertiaPlugin);

interface MomentumHoverProps {
  children: React.ReactNode;
  xyMultiplier?: number;
  rotationMultiplier?: number;
  inertiaResistance?: number;
  className?: string;
}

export default function MomentumHover({
  children,
  xyMultiplier = 30,
  rotationMultiplier = 20,
  inertiaResistance = 200,
  className = "",
}: MomentumHoverProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const target = targetRef.current;

    if (!root || !target) return;

    // ファインポインターかつホバー可能なデバイスでない場合は終了
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    // マウスの位置と速度を追跡
    let prevX = 0,
      prevY = 0;
    let velX = 0,
      velY = 0;
    let rafId: number | null = null;

    // クランプ関数を事前作成（パフォーマンス向上）
    const clampXY = gsap.utils.clamp(-1080, 1080);
    const clampRot = gsap.utils.clamp(-60, 60);

    // ポインター速度を追跡（RAF で制限）
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        velX = e.clientX - prevX;
        velY = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        rafId = null;
      });
    };

    // ホバー開始時の処理
    const handleMouseEnter = (e: MouseEvent) => {
      if (!target) return;

      // ターゲット要素の中心からポインターまでのオフセットを計算
      const { left, top, width, height } = target.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      // 原始トルク（px²/frame）を計算
      const rawTorque = offsetX * velY - offsetY * velX;

      // トルクを正規化してポインター速度に比例するように調整（deg/sec）
      const leverDist = Math.hypot(offsetX, offsetY) || 1;
      const angularForce = rawTorque / leverDist;

      // 速度を計算してクランプ
      const velocityX = clampXY(velX * xyMultiplier);
      const velocityY = clampXY(velY * xyMultiplier);
      const rotationVelocity = clampRot(angularForce * rotationMultiplier);

      // GSAP慣性トゥイーンを適用
      gsap.to(target, {
        inertia: {
          x: { velocity: -velocityX, end: 0 },
          y: { velocity: -velocityY, end: 0 },
          rotation: { velocity: rotationVelocity, end: 0 },
          resistance: inertiaResistance,
        },
      });
    };

    root.addEventListener("mousemove", handleMouseMove);
    root.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      root.removeEventListener("mousemove", handleMouseMove);
      root.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [xyMultiplier, rotationMultiplier, inertiaResistance]);

  return (
    <div ref={rootRef} className={`${styles.momentumHover} ${className}`} data-momentum-hover-init>
      <div ref={targetRef} className={styles.momentumHoverTarget} data-momentum-hover-target>
        {children}
      </div>
    </div>
  );
}
