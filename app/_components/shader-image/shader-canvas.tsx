import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shader";

// ShaderMaterialクラスを削除して直接THREE.ShaderMaterialを使用

interface ShaderPlaneProps {
  imageSrc: string;
  altImageSrc?: string;
}

function ShaderPlane({ imageSrc, altImageSrc }: ShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  // 各インスタンス用のuniformsを作成
  const localUniforms = useRef({
    uTexture: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uGlitchIntensity: { value: 0.0 },
  }).current;

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    loader.load(imageSrc, (tex) => {
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = tex.magFilter = THREE.LinearFilter;
      setTexture(tex);
      localUniforms.uTexture.value = tex;
    });
  }, [imageSrc, localUniforms]);

  useFrame(({ clock }) => {
    localUniforms.uTime.value = clock.elapsedTime;
    localUniforms.uMouse.value.set(mouse.x, mouse.y);
    
    // ホバー時のグリッチエフェクト制御（強度アップ）
    const targetGlitch = hovered ? 1.0 : 0.0;
    localUniforms.uGlitchIntensity.value = THREE.MathUtils.lerp(
      localUniforms.uGlitchIntensity.value, 
      targetGlitch, 
      0.1
    );
  });

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const { uv } = event;
    if (uv) {
      setMouse({ x: uv.x, y: uv.y });
    }
  };

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={localUniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

interface ShaderCanvasProps {
  imageSrc: string;
  altImageSrc?: string;
  width?: number;
  height?: number;
}

export default function ShaderCanvas({ imageSrc, altImageSrc }: ShaderCanvasProps) {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 75 }} style={{ width: "100%", height: "100%" }}>
      <ShaderPlane imageSrc={imageSrc} altImageSrc={altImageSrc} />
    </Canvas>
  );
}
