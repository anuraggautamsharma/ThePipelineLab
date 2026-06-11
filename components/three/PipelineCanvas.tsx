"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Refined hero field: thin contour-like stream lines converging toward a
 * single channel. Flow is suggested by a soft gradient of light traveling
 * along each line — no particles, no noise.
 */

const CURVE_COUNT = 11;
const SAMPLES = 260;

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const vertexShader = /* glsl */ `
  attribute float t;
  varying float vT;
  void main() {
    vT = t;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  varying float vT;
  void main() {
    vec3 lavender = vec3(0.808, 0.702, 1.0);  // #CEB3FF
    vec3 violet   = vec3(0.235, 0.075, 0.698); // #3C13B2
    // base hairline
    float alpha = 0.16;
    // soft pulse of light traveling left -> right
    float pulse = fract(vT - uTime * 0.07 - uPhase);
    float glow = smoothstep(0.18, 0.0, pulse) * 0.5;
    vec3 color = mix(lavender, violet, glow * 1.6);
    gl_FragColor = vec4(color, alpha + glow);
  }
`;

function FlowLines() {
  const group = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  const lines = useMemo(() => {
    const rand = mulberry32(11);
    return Array.from({ length: CURVE_COUNT }, (_, c) => {
      const yStart = (c / (CURVE_COUNT - 1) - 0.5) * 7.5 + (rand() - 0.5) * 0.8;
      const zStart = (rand() - 0.5) * 2.5;
      const yEnd = (rand() - 0.5) * 0.35;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 5; i++) {
        const t = i / 5;
        const x = -11 + 22 * t;
        const converge = t * t * (3 - 2 * t);
        const wobble = Math.sin(t * Math.PI * (1.2 + rand() * 0.8)) * (1 - converge) * 1.1;
        pts.push(
          new THREE.Vector3(
            x,
            THREE.MathUtils.lerp(yStart, yEnd, converge) + wobble,
            THREE.MathUtils.lerp(zStart, 0, converge)
          )
        );
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const positions = new Float32Array((SAMPLES + 1) * 3);
      const ts = new Float32Array(SAMPLES + 1);
      for (let i = 0; i <= SAMPLES; i++) {
        const p = curve.getPoint(i / SAMPLES);
        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
        ts[i] = i / SAMPLES;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("t", new THREE.BufferAttribute(ts, 1));
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uPhase: { value: rand() },
        },
      });
      return { geometry, material };
    });
  }, []);

  useFrame(({ clock }, delta) => {
    for (const l of lines) l.material.uniforms.uTime.value = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.06 - group.current.rotation.y) * Math.min(1, delta * 2.5);
      group.current.rotation.x += (-pointer.y * 0.04 - group.current.rotation.x) * Math.min(1, delta * 2.5);
    }
  });

  return (
    <group ref={group}>
      {lines.map((l, i) => (
        <line key={i}>
          <primitive object={l.geometry} attach="geometry" />
          <primitive object={l.material} attach="material" />
        </line>
      ))}
    </group>
  );
}

export default function PipelineCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10.5], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
    >
      <FlowLines />
    </Canvas>
  );
}
