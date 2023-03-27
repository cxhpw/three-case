import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  useFBO,
  Environment,
  Sky,
  ScrollControls,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import Overlay from "./components/Overlay";
import Gradient from "./components/Gradient";
//@ts-ignore
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
      <color attach="background" args={["#000000"]}></color>
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
  return (
    <>
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={["#000000"]}></color>
        <Stars radius={100} fade></Stars>
        <Environment preset="sunset" />
        <ScrollControls pages={3} damping={0.5}>
          <Gradient></Gradient>
          <Overlay></Overlay>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
