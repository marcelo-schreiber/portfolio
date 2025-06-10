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

export default function Experience() {
  const isDebug = useHash("debug");
  const [isScreenHovered, setIsScreenHovered] = useState(false);

  // Debug controls
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
    textPosition: { value: [2.1, 0.3, 0.8], step: 0.1 },
    textRotationY: { value: -1.25, min: -Math.PI, max: Math.PI, step: 0.01 },
    textFontSize: { value: 0.8, min: 0.1, max: 3, step: 0.1 },
    textColor: { value: "#e0e1dd" },
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
