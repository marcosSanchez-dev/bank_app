"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";

function VortexParticles() {
  const points = useRef<THREE.Points>(null!);
  const [mouse, setMouse] = useState([0, 0]);
  const [hue] = useState(() => Math.random());
  const size = useRef(new Float32Array(5000));

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

      size.current[i / 3] = 0.02 + Math.random() * 0.08;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Movimiento suave de cámara
    state.camera.position.lerp(
      new THREE.Vector3(
        mouse[0] * 2,
        mouse[1] * 2,
        10 + Math.sin(time * 0.5) * 2
      ),
      0.05
    );
    state.camera.lookAt(0, 0, 0);

    if (points.current) {
      points.current.rotation.y += delta * 0.1;
      points.current.rotation.x += delta * 0.05;

      const positions = points.current.geometry.attributes.position
        .array as Float32Array;
      const colors = [];

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

        const dx = x - mouse[0] * 5;
        const dy = y - mouse[1] * 5;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const hueShift = (hue + (z / radius) * 0.5 + time * 0.1) % 1;
        colors.push(...new THREE.Color().setHSL(hueShift, 0.9, 0.6).toArray());

        // Interacción magnética mejorada
        const influenceRadius = 3 + Math.sin(time) * 1.5;
        if (distance < influenceRadius) {
          const force = (1 - distance / influenceRadius) * 15;
          positions[i] += dx * delta * force;
          positions[i + 1] += dy * delta * force;
          size.current[i / 3] = Math.min(
            0.2,
            size.current[i / 3] + delta * 0.5
          );
        } else {
          size.current[i / 3] *= 0.98;
        }
      }

      points.current.geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points
      ref={points}
      positions={particles}
      onPointerMove={(e) => {
        if (e.uv) {
          setMouse([e.uv.x - 0.5, 1 - e.uv.y - 0.5]);
        }
      }}
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        onBeforeCompile={(shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            "gl_FragColor = vec4(color, opacity);",
            `
            float intensity = length(vColor.rgb * 2.0);
            vec3 glow = vec3(0.4) * intensity * intensity;
            gl_FragColor = vec4(color.rgb + glow, opacity * (0.8 + intensity * 0.4));
            `
          );
        }}
      />
    </Points>
  );
}

function Effects() {
  return (
    <>
      <Sparkles
        count={300}
        size={4}
        speed={0.2}
        color="white"
        scale={20}
        noise={0.3}
      />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#3c8eff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

export default function AuthScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        className="bg-gradient-to-br from-indigo-900 to-blue-900"
        onCreated={({ gl, camera }) => {
          gl.setClearColor(new THREE.Color("#0f172a"));

          const updateSize = () => {
            if (
              containerRef.current &&
              camera instanceof THREE.PerspectiveCamera
            ) {
              const width = containerRef.current.clientWidth;
              const height = containerRef.current.clientHeight;

              camera.aspect = width / height;
              camera.updateProjectionMatrix();
              gl.setSize(width, height);
              gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }
          };

          const resizeObserver = new ResizeObserver(updateSize);
          if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
          }

          updateSize();

          return () => resizeObserver.disconnect();
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <VortexParticles />
        <Effects />
      </Canvas>
    </div>
  );
}
