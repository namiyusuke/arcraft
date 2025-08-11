"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Three.jsコンポーネントをdynamic importで分離
const ShaderCanvas = dynamic(() => import("./shader-canvas"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Loading shader...
    </div>
  ),
});

interface ShaderImageProps {
  imageSrc: string;
  altImageSrc?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ShaderImage({ imageSrc, altImageSrc, width, height, className = "" }: ShaderImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 画像の自然なアスペクト比を取得
    const img = new Image();
    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      setAspectRatio(naturalWidth / naturalHeight);
      setIsLoading(false);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // 固定サイズが指定されている場合
  if (width && height) {
    return (
      <div className={className} style={{ width, height }}>
        <ShaderCanvas imageSrc={imageSrc} altImageSrc={altImageSrc} width={width} height={height} />
      </div>
    );
  }

  // レスポンシブ対応（CSSでサイズ制御）
  const containerStyle: React.CSSProperties = {
    width: width ? `${width}px` : "100%",
    height: height ? `${height}px` : "auto",
    aspectRatio: !height && !isLoading ? `${aspectRatio}` : undefined,
  };

  if (isLoading) {
    return (
      <div
        className={className}
        style={{
          ...containerStyle,
          backgroundColor: "#f5f5f5",
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      <ShaderCanvas imageSrc={imageSrc} altImageSrc={altImageSrc} />
    </div>
  );
}
