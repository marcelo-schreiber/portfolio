"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

interface ParticleBackgroundProps {
  count: number;
  color: string;
  size: number;
  speed: number;
  fadeDistance: number;
}

export default function ParticleBackground({
  count,
  color,
  size,
  speed,
  fadeDistance
}: ParticleBackgroundProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { camera } = useThree();

  // Generate random positions and velocities for particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ],
        velocity: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ],
        scale: Math.random() * 0.5 + 0.5,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // Update particle positions
      particle.position[0] += particle.velocity[0] * speed;
      particle.position[1] += particle.velocity[1] * speed;
      particle.position[2] += particle.velocity[2] * speed;

      // Wrap particles around the scene
      if (particle.position[0] > 10) particle.position[0] = -10;
      if (particle.position[0] < -10) particle.position[0] = 10;
      if (particle.position[1] > 10) particle.position[1] = -10;
      if (particle.position[1] < -10) particle.position[1] = 10;
      if (particle.position[2] > 10) particle.position[2] = -10;
      if (particle.position[2] < -10) particle.position[2] = 10;

      // Calculate distance from camera
      const particleVector = new THREE.Vector3(
        particle.position[0],
        particle.position[1],
        particle.position[2]
      );
      const distanceToCamera = camera.position.distanceTo(particleVector);

      if (distanceToCamera < fadeDistance) {
        // Fade out particles that are too far
        dummy.scale.set(0, 0, 0);
      } else {
        dummy.scale.set(
          particle.scale,
          particle.scale,
          particle.scale
        );
      }

      // Set position and scale for each instance
      dummy.position.set(
        particle.position[0],
        particle.position[1],
        particle.position[2]
      );
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <torusGeometry args={[size, size / 4, 16, 100]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </Float>
  );
}