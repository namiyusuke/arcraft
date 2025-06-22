"use client";
import { Canvas, extend } from "@react-three/fiber";
import { Experience } from "./Experience";
import { TransitionMaterial } from "./TransitionMaterial";

extend({
  TransitionMaterial,
});

export default function ScreenCanvas() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Canvas shadows>
          <color attach="background" args={["#333"]} />
          <Experience />
        </Canvas>
      </div>
    </>
  );
}
