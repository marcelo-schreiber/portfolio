import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useRef } from "react";
import type { JSX } from "react";

type GLTFResult = GLTF & {
  nodes: {
    FrontCameraRing001: THREE.Mesh;
    Circle: THREE.Mesh;
    Circle_1: THREE.Mesh;
    Circle_2: THREE.Mesh;
    KeyboardKeyHole: THREE.Mesh;
    Circle012: THREE.Mesh;
    Circle012_1: THREE.Mesh;
    Circle002: THREE.Mesh;
    Circle002_1: THREE.Mesh;
    Circle002_2: THREE.Mesh;
    Circle002_3: THREE.Mesh;
    Circle002_4: THREE.Mesh;
    Circle001: THREE.Mesh;
    Circle001_1: THREE.Mesh;
    Circle001_2: THREE.Mesh;
    Circle001_3: THREE.Mesh;
    Circle001_4: THREE.Mesh;
  };
  materials: {
    ["CameraRIngBlack.002"]: THREE.MeshStandardMaterial;
    ["Keyboard.001"]: THREE.MeshStandardMaterial;
    Key: THREE.MeshStandardMaterial;
    Touchbar: THREE.MeshStandardMaterial;
    HingeBlack: THREE.MeshStandardMaterial;
    HingeMetal: THREE.MeshStandardMaterial;
    ["Frame.002"]: THREE.MeshStandardMaterial;
    ScreenGlass: THREE.MeshStandardMaterial;
    Rubber: THREE.MeshStandardMaterial;
    DisplayGlass: THREE.MeshStandardMaterial;
    HeadPhoneHole: THREE.MeshStandardMaterial;
    USB_C_INSIDE: THREE.MeshStandardMaterial;
    TouchbarBorder: THREE.MeshStandardMaterial;
    Keyboard: THREE.MeshStandardMaterial;
  };
};

type ModelProps = JSX.IntrinsicElements["group"] & {
  onLidOpened?: () => void;
};

export default function Model(props: ModelProps) {
  const hasOpenedLid = useRef(false);
  const { nodes, materials } = useGLTF(
    "https://bnxj81q9iw.ufs.sh/f/e4B6MY9bdUcqe4wpGEobdUcqSyoPNA2jFYKxT6p7MEBngv9V?ext=.glb",
  ) as unknown as GLTFResult;

  const { rotation } = useSpring({
    from: {
      rotation: 2.6,
    },
    to: {
      rotation: 1.311,
    },
    config: {
      tension: 170,
      friction: 50,
    },
    onChange: ({ value }) => {
      if (!hasOpenedLid.current && value.rotation <= 1.45) {
        hasOpenedLid.current = true;
        props.onLidOpened?.();
      }
    },
  });

  return (
    <group {...props} dispose={null}>
      {props.children}
      <group position={[0, 0.519, 0]} scale={0.103}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontCameraRing001.geometry}
          material={materials["CameraRIngBlack.002"]}
          position={[-0.155, 19.571, -16.158]}
          scale={0.202}
        />

        <group position={[-0.029, 0.001, -3.845]} scale={11.827}>
          <mesh
            geometry={nodes.Circle.geometry}
            material={materials["Keyboard.001"]}
          />
          <mesh geometry={nodes.Circle_1.geometry} material={materials.Key} />
          <mesh
            geometry={nodes.Circle_2.geometry}
            material={materials.Touchbar}
          />
        </group>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeyboardKeyHole.geometry}
          material={materials["Keyboard.001"]}
          position={[-0.042, -0.043, -3.825]}
          scale={11.908}
        />

        <group position={[-0.014, -0.211, -10.56]} scale={11.678}>
          <mesh
            geometry={nodes.Circle012.geometry}
            material={materials.HingeBlack}
          />
          <mesh
            geometry={nodes.Circle012_1.geometry}
            material={materials.HingeMetal}
          />
        </group>

        {/* LID */}
        <animated.group
          position={[-0.014, -0.211, -10.56]}
          rotation-x={rotation.to((r) => r - 1.311)}
        >
          <group
            position={[0.007 - -0.014, 9.819 - -0.211, -13.354 - -10.56]}
            rotation={[1.311, 0, 0]}
            scale={15.209}
          >
            <mesh
              geometry={nodes.Circle002.geometry}
              material={materials["Frame.002"]}
            />
            <mesh
              geometry={nodes.Circle002_1.geometry}
              material={materials.HingeMetal}
            />
            <mesh
              geometry={nodes.Circle002_2.geometry}
              material={materials.ScreenGlass}
            />
            <mesh
              geometry={nodes.Circle002_3.geometry}
              material={materials.Rubber}
            />
            <mesh
              geometry={nodes.Circle002_4.geometry}
              material={materials.DisplayGlass}
            />
          </group>
        </animated.group>

        <group position={[0, -0.263, 0.002]} scale={15.209}>
          <mesh
            geometry={nodes.Circle001.geometry}
            material={materials["Frame.002"]}
          />
          <mesh
            geometry={nodes.Circle001_1.geometry}
            material={materials.HeadPhoneHole}
          />
          <mesh
            geometry={nodes.Circle001_2.geometry}
            material={materials.USB_C_INSIDE}
          />
          <mesh
            geometry={nodes.Circle001_3.geometry}
            material={materials.TouchbarBorder}
          />
          <mesh
            geometry={nodes.Circle001_4.geometry}
            material={materials.Keyboard}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(
  "https://bnxj81q9iw.ufs.sh/f/e4B6MY9bdUcqe4wpGEobdUcqSyoPNA2jFYKxT6p7MEBngv9V?ext=.glb",
);
