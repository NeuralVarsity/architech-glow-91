import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Buildings() {
  const group = useRef<THREE.Group>(null);

  const blocks = useMemo(() => {
    const rng = mulberry32(20260814);
    const items: { pos: [number, number, number]; size: [number, number, number]; gold: boolean }[] = [];
    for (let x = -9; x <= 9; x += 1.55) {
      for (let z = -14; z <= 4; z += 1.75) {
        const dist = Math.abs(x) / 9;
        const h = 1 + rng() * (7 - dist * 4.6);
        items.push({
          pos: [x + (rng() - 0.5) * 0.4, h / 2, z + (rng() - 0.5) * 0.4],
          size: [0.75 + rng() * 0.4, h, 0.75 + rng() * 0.4],
          gold: rng() > 0.86,
        });
      }
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * 0.05) * 0.09;
  });

  return (
    <group ref={group}>
      {blocks.map((b, i) => (
        <mesh key={i} position={b.pos} castShadow={false}>
          <boxGeometry args={b.size} />
          <meshStandardMaterial
            color={b.gold ? "#2a2018" : "#171719"}
            emissive={b.gold ? "#D4AF37" : "#5C1F24"}
            emissiveIntensity={b.gold ? 0.5 : 0.16}
            roughness={0.35}
            metalness={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rng = mulberry32(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rng() - 0.5) * 26;
      arr[i * 3 + 1] = rng() * 12;
      arr[i * 3 + 2] = (rng() - 0.5) * 26;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = t * 0.02;
    ref.current.position.y = Math.sin(t * 0.3) * 0.5;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#D4AF37" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 1.6, 0), []);
  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const x = pointer.x * 1.6 + Math.sin(t * 0.12) * 1.2;
    const y = 3.4 + pointer.y * 0.7 + Math.sin(t * 0.18) * 0.35;
    camera.position.lerp(new THREE.Vector3(x, y, 11.5 - Math.sin(t * 0.08) * 1.4), Math.min(delta * 1.6, 1));
    camera.lookAt(target);
  });
  return null;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function CityScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 3.4, 12], fov: 55 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0d0d0e"]} />
      <fog attach="fog" args={["#0d0d0e", 10, 26]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 10, 6]} intensity={1.1} color="#D4AF37" />
      <pointLight position={[-8, 4, -4]} intensity={40} color="#7A232A" distance={30} />
      <pointLight position={[7, 3, 2]} intensity={26} color="#D4AF37" distance={26} />
      <Buildings />
      <Particles />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0a0a0b" roughness={0.25} metalness={0.9} />
      </mesh>
      <CameraRig />
    </Canvas>
  );
}