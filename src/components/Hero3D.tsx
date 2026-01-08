import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, Box } from "@react-three/drei";
import * as THREE from "three";

// Professional neural network nodes
const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => [
    { pos: [-2, 1.5, -2] as [number, number, number], size: 0.12 },
    { pos: [-1.5, 0.8, -1] as [number, number, number], size: 0.1 },
    { pos: [-2.5, 0, -1.5] as [number, number, number], size: 0.08 },
    { pos: [-1, 1.2, -2.5] as [number, number, number], size: 0.1 },
    { pos: [-2, -0.5, -2] as [number, number, number], size: 0.09 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <Sphere args={[node.size, 16, 16]} position={node.pos}>
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

// Data flow visualization - floating data cubes
const DataFlow = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const cubes = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      pos: [
        2 + Math.random() * 1.5,
        (Math.random() - 0.5) * 3,
        -2 + Math.random() * -2
      ] as [number, number, number],
      size: 0.08 + Math.random() * 0.06,
      speed: 0.5 + Math.random() * 0.5,
    })), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={cube.speed} rotationIntensity={0.4} floatIntensity={0.5}>
          <Box args={[cube.size, cube.size, cube.size]} position={cube.pos}>
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#2563eb"
              emissiveIntensity={0.5}
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={0.85}
            />
          </Box>
        </Float>
      ))}
    </group>
  );
};

// Analytics ring - represents data analysis
const AnalyticsRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <Torus ref={ringRef} args={[1.8, 0.04, 16, 64]} position={[0, 0.5, -3]}>
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </Torus>
    </Float>
  );
};

// Floating data particles
const DataParticles = () => {
  const count = 20;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 3,
        ],
        scale: Math.random() * 0.05 + 0.02,
        speed: Math.random() * 0.5 + 0.3,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime() * 0.3;
      particles.forEach((particle, i) => {
        dummy.position.set(
          particle.position[0] + Math.sin(time * particle.speed + i) * 0.4,
          particle.position[1] + Math.cos(time * particle.speed + i * 0.5) * 0.3,
          particle.position[2]
        );
        dummy.scale.setScalar(particle.scale * (1 + Math.sin(time + i) * 0.3));
        dummy.updateMatrix();
        mesh.current!.setMatrixAt(i, dummy.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
    </instancedMesh>
  );
};

// Central AI core sphere
const AICore = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <Sphere ref={meshRef} args={[0.6, 32, 32]} position={[0, 0, -1]}>
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4f46e5"
          emissiveIntensity={0.5}
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
};

// Accent floating spheres
const AccentSpheres = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[0.18, 16, 16]} position={[2.5, 2, -2]}>
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Sphere args={[0.12, 16, 16]} position={[-3, -1.5, -1]}>
          <meshStandardMaterial
            color="#ec4899"
            emissive="#db2777"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
        <Sphere args={[0.15, 16, 16]} position={[1, -2, -3]}>
          <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
        </Sphere>
      </Float>
    </>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -5, 5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 8, 5]} intensity={0.6} color="#06b6d4" />
      
      <NeuralNetwork />
      <DataFlow />
      <AnalyticsRing />
      <AICore />
      <AccentSpheres />
      <DataParticles />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-50">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Hero3D;
