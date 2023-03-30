import React from "react";

import Sound from "./sounds/ambient.mp3";
import Sound2 from "./sounds/ambient-rain.mp3";
import Sound3 from "./sounds/ambient-happy.mp3";
import { Model } from "../models/Scene";
import {
  Environment,
  Sparkles,
  ScrollControls,
  Scroll,
  PositionalAudio,
  Float,
} from "@react-three/drei";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useEffect, useRef } from "react";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";

export default function Butterfly() {
  const data = [
    {
      html: `<h1 style={{ marginBottom: "0px" }}>
      Life can be a struggle
    </h1>`,
    },
    {
      html: `<h1 style={{ marginBottom: "0px" }}>
      Sometimes you can feel
    </h1>`,
    },
    {
      html: `<h1 style={{ marginBottom: "0px" }}>Lost</h1>
      <h1 style={{ marginBottom: "0px" }}>Overwhelmed</h1>
      <h1 style={{ marginBottom: "0px" }}>Empty inside</h1>`,
    },
    {
      html: `<h1 style={{ marginBottom: "0px" }}>
      Drifting through life <br />
      With no help or guidance
    </h1>`,
    },
    {
      html: `<h1 style={{ marginBottom: "0px" }}>
      But there is hope...
      <br /> and people who can help
    </h1>`,
    },
    {
      html: `<h1 style={{ marginBottom: "0px" }}>
      It's time to get
      <br /> the support you need
    </h1>
    <h2 style={{ marginBottom: "30px", marginTop: "-20px" }}>
      To get your life back
    </h2>
    `,
    },
  ];
  return (
    <>
      <ambientLight intensity={1}></ambientLight>
      <Environment preset="sunset" />
      <ScrollControls pages={6} damping={0.25}>
        <Scroll>
          <Model scale={0.05} position={[0, -2.5, 0]} />
        </Scroll>
        {/* @ts-ignore */}
        <Scroll html style={{ width: "100%" }}>
          <Container
            style={{
              position: "relative",
            }}>
            {data.map((item, index) => (
              <Row
                key={`htmlContent-${index}`}
                className="text-center items-center justify-content-center"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100vh",
                  padding: "0 30px 0",
                  top: `${index * 100}vh`,
                }}>
                <Col xs={6}>
                  <>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.html,
                      }}
                    />
                    {index === data.length - 1 ? (
                      //@ts-ignore
                      <Button variant="outline-light" size="lg">
                        Get help now
                      </Button>
                    ) : null}
                  </>
                </Col>
              </Row>
            ))}
          </Container>
        </Scroll>
      </ScrollControls>
    </>
  );
}
