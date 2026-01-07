import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

// Premium neon-style rotating torus
const NeonRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <Torus ref={ringRef} args={[1.2, 0.08, 16, 48]} position={[-2, 0.5, -1]}>
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#0066ff"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </Torus>
    </Float>
  );
};

// Glassmorphic icosahedron
const GlassGem = () => {
  const gemRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (gemRef.current) {
      gemRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      gemRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={0.5}>
      <Icosahedron ref={gemRef} args={[0.7, 1]} position={[2.5, -0.5, 0]}>
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#6d28d9"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.8}
        />
      </Icosahedron>
    </Float>
  );
};

// Floating data particles with glow effect
const DataParticles = () => {
  const count = 25;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ];
      const scale = Math.random() * 0.06 + 0.02;
      const speed = Math.random() * 0.5 + 0.5;
      temp.push({ position, scale, speed });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime() * 0.4;
      particles.forEach((particle, i) => {
        dummy.position.set(
          particle.position[0] + Math.sin(time * particle.speed + i) * 0.3,
          particle.position[1] + Math.cos(time * particle.speed + i) * 0.3,
          particle.position[2]
        );
        dummy.scale.setScalar(particle.scale * (1 + Math.sin(time + i) * 0.2));
        dummy.updateMatrix();
        mesh.current!.setMatrixAt(i, dummy.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
    </instancedMesh>
  );
};

// Orbital ring decoration
const OrbitalRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Torus
      ref={ringRef}
      args={[2.8, 0.02, 8, 64]}
      position={[0, 0, -2]}
      rotation={[Math.PI / 3, 0, 0]}
    >
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
    </Torus>
  );
};

// Secondary floating spheres
const FloatingSpheres = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
        <Sphere args={[0.25, 16, 16]} position={[1.5, 1.8, -1]}>
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere args={[0.18, 16, 16]} position={[-1.8, -1.2, 0]}>
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Sphere args={[0.12, 16, 16]} position={[0.5, -1.8, 0.5]}>
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.7} />
        </Sphere>
      </Float>
    </>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00d4ff" />
      <pointLight position={[-10, -5, 5]} intensity={0.6} color="#8b5cf6" />
      <spotLight
        position={[0, 10, 5]}
        intensity={1}
        color="#ffffff"
        angle={0.5}
        penumbra={0.5}
      />
      
      <NeonRing />
      <GlassGem />
      <OrbitalRing />
      <FloatingSpheres />
      <DataParticles />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
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
