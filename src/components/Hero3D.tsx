import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Torus, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

const DataParticles = () => {
  const count = 100;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ];
      const scale = Math.random() * 0.1 + 0.05;
      temp.push({ position, scale });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      particles.forEach((particle, i) => {
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3(
          particle.position[0] + Math.sin(time + i) * 0.2,
          particle.position[1] + Math.cos(time + i) * 0.2,
          particle.position[2]
        );
        matrix.setPosition(position);
        matrix.scale(new THREE.Vector3(particle.scale, particle.scale, particle.scale));
        mesh.current!.setMatrixAt(i, matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#2563eb" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const FloatingShapes = () => {
  return (
    <>
      {/* Main Neural Network Node */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[0.8, 32, 32]} position={[-2, 1, 0]}>
          <MeshDistortMaterial
            color="#2563eb"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Data Cube */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
        <Box args={[0.6, 0.6, 0.6]} position={[2.5, -0.5, 0]}>
          <MeshWobbleMaterial
            color="#3b82f6"
            attach="material"
            factor={0.3}
            speed={2}
            roughness={0.3}
            metalness={0.7}
          />
        </Box>
      </Float>

      {/* AI Ring */}
      <Float speed={1} rotationIntensity={2} floatIntensity={0.5}>
        <Torus args={[0.5, 0.15, 16, 32]} position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#60a5fa"
            roughness={0.2}
            metalness={0.9}
            emissive="#2563eb"
            emissiveIntensity={0.3}
          />
        </Torus>
      </Float>

      {/* Secondary Nodes */}
      <Float speed={3} rotationIntensity={0.3} floatIntensity={1.2}>
        <Sphere args={[0.3, 16, 16]} position={[1.5, 1.5, -1]}>
          <meshStandardMaterial
            color="#93c5fd"
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.9}>
        <Sphere args={[0.2, 16, 16]} position={[-1.5, -1, -0.5]}>
          <meshStandardMaterial
            color="#60a5fa"
            roughness={0.3}
            metalness={0.7}
            emissive="#2563eb"
            emissiveIntensity={0.2}
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
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Hero3D;
