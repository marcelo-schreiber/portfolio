import {
  Html,
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  Text,
} from "@react-three/drei";
import MacBook from "./MacBookModel.tsx";
import { useState, useCallback, useRef } from "react";
import { Perf } from "r3f-perf";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useHash } from "../../hooks/useHash.ts";
import { useControls } from "leva";

export default function Experience() {
  const isDebug = useHash("debug");
  const [isScreenHovered, setIsScreenHovered] = useState(false);
  const { camera } = useThree();
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // only shown when debug is active
  const {
    hoveredCameraPosition,
    defaultCameraPosition,
    cameraLookAtTarget,
    environmentPreset,
    textPosition,
    textRotationY,
    textFontSize,
    textColor,
  } = useControls("Debug", {
    hoveredCameraPosition: { value: [0.5, 1.5, 2.0], step: 0.1 },
    defaultCameraPosition: { value: [-3, 0, 4], step: 0.1 },
    cameraLookAtTarget: { value: [-0.05, 0.4, -1.4], step: 0.01 },
    environmentPreset: {
      value: "city" as const,
      options: [
        "apartment",
        "city",
        "dawn",
        "forest",
        "lobby",
        "night",
        "park",
        "studio",
        "sunset",
        "warehouse",
      ] as const,
    },
    textPosition: { value: [2.75, 0.5, 0.8], step: 0.1 },
    textRotationY: { value: -1.25, min: -Math.PI, max: Math.PI, step: 0.01 },
    textFontSize: { value: 1, min: 0.1, max: 3, step: 0.1 },
    textColor: { value: "#e0e1dd" },
  });

  const debouncedSetHover = useCallback((value: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsScreenHovered(value);
    }, 100);
  }, []);

  useFrame(() => {
    if (isScreenHovered) {
      const cloneCamera = camera.clone();
      cloneCamera.position.set(...hoveredCameraPosition);
      cloneCamera.lookAt(...cameraLookAtTarget);
      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        cloneCamera.rotation.x,
        0.1
      );
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        cloneCamera.rotation.y,
        0.1
      );
      camera.rotation.z = THREE.MathUtils.lerp(
        camera.rotation.z,
        cloneCamera.rotation.z,
        0.1
      );

      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        hoveredCameraPosition[2],
        0.1
      );
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        hoveredCameraPosition[0],
        0.1
      );
    } else {
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        defaultCameraPosition[2],
        0.1
      );
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        defaultCameraPosition[0],
        0.1
      );
      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        -0.35877,
        0.1
      );
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        -0.61223,
        0.1
      );
      camera.rotation.z = THREE.MathUtils.lerp(
        camera.rotation.z,
        -0.212264,
        0.1
      );
    }
  });

  return (
    <>
      {isDebug && <Perf position="top-left" />}
      <Environment preset={environmentPreset} />

      <color args={["#09090B"]} attach="background" />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        damping={0.1}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        snap
      >
        <Float rotationIntensity={0.4}>
          <Text
            font="./IndustryBold.otf"
            color={textColor}
            position={textPosition}
            textAlign="center"
            fontSize={textFontSize}
            rotation-y={textRotationY}
            maxWidth={2}
          >
            Marcelo Schreiber
          </Text>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#151b1c"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <MacBook position-y={-1.3}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.5, -1.36]}
              rotation-x={-0.256}
            >
              <iframe
                src="./html"
                onPointerEnter={() => debouncedSetHover(true)}
                onPointerLeave={() => debouncedSetHover(false)}
              />
            </Html>
          </MacBook>
        </Float>
      </PresentationControls>

      <ContactShadows
        position-y={-1.4}
        scale={5}
        opacity={0.4}
        blur={2.4}
        far={3}
      />
    </>
  );
}
