import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Icosahedron({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={ref}
        position={position}
        scale={hovered ? 1.3 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#bc13fe"
          emissive="#bc13fe"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Sphere({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <MeshDistortMaterial
          color="#05ffa1"
          emissive="#05ffa1"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
          distort={0.4}
          speed={3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function MouseFollower() {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (ref.current) {
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      ref.current.position.x += (x - ref.current.position.x) * 0.05;
      ref.current.position.y += (y - ref.current.position.y) * 0.05;
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.4, 2]} />
      <meshStandardMaterial
        color="#bc13fe"
        emissive="#05ffa1"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} color="#bc13fe" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#05ffa1" intensity={0.8} />
        
        <Icosahedron position={[-3, 2, 0]} />
        <Icosahedron position={[3.5, -1.5, -2]} />
        <Sphere position={[2, 2.5, -1]} />
        <Sphere position={[-2.5, -2, 1]} />
        <MouseFollower />
      </Canvas>
    </div>
  );
}
