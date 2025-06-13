import {
  Html,
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  Text,
  Sparkles,
} from "@react-three/drei";
import MacBook from "./MacBookModel.tsx";
import { useState } from "react";
import { Perf } from "r3f-perf";
import { useHash } from "../../hooks/useHash.ts";
import { useControls } from "leva";
import { useCameraController } from "../../hooks/useCameraControler.ts";
// import ParticleBackground from "./Background.tsx";

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
    defaultPosition: { value: [-3.5, -11, 4], step: 0.1 },
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
    position: { value: [2.2, -0.5, -0.3], step: 0.1 },
    rotationY: { value: -1.45, min: -Math.PI, max: Math.PI, step: 0.01 },
    fontSize: { value: 0.5, min: 0.1, max: 3, step: 0.1 },
    color: { value: "#e0e1dd" },
  });
  const {
    count: particleCount,
    speed: particleSpeed,
    opacity: particleOpacity,
    color: particleColor,
    size: particleSize,
    scale: particleScale,
    noise: particleNoise,
  } = useControls("Background", {
    count: { value: 100, min: 0, max: 1000, step: 1 },
    speed: { value: 1, min: 0.1, max: 5, step: 0.1 },
    opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
    color: { value: "#e0e1dd" },
    size: { value: 0.95, min: 0.01, max: 2, step: 0.01 },
    scale: { value: [8, 4, 8], step: 0.01 },
    noise: { value: 1, step: 0.01 },
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
      <Sparkles
        count={particleCount}
        speed={particleSpeed}
        opacity={particleOpacity}
        color={particleColor}
        size={particleSize}
        scale={particleScale}
        noise={particleNoise}
      />
      <Sparkles
        count={particleCount}
        speed={particleSpeed}
        opacity={particleOpacity}
        color={particleColor}
        size={particleSize}
        scale={particleScale}
        noise={particleNoise}
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
