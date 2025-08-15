"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import React from "react";
import { DumbbellNew } from "./dumbbell.jsx";
function Dumbbell() {
  const { scene } = useGLTF("/models/dumbbell.glb");
  const meshRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ダンベルの中心を計算してセンタリング
  // React.useEffect(() => {
  //   if (meshRef.current) {
  //     const box = new THREE.Box3().setFromObject(meshRef.current);
  //     const center = box.getCenter(new THREE.Vector3());
  //     meshRef.current.position.copy(center.multiplyScalar(-1));
  //   }
  // }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // meshRef.current.rotation.z = 0.01 + meshRef.current.rotation.z;
      const tiltX = mousePosition.y * 0.04;
      const tiltZ = -mousePosition.x * 0.04;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, tiltX, 0.1);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, tiltZ, 0.1);
    }
  });

  const handlePointerMove = (event: any) => {
    const rect = event.intersections[0]?.object.parent?.parent?.getBoundingClientRect?.() || {
      left: 0,
      top: 0,
      width: 500,
      height: 400,
    };
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <group ref={meshRef}>
      <primitive
        object={scene}
        scale={[1, 1, 1]}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setMousePosition({ x: 0, y: 0 })}
      />
    </group>
  );
}

export default function DumbbellModel() {
  return (
    <div style={{ width: "400px", height: "300px", margin: "20px auto" }}>
      <Canvas camera={{ position: [0.5, 0.5, 0.5], fov: 50 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {/* <axesHelper args={[1]} /> */}
        <Suspense fallback={null}>
          <DumbbellNew />
        </Suspense>
        <OrbitControls
        // enablePan={true}
        // enableZoom={true}
        // enableRotate={true}
        // autoRotate={true}
        // autoRotateSpeed={1}
        // enabled={true}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/dumbbell.glb");
