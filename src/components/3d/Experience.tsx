import {
  Html,
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  Text,
} from "@react-three/drei";
import MacBook from "./MacBookModel.tsx";
import { useState } from "react";
import { Perf } from "r3f-perf";
import { useHash } from "../../hooks/useHash.ts";
import { useControls } from "leva";
import { useCameraController } from "../../hooks/useCameraControler.ts";
import ParticleBackground from "./Background.tsx";

export default function Experience() {
  const isDebug = useHash("debug");
  const [isScreenHovered, setIsScreenHovered] = useState(false);
  // Debug controls organized in folders
  const {
    hoveredPosition: hoveredCameraPosition,
    defaultPosition: defaultCameraPosition,
    lookAtTarget: cameraLookAtTarget,
  } = useControls("Camera", {
    hoveredPosition: { value: [0.5, 1.5, 2.0], step: 0.1 },
    defaultPosition: { value: [-3, 0, 4], step: 0.1 },
    lookAtTarget: { value: [-0.05, 0.4, -1.4], step: 0.01 },
  });

  const { preset: environmentPreset } = useControls("Environment", {
    preset: {
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
  });

  const {
    position: textPosition,
    rotationY: textRotationY,
    fontSize: textFontSize,
    color: textColor,
  } = useControls("Text", {
    position: { value: [2.1, 0.3, 0.8], step: 0.1 },
    rotationY: { value: -1.25, min: -Math.PI, max: Math.PI, step: 0.01 },
    fontSize: { value: 0.8, min: 0.1, max: 3, step: 0.1 },
    color: { value: "#e0e1dd" },
  });
  const {
    color: particleColor,
    size: particleSize,
    count: particleCount,
    speed: particleSpeed,
    fadeDistance: particleFadeDistance,
  } = useControls("Background", {
    color: { value: "#e0e1dd" },
    size: { value: 0.06, min: 0.01, max: 0.5, step: 0.01 },
    count: { value: 300, min: 50, max: 1000, step: 10 },
    speed: { value: 0.4, min: 0, max: 2, step: 0.1 },
    fadeDistance: { value: 7.0, min: 1, max: 10, step: 0.1 },
  });

  const {
    position: screenPosition,
    rotationX: screenRotationX,
    distanceFactor: screenDistanceFactor,
  } = useControls("Screen", {
    position: { value: [0, 1.5, -1.36], step: 0.01 },
    rotationX: { value: -0.256, min: -Math.PI, max: Math.PI, step: 0.01 },
    distanceFactor: { value: 1.17, min: 0.5, max: 3, step: 0.01 },
  });

  // Camera controller hook
  const { debouncedSetHover } = useCameraController({
    hoveredCameraPosition,
    defaultCameraPosition,
    cameraLookAtTarget,
    isScreenHovered,
  });

  return (
    <>
      {isDebug && <Perf position="top-left" />}
      <Environment preset={environmentPreset} />
      <ParticleBackground
        color={particleColor}
        size={particleSize}
        fadeDistance={particleFadeDistance}
        count={particleCount}
        speed={particleSpeed}
      />

      {/* <color args={["#73628a"]} attach="background" /> */}
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
            fontSize={textFontSize}
            rotation-y={textRotationY}
            maxWidth={2}
            lineHeight={0.9}
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
          />{" "}
          <MacBook position-y={-1.3}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={screenDistanceFactor}
              position={screenPosition}
              rotation-x={screenRotationX}
            >
              <iframe
                title="Marcelo Schreiber Portfolio"
                src="./html"
                onPointerEnter={() =>
                  debouncedSetHover(true, setIsScreenHovered)
                }
                onPointerLeave={() =>
                  debouncedSetHover(false, setIsScreenHovered)
                }
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
        far={1.6}
      />
    </>
  );
}
