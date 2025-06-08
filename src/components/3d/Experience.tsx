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

export default function Experience() {
  const isDebug = useHash("debug");
  const [isScreenHovered, setIsScreenHovered] = useState(false);
  const { camera } = useThree();
  const timeoutRef = useRef<NodeJS.Timeout>(null);

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
      cloneCamera.position.set(0.5, 1.5, 2);
      cloneCamera.lookAt(-0.05, 0.4, -1.4);
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

      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2.0, 0.1);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.5, 0.1);
    } else {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4, 0.1);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, -3, 0.1);
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
          <MacBook
            position-y={-1.3}
            onPointerEnter={() => debouncedSetHover(true)}
            onPointerLeave={() => debouncedSetHover(false)}
          >
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
