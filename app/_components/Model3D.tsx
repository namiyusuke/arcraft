"use client";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { SoftShadows } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { LoadingScreen } from "./loading";
import Scene from "./Scene";

// export default function Model3D(isScreenClicked: boolean, setIsScreenClicked: (isScreenClicked: boolean) => void) {
export default function Model3D() {
  const [isScreenClicked, setIsScreenClicked] = useState<boolean>(false);
  const [isDumbbleClicked, setIsDumbbleClicked] = useState<boolean>(false);
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
      <div className="g-btn__wrapper g-btn__wrapper--techlog">
        <div className="">
          <Link className="g-techlog" href={`/techlog`}>
            技術のお話を見に行く？
          </Link>
          {
            <button
              onClick={() => {
                if (isScreenClicked) {
                  setIsScreenClicked(false);
                }
              }}
            >
              カメラを戻す
            </button>
          }
        </div>
      </div>
      <div className="g-btn__wrapper g-btn__wrapper--lifelog">
        <div className="">
          <Link className="g-lifelog" href={`/life`}>
            namiさんの日常を見に行く？
          </Link>
          {
            <button
              onClick={() => {
                if (isDumbbleClicked) {
                  setIsDumbbleClicked(false);
                }
              }}
            >
              カメラを戻す
            </button>
          }
        </div>
        <div className="g-lifelog-modal">
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
        </div>
      </div>

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
              isScreenClicked={isScreenClicked}
              setIsScreenClicked={setIsScreenClicked}
              isDumbbleClicked={isDumbbleClicked}
              setIsDumbbleClicked={setIsDumbbleClicked}
            />
          </Suspense>
        </Canvas>
      )}
      <LoadingScreen isLoading={isLoading} onComplete={handleLoadingComplete} />
    </div>
  );
}
