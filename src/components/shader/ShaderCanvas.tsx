"use client";

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import type { ShaderPalette } from "./shader-store";

export default function ShaderCanvas({ palette }: { palette: ShaderPalette }) {
  return (
    <ShaderGradientCanvas
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      pixelDensity={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 1.4}
      fov={40}
      pointerEvents="none"
    >
      <ShaderGradient
        control="props"
        animate="on"
        type="waterPlane"
        shader="defaults"
        color1={palette.c1}
        color2={palette.c2}
        color3={palette.c3}
        uSpeed={palette.speed}
        uStrength={palette.strength}
        uDensity={1.6}
        uFrequency={5.5}
        uAmplitude={1}
        brightness={palette.brightness}
        grain="off"
        lightType="3d"
        envPreset="city"
        reflection={0.1}
        cDistance={3.4}
        cPolarAngle={95}
        cAzimuthAngle={180}
        cameraZoom={1}
        positionX={0}
        positionY={-0.6}
        positionZ={0}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        wireframe={false}
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  );
}
