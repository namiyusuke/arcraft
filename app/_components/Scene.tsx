"use client";

import { useFrame } from "@react-three/fiber";
import { CameraControls, Stats, useHelper, useProgress, Html } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useControls, button } from "leva";
import { NamiRoom } from "./nami_room";
import GridPlanes from "./GridPlanes";
import { PointLightHelper, SpotLightHelper } from "three";
import { useModel3DStore } from "../store/model3dStore";

export default function Scene({ onLoad, pointerRef }: { onLoad: () => void; pointerRef: { x: number; y: number } }) {
  const { isScreenClicked, setIsScreenClicked, isDumbbleClicked, setIsDumbbleClicked } = useModel3DStore();
  const lightRef = useRef<THREE.Object3D>(null);
  const spotLightRef = useRef<THREE.Object3D>(null);
  const gridPlanesRef = useRef<THREE.Group>(null);
  const { progress } = useProgress();
  // useHelper(lightRef as any, PointLightHelper, 1);
  // useHelper(spotLightRef as any, SpotLightHelper, 1);
  const modelRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const groupRotation = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (progress == 100 && modelRef.current) {
      gsap.to(modelRef.current, {
        rotation: Math.PI * 2,
        duration: 1,
        delay: 2.5,
        ease: "power2.inOut",
      });
    }
  }, [progress, modelRef]);
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
    const targetPosition = pointerRef.x * Math.PI * 0.03;
    groupRotation.current = THREE.MathUtils.lerp(groupRotation.current || 0, targetPosition, 0.1);
    if (groupRef.current) {
      groupRef.current.rotation.y = groupRotation.current;
    }
  });
  const controls = useRef<CameraControls>(null);
  // controls.current?.cancel()
  const { cameraPosition, targetPosition, lightIntensity, lightPosition } = useControls({
    cameraPosition: {
      value: { x: 2, y: 2, z: 2 },
      step: 0.1,
    },
    targetPosition: {
      value: { x: 0, y: 1, z: 0 },
      step: 0.1,
    },
    lightPosition: {
      value: { x: 0, y: 2, z: 0 },
      step: 0.1,
    },
    lightIntensity: {
      value: 1.5,
      min: 0,
      max: 500,
      step: 0.1,
    },
  });
  const { spotLightIntensity, spotLightDistance, spotLightAngle, spotLightPosition } = useControls({
    spotLightIntensity: {
      value: 30.2,
      step: 0.1,
    },
    spotLightDistance: {
      value: -1.8,
      step: 0.1,
    },
    spotLightAngle: {
      value: -2.9,
      step: 0.1,
    },
    spotLightPosition: {
      value: { x: 2.5, y: 4.5, z: 2.5 },
      step: 0.1,
    },
  });
  useEffect(() => {
    if (controls.current) {
      if (isMobile) {
        // スマホ用カメラ位置
        controls.current.setPosition(3, 4, 4);
        controls.current.setTarget(0, 0.5, 0);
      } else {
        // PC用カメラ位置
        controls.current.setPosition(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        controls.current.setTarget(targetPosition.x, targetPosition.y, targetPosition.z);
      }
    }
  }, [cameraPosition, targetPosition, isMobile]);
  useEffect(() => {
    if (isScreenClicked && controls.current) {
      document.documentElement.classList.add("is-back");
      document.documentElement.classList.add("is-techlog");
      if (isMobile) {
        controls.current.setLookAt(0.399999999999996, 1.3999999999999988, 0.399999999999998, 0, 1.3, 0.4, true);
      } else {
        controls.current.setLookAt(0.399999999999996, 1.3999999999999988, 0.399999999999998, 0, 1.3, 0.4, true);
      }
    } else {
      document.documentElement.classList.remove("is-back");
      document.documentElement.classList.remove("is-techlog");
      if (isMobile) {
        controls.current?.setLookAt(3, 4, 4, 0, 0.5, 0, true);
      } else {
        controls.current?.setLookAt(2.5, 3, 2.5, 0, 1, 0, true);
      }
    }
  }, [isScreenClicked, isMobile]);

  useEffect(() => {
    document.documentElement.classList.remove("is-back");
    document.documentElement.classList.remove("is-techlog");
    document.documentElement.classList.remove("is-lifelog");
  }, [pathname]);
  useEffect(() => {
    if (isDumbbleClicked && controls.current) {
      document.documentElement.classList.add("is-back");
      document.documentElement.classList.add("is-lifelog");
      if (isMobile) {
        controls.current.setLookAt(2.2, 1.8, 1.5, 0.2, -0.3, 0, true);
      } else {
        controls.current.setLookAt(
          1.9999999999999998,
          1.7000000000000002,
          1.1999999999999997,
          0.10000000000000003,
          -0.5000000000000001,
          0,
          true
        );
      }
    } else {
      document.documentElement.classList.remove("is-back");
      document.documentElement.classList.remove("is-lifelog");
      if (isMobile) {
        controls.current?.setLookAt(3, 4, 4, 0, 0.5, 0, true);
      } else {
        controls.current?.setLookAt(2.5, 3, 2.5, 0, 1, 0, true);
      }
    }
  }, [isDumbbleClicked, isMobile]);
  useControls("Helper", {
    getLookAt: button(() => {
      if (controls.current) {
        const position = controls.current.getPosition(new THREE.Vector3());
        const target = controls.current.getTarget(new THREE.Vector3());
        console.log([position.x, position.y, position.z, target.x, target.y, target.z]);
      }
    }),
    setLookAt: button(() => {
      if (controls.current && isScreenClicked) {
        controls.current.setLookAt(0.399999999999996, 1.3999999999999988, 0.399999999999998, 0, 1.3, 0.4, true);
      }
    }),
  });

  return (
    <>
      <group ref={groupRef}>
        <ambientLight intensity={1} />
        <pointLight
          ref={lightRef}
          position={[lightPosition.x, lightPosition.y, lightPosition.z]}
          intensity={lightIntensity}
          color="#fffbc64"
          shadow-mapSize={[112, 112]}
          shadow-bias={-0.0001}
          shadow-radius={10}
          castShadow
        />
        <spotLight
          ref={spotLightRef}
          position={[spotLightPosition.x, spotLightPosition.y, spotLightPosition.z]}
          angle={spotLightAngle}
          intensity={spotLightIntensity}
          distance={spotLightDistance}
          color="#fffbc64"
          shadow-mapSize={[290, 290]}
          shadow-bias={-0.0001}
          shadow-radius={12}
          castShadow
        />
        <NamiRoom />
        <CameraControls
          ref={controls}
          minDistance={1.0}
          maxDistance={10}
          dollySpeed={0.5}
          truckSpeed={0.5}
          smoothTime={0.5}
          enabled={true}
        />
      </group>
      <GridPlanes
        position={[0, 0, 0]}
        ref={gridPlanesRef}
        rows={20}
        columns={20}
        planeWidth={3}
        planeDepth={3}
        spacing={0}
      />
      {/* <Stats /> */}
    </>
  );
}
