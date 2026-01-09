import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, Box, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

// Galaxy spiral particles
const GalaxyParticles = () => {
  const points = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 8 + 2;
      const spinAngle = radius * 1.5;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY - 1;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ - 5;
      
      const mixedColor = new THREE.Color();
      const innerColor = new THREE.Color('#22d3ee');
      const outerColor = new THREE.Color('#a855f7');
      mixedColor.lerpColors(innerColor, outerColor, radius / 10);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Neural network nodes
const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => [
    { pos: [-3, 2, -3] as [number, number, number], size: 0.1 },
    { pos: [-2, 1, -2] as [number, number, number], size: 0.08 },
    { pos: [-3.5, 0, -2.5] as [number, number, number], size: 0.07 },
    { pos: [-2, 1.5, -3.5] as [number, number, number], size: 0.09 },
    { pos: [-2.5, -0.5, -2] as [number, number, number], size: 0.08 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
          <Sphere args={[node.size, 16, 16]} position={node.pos}>
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={0.8}
              roughness={0.1}
              metalness={0.9}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

// Data flow cubes
const DataFlow = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const cubes = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ({
      pos: [
        3 + Math.random() * 2,
        (Math.random() - 0.5) * 4,
        -3 + Math.random() * -3
      ] as [number, number, number],
      size: 0.08 + Math.random() * 0.05,
      speed: 0.5 + Math.random() * 0.5,
    })), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={cube.speed} rotationIntensity={0.5} floatIntensity={0.6}>
          <Box args={[cube.size, cube.size, cube.size]} position={cube.pos}>
            <meshStandardMaterial
              color={i % 2 === 0 ? "#22d3ee" : "#a855f7"}
              emissive={i % 2 === 0 ? "#06b6d4" : "#7c3aed"}
              emissiveIntensity={0.6}
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

// Orbit rings
const OrbitRings = () => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.15;
      ring1Ref.current.rotation.z = time * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.12;
      ring2Ref.current.rotation.x = time * 0.1;
    }
  });

  return (
    <>
      <Torus ref={ring1Ref} args={[2.2, 0.02, 16, 80]} position={[0, 0.5, -3]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
      </Torus>
      <Torus ref={ring2Ref} args={[2.8, 0.015, 16, 80]} position={[0, 0.5, -3]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </Torus>
    </>
  );
};

// Central AI core
const AICore = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Icosahedron ref={meshRef} args={[0.5, 0]} position={[0, 0.5, -2]}>
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4f46e5"
          emissiveIntensity={0.7}
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.9}
        />
      </Icosahedron>
    </Float>
  );
};

// Floating accent orbs
const AccentOrbs = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
        <Sphere args={[0.15, 16, 16]} position={[3, 2.5, -3]}>
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere args={[0.1, 16, 16]} position={[-4, -2, -2]}>
          <meshStandardMaterial
            color="#ec4899"
            emissive="#db2777"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.7}>
        <Sphere args={[0.12, 16, 16]} position={[2, -2.5, -4]}>
          <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
        </Sphere>
      </Float>

      <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.5}>
        <Sphere args={[0.08, 16, 16]} position={[-2.5, 2, -2.5]}>
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
        </Sphere>
      </Float>
    </>
  );
};

// Background stars
const BackgroundStars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 25;
      pos[i3 + 1] = (Math.random() - 0.5) * 15;
      pos[i3 + 2] = (Math.random() - 0.5) * 15 - 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[-10, -5, 5]} intensity={0.4} color="#a855f7" />
      <pointLight position={[0, 8, 5]} intensity={0.5} color="#06b6d4" />
      
      <BackgroundStars />
      <GalaxyParticles />
      <NeuralNetwork />
      <DataFlow />
      <OrbitRings />
      <AICore />
      <AccentOrbs />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
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