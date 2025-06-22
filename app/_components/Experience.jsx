"use client";
import { NamiRoom } from "./nami_room";
import Model3D from "./Model3D";
import { CameraControls, OrbitControls, PerspectiveCamera, useFBO, Environment } from "@react-three/drei";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import {} from "@react-three/drei";
import { MathUtils } from "three";
import { DEG2RAD } from "three/src/math/MathUtils";
import { Raycaster, Vector2, Vector3 } from "three";

export const Experience = () => {
  const viewport = useThree((state) => state.viewport);
  const renderedScene = useRef();
  const exampleScene = useRef();
  const renderTarget = useFBO();
  const renderTarget2 = useFBO();
  const renderCamera = useRef();
  const renderMaterial = useRef();
  const model = useLoader(GLTFLoader, "/models/nami_room_old.glb");
  // useEffect(() => {
  //   renderMaterial.current.progression = 0;
  // }, []);
  useFrame(({ gl, scene }, delta) => {
    renderedScene.current.visible = true;
    exampleScene.current.visible = false;
    gl.setRenderTarget(renderTarget);
    gl.render(scene, renderCamera.current);

    renderMaterial.current.progression = MathUtils.lerp(
      renderMaterial.current.progression,
      progressionTarget,
      delta * transitionSpeed
    );

    gl.setRenderTarget(renderTarget2);
    // EXAMPLE
    renderedScene.current.visible = false;
    exampleScene.current.visible = true;
    // END EXAMPLE
    gl.render(scene, renderCamera.current);
    renderedScene.current.visible = true;
    exampleScene.current.visible = false;

    gl.setRenderTarget(null);
    renderMaterial.current.map = renderTarget.texture;
  });
  const { progressionTarget, transitionSpeed } = useControls({
    transitionSpeed: {
      value: 2,
      min: 0.3,
      max: 100,
    },
    progressionTarget: {
      value: 1,
    },
    transition: {
      value: 0,
      options: {
        Horizontal: 0,
        Vertical: 1,
      },
      onChange: (value) => {
        renderMaterial.current.transition = value;
      },
    },
  });
  return (
    <>
      <mesh>
        <Model3D />
      </mesh>
      {/* <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} near={0.1} far={100} ref={renderCamera} />
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <transitionMaterial
          ref={renderMaterial}
          tex={renderTarget.texture}
          tex2={renderTarget2.texture}
          toneMapped={false}
        />
      </mesh>
      <group ref={renderedScene} position={[0, -1, 0]}>
        <NamiRoom />
      </group>
      <group ref={exampleScene}>
        <primitive object={model.scene} position={[0, -1, 0]} />
      </group>
      <OrbitControls enableDamping dampingFactor={0.05} minDistance={3} maxDistance={10} maxPolarAngle={Math.PI / 2} />
      <Environment preset="sunset" blur={0.4} background /> */}
    </>
  );
};
