import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

const DataParticles = () => {
  const count = 40; // Reduced for better performance
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ];
      const scale = Math.random() * 0.08 + 0.04;
      temp.push({ position, scale });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime() * 0.5; // Slower animation
      particles.forEach((particle, i) => {
        dummy.position.set(
          particle.position[0] + Math.sin(time + i * 0.5) * 0.15,
          particle.position[1] + Math.cos(time + i * 0.5) * 0.15,
          particle.position[2]
        );
        dummy.scale.setScalar(particle.scale);
        dummy.updateMatrix();
        mesh.current!.setMatrixAt(i, dummy.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#2563eb" transparent opacity={0.5} />
    </instancedMesh>
  );
};

const FloatingShapes = () => {
  return (
    <>
      {/* Main Neural Network Node - simplified geometry */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <Sphere args={[0.8, 16, 16]} position={[-2, 1, 0]}>
          <meshStandardMaterial
            color="#2563eb"
            roughness={0.3}
            metalness={0.7}
          />
        </Sphere>
      </Float>

      {/* Data Cube - simplified */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Box args={[0.6, 0.6, 0.6]} position={[2.5, -0.5, 0]}>
          <meshStandardMaterial
            color="#3b82f6"
            roughness={0.4}
            metalness={0.6}
          />
        </Box>
      </Float>

      {/* AI Ring - reduced segments */}
      <Float speed={0.8} rotationIntensity={1} floatIntensity={0.4}>
        <Torus args={[0.5, 0.15, 12, 24]} position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#60a5fa"
            roughness={0.3}
            metalness={0.8}
          />
        </Torus>
      </Float>

      {/* Secondary Nodes - simplified */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.7}>
        <Sphere args={[0.3, 12, 12]} position={[1.5, 1.5, -1]}>
          <meshStandardMaterial
            color="#93c5fd"
            roughness={0.5}
            metalness={0.5}
            transparent
            opacity={0.7}
          />
        </Sphere>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere args={[0.2, 12, 12]} position={[-1.5, -1, -0.5]}>
          <meshStandardMaterial
            color="#60a5fa"
            roughness={0.4}
            metalness={0.6}
          />
        </Sphere>
      </Float>
    </>
  );
};

const ConnectionLines = () => {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const lines = useMemo(() => {
    const positions = [
      [[-2, 1, 0], [0, 0, 0]],
      [[2.5, -0.5, 0], [0, 0, 0]],
      [[0, -1.5, 0], [0, 0, 0]],
      [[1.5, 1.5, -1], [0, 0, 0]],
      [[-1.5, -1, -0.5], [0, 0, 0]],
    ];
    return positions;
  }, []);

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => {
        const points = [
          new THREE.Vector3(...(line[0] as [number, number, number])),
          new THREE.Vector3(...(line[1] as [number, number, number])),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial attach="material" color="#2563eb" opacity={0.3} transparent />
          </line>
        );
      })}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2563eb" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" angle={0.5} />
      
      <FloatingShapes />
      <DataParticles />
      <ConnectionLines />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-50">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
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
