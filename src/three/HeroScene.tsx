import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { Mesh } from "three";

// One idea: a single iridescent chrome torus-knot sculpture lit by studio
// strips. Environment is built from Lightformers, so no HDR file is downloaded.
function Sculpture({ reduced, small }: { reduced: boolean; small: boolean }) {
  const ref = useRef<Mesh>(null);
  useFrame((state, dt) => {
    const m = ref.current;
    if (!m) return;
    const k = Math.min(1, dt * 3);
    const tx = reduced ? 0 : state.pointer.y * 0.5;
    const ty = reduced ? 0 : state.pointer.x * 0.7;
    m.rotation.x += (tx - m.rotation.x) * k;
    m.rotation.y +=
      ((reduced ? 0 : state.clock.elapsedTime * 0.12) + ty - m.rotation.y) * k;
    m.position.y = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
  });
  return (
    <mesh ref={ref} scale={small ? 0.85 : 1}>
      <torusKnotGeometry
        args={[1, 0.34, small ? 96 : 160, small ? 12 : 24, 2, 3]}
      />
      <meshPhysicalMaterial
        color="#d9dde6"
        metalness={1}
        roughness={0.12}
        iridescence={1}
        iridescenceIOR={1.6}
        iridescenceThicknessRange={[200, 700]}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

export default function HeroScene({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean;
}) {
  const small = typeof window !== "undefined" && window.innerWidth < 700;
  return (
    <Canvas
      // 'never' pauses rendering while the hero is offscreen; 'demand' for reduced motion
      frameloop={!active ? "never" : reduced ? "demand" : "always"}
      dpr={[1, small ? 1.25 : 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 40 }}
      gl={{ antialias: !small, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <Sculpture reduced={reduced} small={small} />
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={4}
          position={[-4, 2, 3]}
          scale={[6, 1.2, 1]}
          color="#ff5b3a"
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[4, -1, 2]}
          scale={[5, 1, 1]}
          color="#6ea8ff"
        />
        <Lightformer
          form="ring"
          intensity={2}
          position={[0, 4, -3]}
          scale={4}
          color="#ffffff"
        />
      </Environment>
    </Canvas>
  );
}
