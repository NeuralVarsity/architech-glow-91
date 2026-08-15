import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** Glass-curtain towers with lit window bands and reflective gold crowns. */
function Buildings() {
  const group = useRef<THREE.Group>(null);

  const blocks = useMemo(() => {
    const rng = mulberry32(20260814);
    const items: {
      pos: [number, number, number];
      size: [number, number, number];
      gold: boolean;
      hue: number;
    }[] = [];
    for (let x = -10; x <= 10; x += 1.5) {
      for (let z = -16; z <= 4; z += 1.7) {
        const dist = Math.abs(x) / 10;
        const h = 1.2 + rng() * (6.2 - dist * 3.8);
        items.push({
          pos: [x + (rng() - 0.5) * 0.4, h / 2, z + (rng() - 0.5) * 0.4],
          size: [0.7 + rng() * 0.45, h, 0.7 + rng() * 0.45],
          gold: rng() > 0.93 && h < 3.2 && z < -6,
          hue: rng(),
        });
      }
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * 0.045) * 0.07;
  });

  return (
    <group ref={group}>
      {blocks.map((b, i) => (
        <group key={i} position={b.pos}>
          <mesh>
            <boxGeometry args={b.size} />
            <meshPhysicalMaterial
              color="#0f1113"
              emissive={b.gold ? "#8a6a24" : "#6b2a24"}
              emissiveIntensity={b.gold ? 0.14 : 0.07 + b.hue * 0.1}
              roughness={0.34}
              metalness={0.8}
              reflectivity={1}
              clearcoat={1}
              clearcoatRoughness={0.06}
            />
          </mesh>
          {/* glass edge highlight */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(...b.size)]} />
            <lineBasicMaterial
              color={b.gold ? "#D4AF37" : "#8f7a4a"}
              transparent
              opacity={b.gold ? 0.75 : 0.22}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

/** Soft drifting fog sheets for cinematic depth. */
function FogLayers() {
  const layers = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!layers.current) return;
    const t = clock.elapsedTime;
    layers.current.children.forEach((c, i) => {
      c.position.x = Math.sin(t * (0.03 + i * 0.012) + i) * 6;
      c.position.y = 0.9 + i * 1.5 + Math.sin(t * 0.12 + i) * 0.25;
    });
  });
  return (
    <group ref={layers}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 1 + i * 1.5, -6 + i * 2.5]} rotation={[-Math.PI / 2.35, 0, 0]}>
          <planeGeometry args={[46, 22]} />
          <meshBasicMaterial
            color={i % 2 ? "#4a2b22" : "#2b2118"}
            transparent
            opacity={0.11 - i * 0.015}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Fake depth-of-field: blurred out-of-focus foreground silhouettes. */
function ForegroundBokeh() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (ref.current) ref.current.position.x = pointer.x * -1.4 + Math.sin(clock.elapsedTime * 0.1) * 0.5;
  });
  return (
    <group ref={ref} position={[0, 0, 8]}>
      {[-6.5, -3.2, 3.4, 6.8].map((x, i) => (
        <mesh key={x} position={[x, 3 + (i % 2) * 2, 0]}>
          <boxGeometry args={[2.4 + i * 0.3, 12, 2]} />
          <meshBasicMaterial color="#08080a" transparent opacity={0.82} />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count = 320 }: { count?: number }) {
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
      <pointsMaterial
        size={0.075}
        color="#E6C664"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 1.8, 0), []);
  const scratch = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    // continuous cinematic drift + pointer parallax
    const x = pointer.x * 2.1 + Math.sin(t * 0.11) * 1.6;
    const y = 3.5 + pointer.y * 0.9 + Math.sin(t * 0.17) * 0.45;
    const z = 11.8 - Math.sin(t * 0.07) * 1.8;
    camera.position.lerp(scratch.set(x, y, z), Math.min(delta * 1.2, 1));
    target.y = 1.8 + Math.sin(t * 0.14) * 0.18;
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
      camera={{ position: [0, 3.5, 12], fov: 55 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0b0b0d"]} />
      <fog attach="fog" args={["#170f0c", 9, 32]} />
      <ambientLight intensity={0.34} />
      <hemisphereLight args={["#FFB65C", "#180d0a", 0.5]} />
      {/* low golden sun */}
      <directionalLight position={[9, 8, -6]} intensity={0.9} color="#FFB65C" />
      <directionalLight position={[-6, 10, 6]} intensity={0.45} color="#D4AF37" />
      <pointLight position={[-8, 4, -4]} intensity={42} color="#7A232A" distance={32} />
      <pointLight position={[7, 3, 2]} intensity={30} color="#D4AF37" distance={28} />
      <Buildings />
      <FogLayers />
      <Particles />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#0a0a0b" roughness={0.12} metalness={0.95} />
      </mesh>
      <ForegroundBokeh />
      <CameraRig />
    </Canvas>
  );
}