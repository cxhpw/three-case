import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import vertexShader from "../vertexShader";
import fragmentShader from "../fragmentShader";
import { useMemo, useRef } from "react";
import { Mesh } from "three";

export default function practice(props: any) {
  const mesh1 = useRef<Mesh>(null);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
    }),
    [],
  );
  useFrame(state => {
    const { clock } = state;
    mesh1.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });
  return (
    <>
      <axesHelper />
      <OrbitControls />
      <group>
        <mesh
          ref={mesh1}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}>
          <planeGeometry args={[1, 1, 32, 32]} />
          <shaderMaterial
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={uniforms}
            wireframe
          />
        </mesh>
      </group>
      <group>
        <mesh position={[0, 0, 0]} scale={1.0}>
          <planeGeometry args={[1, 1, 32, 32]} />
          <shaderMaterial
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
          />
        </mesh>
      </group>
    </>
  );
}
