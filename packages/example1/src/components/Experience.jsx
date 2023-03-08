import { OrbitControls, ScrollControls } from "@react-three/drei";
import Office from "./offect";
import { Overlay } from "./Overlay";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      {/* <hemisphereLight intensity={1}/> */}
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={3} damping={0.5}>
        <Overlay />
        <Office />
      </ScrollControls>
    </>
  );
};

Experience.diplayName = "Experience";
