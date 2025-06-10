import { useCallback, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerOptions {
  hoveredCameraPosition: [number, number, number];
  defaultCameraPosition: [number, number, number];
  cameraLookAtTarget: [number, number, number];
  isScreenHovered: boolean;
}

export function useCameraController({
  hoveredCameraPosition,
  defaultCameraPosition,
  cameraLookAtTarget,
  isScreenHovered,
}: CameraControllerOptions) {
  const { camera } = useThree();
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const debouncedSetHover = useCallback(
    (value: boolean, callback: (value: boolean) => void) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(value);
      }, 100);
    },
    []
  );

  useFrame(() => {
    if (isScreenHovered) {
      const cloneCamera = camera.clone();
      cloneCamera.position.set(...hoveredCameraPosition);
      cloneCamera.lookAt(...cameraLookAtTarget);

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

      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        cloneCamera.rotation.x,
        0.088
      );
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        cloneCamera.rotation.y,
        0.088
      );
      camera.rotation.z = THREE.MathUtils.lerp(
        camera.rotation.z,
        cloneCamera.rotation.z,
        0.088
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

  return { debouncedSetHover };
}
