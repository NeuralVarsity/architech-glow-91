import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Tower() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.16;
    // responds to the mouse: subtle lean + lift
    const targetX = -pointer.y * 0.22;
    const targetZ = pointer.x * 0.1;
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 2.2, 1);
    group.current.rotation.z += (targetZ - group.current.rotation.z) * Math.min(delta * 2.2, 1);
    group.current.position.y = -3.4 + Math.sin(clock.elapsedTime * 0.6) * 0.09;
  });

  const tiers = [
    { y: 0.6, w: 2.6, h: 1.2 },
    { y: 2.0, w: 2.2, h: 1.6 },
    { y: 3.7, w: 1.8, h: 1.8 },
    { y: 5.4, w: 1.35, h: 1.6 },
    { y: 6.9, w: 0.95, h: 1.4 },
  ];

  return (
    <group ref={group} position={[0, -3.4, 0]}>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[3.4, 3.6, 0.2, 6]} />
        <meshStandardMaterial color="#1b1b1d" metalness={0.9} roughness={0.3} />
      </mesh>
      {tiers.map((t, i) => (
        <group key={i} position={[0, t.y, 0]}>
          <mesh>
            <boxGeometry args={[t.w, t.h, t.w]} />
            <meshPhysicalMaterial
              color="#101012"
              metalness={1}
              roughness={0.06}
              reflectivity={1}
              clearcoat={1}
              clearcoatRoughness={0.04}
              emissive="#5C1F24"
              emissiveIntensity={0.26}
            />
          </mesh>
          {/* reflective gold banding between tiers */}
          <mesh position={[0, -t.h / 2 + 0.06, 0]}>
            <boxGeometry args={[t.w * 1.06, 0.07, t.w * 1.06]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={1}
              roughness={0.12}
              emissive="#D4AF37"
              emissiveIntensity={0.5}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(t.w * 1.005, t.h * 1.005, t.w * 1.005)]} />
            <lineBasicMaterial color="#D4AF37" transparent opacity={0.95} />
          </lineSegments>
        </group>
      ))}
      <mesh position={[0, 8.4, 0]}>
        <cylinderGeometry args={[0.02, 0.12, 1.8, 8]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1.6} />
      </mesh>
    </group>
  );
}

export default function TowerScene() {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [7, 3.5, 9], fov: 45 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFC978" />
      <pointLight position={[-6, 2, -4]} intensity={30} color="#7A232A" distance={24} />
      <pointLight position={[4, 6, 6]} intensity={22} color="#D4AF37" distance={26} />
      <Tower />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate={false}
      />
    </Canvas>
  );
}