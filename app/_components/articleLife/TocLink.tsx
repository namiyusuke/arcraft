"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

type Props = {
  id: string;
  text: string;
  className: string;
};

export default function TocLink({ id, text, className }: Props) {
  const smoothScroll = (target: string) => {
    const element = document.querySelector(target) as HTMLElement;
    if (!element) return;

    const headerHeight = 80; // ヘッダーの高さを調整
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    gsap.to(window, {
      scrollTo: {
        y: offsetPosition,
        autoKill: false,
      },
      duration: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        smoothScroll(`#${id}`);
      }}
      href={`#${id}`}
      className={className}
    >
      {text}
    </Link>
  );
}
