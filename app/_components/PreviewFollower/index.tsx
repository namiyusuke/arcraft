"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function PreviewFollower() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const wrappers = document.querySelectorAll("[data-follower-wrap]");

    wrappers.forEach((wrap) => {
      const collection = wrap.querySelector("[data-follower-collection]");
      const items = wrap.querySelectorAll("[data-follower-item]");
      const follower = wrap.querySelector("[data-follower-cursor]") as HTMLElement;
      const followerInner = wrap.querySelector("[data-follower-cursor-inner]") as HTMLElement;

      if (!follower || !followerInner || !collection) return;

      let prevIndex: number | null = null;
      let firstEntry = true;

      const offset = 100;
      const duration = 0.5;
      const ease = "power2.inOut";

      // フォロワー要素の初期設定
      gsap.set(follower, { xPercent: -50, yPercent: -50 });

      const xTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);

      items.forEach((item, index) => {
        item.addEventListener("mouseenter", () => {
          const forward = prevIndex === null || index > prevIndex;
          prevIndex = index;

          follower.querySelectorAll("[data-follower-visual]").forEach((el) => {
            gsap.killTweensOf(el);
            gsap.to(el, {
              yPercent: forward ? -offset : offset,
              duration,
              ease,
              overwrite: "auto",
              onComplete: () => el.remove(),
            });
          });

          const visual = item.querySelector("[data-follower-visual]");
          if (!visual) return;
          const clone = visual.cloneNode(true) as HTMLElement;
          followerInner.appendChild(clone);

          if (!firstEntry) {
            gsap.fromTo(
              clone,
              { yPercent: forward ? offset : -offset },
              { yPercent: 0, duration, ease, overwrite: "auto" }
            );
          } else {
            firstEntry = false;
          }
        });

        item.addEventListener("mouseleave", () => {
          const el = follower.querySelector("[data-follower-visual]");
          if (!el) return;
          gsap.killTweensOf(el);
          gsap.to(el, {
            yPercent: -offset,
            duration,
            ease,
            overwrite: "auto",
            onComplete: () => el.remove(),
          });
        });
      });

      collection.addEventListener("mouseleave", () => {
        follower.querySelectorAll("[data-follower-visual]").forEach((el) => {
          gsap.killTweensOf(el);
          gsap.delayedCall(duration, () => el.remove());
        });
        firstEntry = true;
        prevIndex = null;
      });
    });

    return () => {
      gsap.killTweensOf("*");
    };
  }, []);

  return null;
}