import { Canvas, useFrame, createPortal } from "@react-three/fiber";
import { useRef } from "react";
import {
  useFBO,
  OrbitControls,
  Environment,
  PerspectiveCamera,
  RenderTexture,
  ScrollControls,
  Stars,
  Sky,
} from "@react-three/drei";
//@ts-ignore
import * as THREE from "three";
import "./App.css";
import "./scene.css";

const InfinityMirror = () => {
  const mesh = useRef<mesh>(null);
  const renderTarget = useFBO();

  useFrame(state => {
    const { gl, scene, camera } = state;
    mesh.current.material.map = null;

    gl.setRenderTarget(renderTarget);
    gl.render(scene, camera);

    mesh.current.material.map = renderTarget.texture;

    gl.setRenderTarget(null);
  });

  return (
    <>
      <Sky sunPosition={[10, 10, 0]} />
      <directionalLight args={[10, 10, 0]} intensity={1} />
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <mesh position={[-2, 0, 0]}>
        <dodecahedronGeometry args={[1]} />
        <meshPhysicalMaterial
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          color="#73B9ED"
        />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <dodecahedronGeometry args={[1]} />
        <meshPhysicalMaterial
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          color="#73B9ED"
        />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <dodecahedronGeometry args={[1]} />
        <meshPhysicalMaterial
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          color="#73B9ED"
        />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <dodecahedronGeometry />
        <meshPhysicalMaterial
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          color="#73B9ED"
        />
      </mesh>
      <mesh ref={mesh} scale={1}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
};
function App() {
  const mesh = useRef();
  return (
    <Canvas camera={{ position: [0, 4, 4] }} dpr={[1, 2]}>
      <Stars radius={100} fade></Stars>
      <ambientLight intensity={0.1} />
      <Environment preset="sunset" />
      <mesh></mesh>
      <OrbitControls></OrbitControls>
    </Canvas>
  );
}

export default App;
