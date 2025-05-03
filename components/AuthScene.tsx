// components/AuthScene.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";

function VortexParticles() {
  const points = useRef<THREE.Points>(null!);
  const [mouse, setMouse] = useState([0, 0]);

  const count = 5000;
  const radius = 8;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.1;
      points.current.rotation.x += delta * 0.05;

      const positions = points.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        const angle = Math.atan2(y, x);
        const currentRadius = Math.sqrt(x * x + y * y);
        const newRadius = currentRadius * 0.999;

        positions[i] = newRadius * Math.cos(angle + delta * 0.5);
        positions[i + 1] = newRadius * Math.sin(angle + delta * 0.5);
        positions[i + 2] = z * 0.99;

        // Interacción mejorada con el mouse
        const dx = x - mouse[0] * 5;
        const dy = y - mouse[1] * 5;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2) {
          positions[i] += dx * delta * 5;
          positions[i + 1] += dy * delta * 5;
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points
      ref={points}
      positions={new Float32Array(particles)}
      onPointerMove={(e) => {
        // Corrección clave: Verificar existencia de e.uv
        if (e.uv) {
          setMouse([e.uv.x - 0.5, 1 - e.uv.y - 0.5]); // Corrección coordenada Y
        }
      }}
    >
      <PointMaterial
        transparent
        color="#3c8eff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function Effects() {
  return (
    <Sparkles
      count={200}
      size={3}
      speed={0.1}
      opacity={0.8}
      color="#818cf8"
      scale={[15, 15, 15]}
      noise={0.2}
    />
  );
}

export default function AuthScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      className="rounded-l-xl bg-gradient-to-br from-indigo-900 to-blue-900"
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#0f172a"));
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <VortexParticles />
      <Effects />
    </Canvas>
  );
}
