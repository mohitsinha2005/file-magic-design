import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Torus, Sphere, Icosahedron } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// Data Science DNA Helix - professional theme
const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);
  const count = 20;

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 4,
      y: (i / count) * 4 - 2,
      radius: 1.2,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <group key={i}>
          <Sphere
            args={[0.08, 8, 8]}
            position={[Math.cos(p.angle) * p.radius, p.y, Math.sin(p.angle) * p.radius]}
          >
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
          </Sphere>
          <Sphere
            args={[0.08, 8, 8]}
            position={[Math.cos(p.angle + Math.PI) * p.radius, p.y, Math.sin(p.angle + Math.PI) * p.radius]}
          >
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
          </Sphere>
        </group>
      ))}
    </group>
  );
};

// Neural Network Node
const NeuralNode = ({ position, delay }: { position: [number, number, number]; delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    if (time > delay) {
      scaleRef.current = Math.min(scaleRef.current + delta * 2, 1);
    }
    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Sphere ref={meshRef} args={[0.12, 12, 12]} position={position} scale={0}>
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#0066ff"
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.1}
      />
    </Sphere>
  );
};

// Data Cube Matrix
const DataCubeMatrix = () => {
  const groupRef = useRef<THREE.Group>(null);
  const cubes = useMemo(() => {
    const arr = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (Math.random() > 0.5) {
            arr.push({ pos: [x * 0.5, y * 0.5, z * 0.5] as [number, number, number], delay: Math.random() * 0.5 });
          }
        }
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, -1, -1]}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
          <mesh position={cube.pos}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.4}
              transparent
              opacity={0.8}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Brain Network Visualization
const BrainNetwork = () => {
  const nodes = useMemo(() => [
    { pos: [0, 0, 0] as [number, number, number], delay: 0 },
    { pos: [0.8, 0.5, 0.3] as [number, number, number], delay: 0.1 },
    { pos: [-0.6, 0.7, -0.2] as [number, number, number], delay: 0.2 },
    { pos: [0.4, -0.6, 0.5] as [number, number, number], delay: 0.3 },
    { pos: [-0.7, -0.4, 0.3] as [number, number, number], delay: 0.4 },
    { pos: [0.5, 0.2, -0.6] as [number, number, number], delay: 0.5 },
    { pos: [-0.3, 0.1, 0.8] as [number, number, number], delay: 0.6 },
  ], []);

  return (
    <group position={[-2.5, 1, -1]}>
      {nodes.map((node, i) => (
        <NeuralNode key={i} position={node.pos} delay={node.delay} />
      ))}
    </group>
  );
};

// Cinematic rotating neon torus (no React state updates per-frame)
const NeonTorus = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(0.01);
  const opacityRef = useRef(0);

  useFrame((state, delta) => {
    if (!torusRef.current) return;

    torusRef.current.rotation.x += delta * 0.3;
    torusRef.current.rotation.y += delta * 0.5;
    torusRef.current.rotation.z += delta * 0.2;

    scaleRef.current = Math.min(scaleRef.current + delta * 0.8, 1);
    opacityRef.current = Math.min(opacityRef.current + delta * 1.2, 1);

    torusRef.current.scale.setScalar(scaleRef.current);

    const mat = torusRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = opacityRef.current;
    mat.needsUpdate = false;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <Torus ref={torusRef} args={[1.5, 0.3, 24, 48]} scale={0.01}>
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#0066ff"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0}
        />
      </Torus>
    </Float>
  );
};

// Glassmorphic icosahedron (AI brain)
const AICore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(0.01);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
    scaleRef.current = Math.min(scaleRef.current + delta * 0.6, 1);
    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Icosahedron ref={meshRef} args={[0.5, 1]} position={[0, 0, 0]} scale={0.01}>
      <meshStandardMaterial
        color="#ffffff"
        emissive="#2563eb"
        emissiveIntensity={0.5}
        roughness={0.05}
        metalness={0.95}
        transparent
        opacity={0.7}
      />
    </Icosahedron>
  );
};

// Orbiting data particles
const OrbitingParticles = () => {
  const groupRef = useRef<THREE.Group>(null);
  const count = 16;

  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 2.0 + Math.random() * 0.4,
      speed: 0.5 + Math.random() * 0.3,
      size: 0.06 + Math.random() * 0.04,
      yOffset: (Math.random() - 0.5) * 0.8,
      color: i % 2 === 0 ? "#00d4ff" : "#8b5cf6",
    })), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Sphere
          key={i}
          args={[p.size, 8, 8]}
          position={[Math.cos(p.angle) * p.radius, p.yOffset, Math.sin(p.angle) * p.radius]}
        >
          <meshBasicMaterial color={p.color} transparent opacity={0.9} />
        </Sphere>
      ))}
    </group>
  );
};

// Camera animation with cinematic zoom
const CameraAnimation = () => {
  const { camera } = useThree();
  const initialZ = 14;
  const targetZ = 5;

  useFrame((state) => {
    const t = Math.min(state.clock.getElapsedTime() / 2.5, 1);
    const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart for smoother feel
    camera.position.z = initialZ - (initialZ - targetZ) * eased;
    camera.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    camera.position.x = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// 3D Scene
const IntroScene = () => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
      <spotLight position={[0, 10, 0]} intensity={2} color="#ffffff" angle={0.4} penumbra={0.5} />

      <CameraAnimation />
      <NeonTorus />
      <AICore />
      <DNAHelix />
      <DataCubeMatrix />
      <BrainNetwork />
      <OrbitingParticles />
    </>
  );
};

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Scroll to top when intro starts
    window.scrollTo(0, 0);
    
    const textTimer = setTimeout(() => setShowText(true), 600);
    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
    const completeTimer = setTimeout(() => {
      window.scrollTo(0, 0); // Ensure we're at top when transitioning
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* 3D Canvas */}
          <Canvas
            camera={{ position: [0, 0, 14], fov: 50 }}
            dpr={[1, 1.5]}
            style={{ background: "transparent" }}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
            }}
          >
            <IntroScene />
          </Canvas>

          {/* Animated text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.2, opacity: 0, y: 50 }}
              animate={showText ? { scale: 1, opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-4"
            >
              <motion.div
                className="mb-4 flex items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={showText ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-primary" />
                <span className="text-sm md:text-base text-primary/80 tracking-[0.3em] uppercase font-medium">
                  Welcome to
                </span>
                <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-primary" />
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-4"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 40%, #8b5cf6 70%, #00d4ff 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 80px rgba(0, 212, 255, 0.4)",
                }}
              >
                Mohit Sinha
              </motion.h1>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={showText ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="text-xl md:text-2xl lg:text-3xl text-foreground/90 mt-4 tracking-wide"
              >
                <span className="text-primary">AI</span> & <span className="text-violet-400">Data Science</span> Professional
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={showText ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                className="text-sm md:text-base text-muted-foreground mt-3 tracking-widest uppercase"
              >
                BCA & BS in Data Science
              </motion.p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-16 md:bottom-20"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: i % 2 === 0 ? "#00d4ff" : "#8b5cf6" }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground tracking-widest uppercase">Initializing</span>
              </div>
            </motion.div>
          </div>

          {/* Enhanced glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[180px]" />
            <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-violet-500/12 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
          </div>

          {/* Grid overlay for tech feel */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroAnimation;
