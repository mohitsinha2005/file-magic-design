import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

const FloatingParticles = () => {
  const count = 40;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5,
      ];
      const scale = Math.random() * 0.08 + 0.03;
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
          particle.position[0] + Math.sin(time * 0.3 + i) * 0.3,
          particle.position[1] + Math.cos(time * 0.2 + i) * 0.3,
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
      <meshBasicMaterial color="#2563eb" transparent opacity={0.4} />
    </instancedMesh>
  );
};

const FloatingOrbs = () => {
  return (
    <>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere args={[0.4, 16, 16]} position={[-4, 2, -3]}>
          <meshStandardMaterial
            color="#3b82f6"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.5}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <Sphere args={[0.25, 16, 16]} position={[5, -2, -4]}>
          <meshStandardMaterial
            color="#60a5fa"
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.4}
          />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <Sphere args={[0.3, 16, 16]} position={[3, 3, -5]}>
          <meshStandardMaterial
            color="#2563eb"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.5}
          />
        </Sphere>
      </Float>
    </>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#2563eb" />
      <FloatingOrbs />
      <FloatingParticles />
    </>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;
