import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, extend, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { uniforms, vertexShader, fragmentShader } from "./shader";

// ShaderMaterialクラスを削除して直接THREE.ShaderMaterialを使用

interface ShaderPlaneProps {
  imageSrc: string;
  altImageSrc?: string;
}

function ShaderPlane({ imageSrc, altImageSrc }: ShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { size, viewport } = useThree();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [altTexture, setAltTexture] = useState<THREE.Texture | null>(null);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  // 各インスタンス用のuniformsを作成
  const localUniforms = useRef({
    uTexture: { value: null as THREE.Texture | null },
    uTextureAlt: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uStrength: { value: 1.0 }, // 初期値を上げて常にエフェクトが見えるように
    uNoiseScale: { value: 2.0 },
    uNoiseSpeed: { value: 0.25 },
    uFeather: { value: 0.25 },
  }).current;

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    loader.load(imageSrc, (tex) => {
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = tex.magFilter = THREE.LinearFilter;
      setTexture(tex);

      localUniforms.uTexture.value = tex;
      localUniforms.uResolution.value.set(tex.image.width, tex.image.height);
    });

    if (altImageSrc) {
      loader.load(altImageSrc, (tex) => {
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = tex.magFilter = THREE.LinearFilter;
        setAltTexture(tex);

        localUniforms.uTextureAlt.value = tex;
      });
    }
  }, [imageSrc, altImageSrc, localUniforms]);

  useEffect(() => {
    if (texture && !altImageSrc) {
      localUniforms.uTextureAlt.value = texture;
    }
  }, [texture, altImageSrc, localUniforms]);

  useFrame(({ clock }) => {
    localUniforms.uTime.value = clock.elapsedTime;

    const targetStrength = hovered ? 1.0 : 0.3;
    const currentStrength = localUniforms.uStrength.value;
    const newStrength = THREE.MathUtils.lerp(currentStrength, targetStrength, 0.1);
    localUniforms.uStrength.value = newStrength;

    localUniforms.uMouse.value.set(mouse.x, mouse.y);

    // デバッグ情報（開発時のみ）
    if (Math.floor(clock.elapsedTime) % 2 === 0 && clock.elapsedTime % 1 < 0.01) {
      console.log("Shader Debug:", {
        time: clock.elapsedTime,
        strength: localUniforms.uStrength.value,
        mouse: { x: mouse.x, y: mouse.y },
        hovered,
        textureLoaded: !!localUniforms.uTexture.value,
      });
    }
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

export default function ShaderCanvas({ imageSrc, altImageSrc, width = 800, height = 450 }: ShaderCanvasProps) {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 75 }} style={{ width: "100%", height: "100%" }}>
      <ShaderPlane imageSrc={imageSrc} altImageSrc={altImageSrc} />
    </Canvas>
  );
}
