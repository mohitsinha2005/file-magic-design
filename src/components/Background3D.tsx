import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

const FloatingParticles = () => {
  const count = 20; // Reduced for performance
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5,
      ];
      const scale = Math.random() * 0.06 + 0.02;
      temp.push({ position, scale });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime() * 0.3; // Slower for smoothness
      particles.forEach((particle, i) => {
        dummy.position.set(
          particle.position[0] + Math.sin(time + i * 0.5) * 0.2,
          particle.position[1] + Math.cos(time + i * 0.5) * 0.2,
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
      <meshBasicMaterial color="#2563eb" transparent opacity={0.3} />
    </instancedMesh>
  );
};

const FloatingOrbs = () => {
  return (
    <>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[0.4, 12, 12]} position={[-4, 2, -3]}>
          <meshStandardMaterial
            color="#3b82f6"
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.4}
          />
        </Sphere>
      </Float>

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <Sphere args={[0.25, 12, 12]} position={[5, -2, -4]}>
          <meshStandardMaterial
            color="#60a5fa"
            roughness={0.5}
            metalness={0.5}
            transparent
            opacity={0.35}
          />
        </Sphere>
      </Float>

      <Float speed={0.8} rotationIntensity={0.25} floatIntensity={0.4}>
        <Sphere args={[0.3, 12, 12]} position={[3, 3, -5]}>
          <meshStandardMaterial
            color="#2563eb"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.4}
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
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#2563eb" />
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
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;
