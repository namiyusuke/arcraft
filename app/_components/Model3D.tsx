"use client";

import { Canvas } from "@react-three/fiber";
import { SoftShadows } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { LoadingScreen } from "./loading";
import Scene from "./Scene";
import Modal from "./modal";
import { useModel3DStore } from "../store/model3dStore";

// export default function Model3D(isScreenClicked: boolean, setIsScreenClicked: (isScreenClicked: boolean) => void) {
export default function Model3D() {
  const { isScreenClicked, setIsScreenClicked, isDumbbleClicked, setIsDumbbleClicked } = useModel3DStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const onPoiterMove = (event: MouseEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onPoiterMove);
    return () => {
      window.removeEventListener("mousemove", onPoiterMove);
    };
  });
  const handleLoad = () => {
    setIsLoading(false);
  };
  const handleLoadingComplete = () => {
    setShowCanvas(true);
  };
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Modal />
      {showCanvas && (
        <Canvas
          shadows
          style={{ backgroundColor: "#040441" }}
          camera={{ position: [10, 10, 10], fov: 45, near: 0.1, far: 1000 }}
        >
          <SoftShadows />
          <Suspense fallback={null}>
            <Scene
              onLoad={handleLoad}
              pointerRef={pointerRef.current}
            />
          </Suspense>
        </Canvas>
      )}
      <LoadingScreen isLoading={isLoading} onComplete={handleLoadingComplete} />
    </div>
  );
}
