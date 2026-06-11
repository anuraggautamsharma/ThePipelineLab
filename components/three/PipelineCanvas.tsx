"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Airy light-theme particle field: scattered streams converge into one
 * pipeline flowing right — drawn in violet/lavender on white.
 */

const CURVE_COUNT = 14;
const SAMPLES = 220;
const PARTICLES = 1800;

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCurves(rand: () => number) {
  const curves: Float32Array[] = [];
  for (let c = 0; c < CURVE_COUNT; c++) {
    const yStart = (rand() - 0.5) * 6.5;
    const zStart = (rand() - 0.5) * 3.5;
    const yEnd = (rand() - 0.5) * 0.5;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 5; i++) {
      const t = i / 5;
      const x = -10 + 20 * t;
      const converge = t * t * (3 - 2 * t);
      const wobble = Math.sin(t * Math.PI * (1.5 + rand())) * (1 - converge) * 1.4;
      pts.push(
        new THREE.Vector3(
          x,
          THREE.MathUtils.lerp(yStart, yEnd, converge) + wobble,
          THREE.MathUtils.lerp(zStart, 0, converge)
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const sampled = new Float32Array((SAMPLES + 1) * 3);
    for (let i = 0; i <= SAMPLES; i++) {
      const p = curve.getPoint(i / SAMPLES);
      sampled[i * 3] = p.x;
      sampled[i * 3 + 1] = p.y;
      sampled[i * 3 + 2] = p.z;
    }
    curves.push(sampled);
  }
  return curves;
}

function sampleCurve(curve: Float32Array, t: number, out: THREE.Vector3) {
  const f = t * SAMPLES;
  const i = Math.min(SAMPLES - 1, Math.floor(f));
  const frac = f - i;
  const a = i * 3;
  const b = (i + 1) * 3;
  out.set(
    curve[a] + (curve[b] - curve[a]) * frac,
    curve[a + 1] + (curve[b + 1] - curve[a + 1]) * frac,
    curve[a + 2] + (curve[b + 2] - curve[a + 2]) * frac
  );
}

const vertexShader = /* glsl */ `
  attribute float progress;
  attribute float size;
  attribute float tint;
  varying float vProgress;
  varying float vTint;
  void main() {
    vProgress = progress;
    vTint = tint;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (170.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vProgress;
  varying float vTint;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.12, d);
    alpha *= smoothstep(0.0, 0.08, vProgress) * smoothstep(1.0, 0.92, vProgress);
    vec3 violet   = vec3(0.235, 0.075, 0.698); // #3C13B2
    vec3 lavender = vec3(0.808, 0.702, 1.0);   // #CEB3FF
    vec3 base = mix(violet, lavender, vTint);
    gl_FragColor = vec4(base, alpha * 0.55);
  }
`;

function ParticleField() {
  const group = useRef<THREE.Group>(null!);
  const { pointer } = useThree();
  const tmp = useMemo(() => new THREE.Vector3(), []);

  const { curves, offsets, speeds, curveIdx, geometry } = useMemo(() => {
    const rand = mulberry32(7);
    const curves = buildCurves(rand);
    const offsets = new Float32Array(PARTICLES);
    const speeds = new Float32Array(PARTICLES);
    const curveIdx = new Uint16Array(PARTICLES);
    const sizes = new Float32Array(PARTICLES);
    const tints = new Float32Array(PARTICLES);
    for (let i = 0; i < PARTICLES; i++) {
      offsets[i] = rand();
      speeds[i] = 0.02 + rand() * 0.05;
      curveIdx[i] = Math.floor(rand() * CURVE_COUNT);
      sizes[i] = 0.3 + rand() * 1.0;
      tints[i] = rand();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(PARTICLES * 3), 3));
    geometry.setAttribute("progress", new THREE.BufferAttribute(new Float32Array(PARTICLES), 1));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("tint", new THREE.BufferAttribute(tints, 1));
    return { curves, offsets, speeds, curveIdx, geometry };
  }, []);

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const prog = geometry.attributes.progress as THREE.BufferAttribute;
    for (let i = 0; i < PARTICLES; i++) {
      const t = (offsets[i] + time * speeds[i]) % 1;
      sampleCurve(curves[curveIdx[i]], t, tmp);
      pos.setXYZ(i, tmp.x, tmp.y, tmp.z);
      prog.setX(i, t);
    }
    pos.needsUpdate = true;
    prog.needsUpdate = true;

    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.1 - group.current.rotation.y) * Math.min(1, delta * 3);
      group.current.rotation.x += (-pointer.y * 0.06 - group.current.rotation.x) * Math.min(1, delta * 3);
    }
  });

  const lines = useMemo(
    () =>
      curves.map((sampled) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(sampled, 3));
        return g;
      }),
    [curves]
  );

  return (
    <group ref={group}>
      {lines.map((g, i) => (
        <line key={i}>
          <primitive object={g} attach="geometry" />
          <lineBasicMaterial color="#ceb3ff" transparent opacity={0.22} />
        </line>
      ))}
      <points>
        <primitive object={geometry} attach="geometry" />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
        />
      </points>
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
      <ParticleField />
    </Canvas>
  );
}
