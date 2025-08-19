"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxImageItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  speed: number; // パララックスの移動速度（-1.0 〜 1.0）
  className?: string;
}

interface ParallaxImagesProps {
  images: ParallaxImageItem[];
  containerClassName?: string;
  triggerStart?: string;
  triggerEnd?: string;
}

export default function ParallaxImages({
  images,
  containerClassName,
  triggerStart = "top bottom",
  triggerEnd = "bottom top",
}: ParallaxImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animations: ScrollTrigger[] = [];

    imageRefs.current.forEach((imageRef, index) => {
      if (!imageRef) return;

      const image = images[index];
      if (!image) return;

      // ScrollTriggerを直接作成する方式（より明確）
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: "body",
        start: triggerStart,
        end: triggerEnd,
        scrub: true,
        onUpdate: (self) => {
          console.log(`Image ${index} progress:`, self.progress);
        },
        animation: gsap.to(imageRef, {
          yPercent: image.speed * 100,
          ease: "none",
        }),
      });

      animations.push(scrollTriggerInstance);
    });

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [images, triggerStart, triggerEnd]);

  return (
    <div ref={containerRef} className={containerClassName}>
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className={`parallax-image ${image.className || ""}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="parallax-image__img"
          />
        </div>
      ))}
    </div>
  );
}
