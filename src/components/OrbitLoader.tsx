import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
}

function OrbitPath({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 8, 64]} />
      <meshBasicMaterial color="#bc13fe" transparent opacity={0.2} />
    </mesh>
  );
}

export default function OrbitLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-32 h-32">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <OrbitPath radius={1} />
          <OrbitPath radius={1.5} />
          <OrbitRing radius={1} speed={2} color="#bc13fe" />
          <OrbitRing radius={1.5} speed={-1.5} color="#05ffa1" />
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
        </Canvas>
      </div>
      <p className="text-muted-foreground text-sm animate-pulse-neon">{text}</p>
    </div>
  );
}
