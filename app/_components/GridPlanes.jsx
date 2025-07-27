// export default GridPlanes;
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useState, useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

const Plane = ({ position, planeDepth, planeWidth, variant = "default", index = 0 }) => {
  const meshRef = useRef();
  const shadowMeshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [elevation, setElevation] = useState(0);

  const material = useMemo(() => {
    const configs = {
      default: {
        color: "#ffffff",
        transparent: true,
        opacity: 0,
        roughness: 0.3,
        metalness: 0.1,
      },
      neon: {
        color: "#00ffff",
        transparent: true,
        opacity: 0,
        roughness: 0.2,
        metalness: 0.8,
        emissive: "#001133",
      },
      rainbow: {
        color: new THREE.Color().setHSL((index * 0.1) % 1, 0.8, 0.6),
        transparent: true,
        opacity: 0,
        roughness: 0.4,
        metalness: 0.2,
        emissive: new THREE.Color().setHSL((index * 0.1) % 1, 0.4, 0.2),
      },
      matrix: {
        color: "#00ff00",
        transparent: true,
        opacity: 0,
        roughness: 0.1,
        metalness: 0.9,
        emissive: "#003300",
      },
      fire: {
        color: "#ff4400",
        transparent: true,
        opacity: 0,
        roughness: 0.6,
        metalness: 0.1,
        emissive: "#330000",
      },
    };

    return new THREE.MeshStandardMaterial({
      ...configs[variant],
      depthTest: true,
      depthWrite: true,
    });
  }, [variant, index]);

  // 黒色のシャドウマテリアル
  const shadowMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#040441",
      roughness: 0.8,
      metalness: 0.1,
      transparent: false,
    });
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;

    // バリアントに応じた初期アニメーション
    const mat = meshRef.current.material;
    const delay = index * 0.05; // カスケード効果

    gsap.fromTo(
      mat,
      {
        opacity: 0,
        emissiveIntensity: 0,
      },
      {
        opacity: 0.1,
        emissiveIntensity: 0.3,
        duration: 1,
        delay: delay,
        ease: "power2.out",
      }
    );
  }, [index]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // ホバー効果
    const targetOpacity = hovered ? 0.9 : 0.1;
    const targetElevation = hovered ? 0.2 : 0;
    const lerpFactor = hovered ? 0.1 : 0.03;

    setOpacity(THREE.MathUtils.lerp(opacity, targetOpacity, lerpFactor));
    // setElevation(THREE.MathUtils.lerp(elevation, targetElevation, lerpFactor));

    meshRef.current.material.opacity = opacity;
    meshRef.current.position.y = position[1] + elevation;
    meshRef.current.material.emissiveIntensity = hovered ? 2.0 : 0.5;
  });

  return (
    <group>
      {/* 黒色のシャドウプレーン（光の加減を反映） */}
      <mesh
        ref={shadowMeshRef}
        position={[position[0], position[1] - 0.01, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={shadowMaterial}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[planeDepth, planeWidth]} />
      </mesh>

      {/* ホバーアニメーション用のプレーン */}
      <mesh
        ref={meshRef}
        position={position}
        rotation={[-Math.PI / 2, 0, 0]}
        material={material}
        receiveShadow
        castShadow
        onPointerEnter={(e) => {
          e.stopPropagation();
          e.nativeEvent?.stopImmediatePropagation?.();
          setHovered(true);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          e.nativeEvent?.stopImmediatePropagation?.();
          setHovered(false);

          if (variant === "ripple") {
            gsap.to(meshRef.current.scale, {
              x: 1,
              z: 1,
              duration: 0.3,
              ease: "elastic.out(1, 0.3)",
            });
          }
        }}
      >
        <planeGeometry args={[planeDepth, planeWidth]} />
      </mesh>
    </group>
  );
};

const GridPlanes = ({
  position,
  rows,
  columns,
  planeWidth,
  planeDepth,
  spacing,
  ref,
  variant = "default", // 新しいプロップ
}) => {
  const gridWidth = columns * (planeWidth + spacing) - spacing;
  const gridDepth = rows * (planeDepth + spacing) - spacing; // バグ修正: rowsを使用

  const startX = planeWidth / 2 - gridWidth / 2;
  const startZ = planeDepth / 2 - gridDepth / 2;

  const planes = [];
  let index = 0;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = startX + column * (planeWidth + spacing);
      const z = startZ + row * (planeDepth + spacing);

      planes.push(
        <Plane
          key={`plane-${row}-${column}`}
          planeDepth={planeDepth}
          planeWidth={planeWidth}
          position={[x, -0.125, z]}
          variant={variant}
          index={index++}
        />
      );
    }
  }

  return (
    <group position={position} ref={ref}>
      {planes}
    </group>
  );
};

export default GridPlanes;
