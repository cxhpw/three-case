import React, { useRef, useState } from "react";
import fragmentShader from "../fragmentShader";
import vertexShader from "../vertexShader";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`,
);

extend({ ImageFadeMaterial });

function FadingImage() {
  const ref = useRef();
  const [texture1, texture2, dispTexture] = useTexture([
    "https://uploads.codesandbox.io/uploads/user/a3159b6f-2a33-4771-aed9-17b7b55f49f5/cjYf-Img1.jpg",
    "https://uploads.codesandbox.io/uploads/user/a3159b6f-2a33-4771-aed9-17b7b55f49f5/3OXB-Img2.jpg",
    "https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/tNPD-13.jpg",
  ]);
  const [hovered, setHover] = useState(false);
  useFrame(() => {
    //@ts-ignore
    ref.current.dispFactor = THREE.MathUtils.lerp(
      //@ts-ignore
      ref.current.dispFactor,
      hovered ? 1 : 0,
      0.075,
    );
  });
  return (
    <mesh
      position={[0, 0, 0]}
      scale={3.0}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <planeGeometry />
      <imageFadeMaterial
        ref={ref}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
        toneMapped={false}
      />
    </mesh>
  );
}

const Gradient = () => {
  const mesh = useRef();
  return <FadingImage />;
};

export default Gradient;
