import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  Text,
} from "@react-three/drei";
import MacBook from "./MacBook.tsx";

export default function Experience() {
  return (
    <Canvas
      className="r3f"
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [-3, 1.5, 4],
      }}
    >
      <Environment preset="apartment" />

      <color args={["#0d1b2a"]} attach="background" />

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
            color="#e0e1dd"
            position={[2.75, 0.5, 0.8]}
            textAlign="center"
            fontSize={1}
            rotation-y={-1.25}
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
              <iframe src="./html" />
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
    </Canvas>
  );
}
