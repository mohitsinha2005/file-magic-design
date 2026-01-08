import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Torus, Sphere, Box, Octahedron } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// Central AI Brain - Professional geometric shape
const AIBrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(0.01);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
    scaleRef.current = Math.min(scaleRef.current + delta * 0.5, 1);
    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Octahedron ref={meshRef} args={[0.8, 0]} position={[0, 0, 0]} scale={0.01}>
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4f46e5"
          emissiveIntensity={0.7}
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.9}
        />
      </Octahedron>
    </Float>
  );
};

// Orbiting data rings
const DataRings = () => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.3;
      ring1Ref.current.rotation.z = time * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.25;
      ring2Ref.current.rotation.x = time * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.2;
      ring3Ref.current.rotation.y = time * 0.1;
    }
  });

  return (
    <>
      <Torus ref={ring1Ref} args={[1.8, 0.03, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" emissive="#2563eb" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      </Torus>
      <Torus ref={ring2Ref} args={[2.2, 0.025, 16, 64]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
      </Torus>
      <Torus ref={ring3Ref} args={[2.6, 0.02, 16, 64]} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
      </Torus>
    </>
  );
};

// Floating data nodes
const DataNodes = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => [
    { pos: [2, 1.5, 0] as [number, number, number], color: "#10b981", size: 0.15 },
    { pos: [-2, -1, 0.5] as [number, number, number], color: "#f59e0b", size: 0.12 },
    { pos: [1.5, -1.5, -1] as [number, number, number], color: "#ec4899", size: 0.1 },
    { pos: [-1.5, 1.2, -0.5] as [number, number, number], color: "#06b6d4", size: 0.13 },
    { pos: [0, 2, -1] as [number, number, number], color: "#3b82f6", size: 0.11 },
    { pos: [-0.5, -2, 0] as [number, number, number], color: "#8b5cf6", size: 0.14 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.2} floatIntensity={0.4}>
          <Sphere args={[node.size, 16, 16]} position={node.pos}>
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
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

// Floating data cubes
const DataCubes = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const cubes = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4 - 2
      ] as [number, number, number],
      size: 0.06 + Math.random() * 0.04,
      speed: 1 + Math.random() * 0.5,
    })), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={cube.speed} rotationIntensity={0.5} floatIntensity={0.3}>
          <Box args={[cube.size, cube.size, cube.size]} position={cube.pos}>
            <meshStandardMaterial
              color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
              emissive={i % 2 === 0 ? "#2563eb" : "#7c3aed"}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
        </Float>
      ))}
    </group>
  );
};

// Particle field
const ParticleField = () => {
  const groupRef = useRef<THREE.Group>(null);
  const count = 20;

  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 3 + Math.random() * 0.5,
      yOffset: (Math.random() - 0.5) * 2,
      size: 0.04 + Math.random() * 0.03,
    })), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
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
          <meshBasicMaterial color={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#34d399"} transparent opacity={0.7} />
        </Sphere>
      ))}
    </group>
  );
};

// Camera animation with cinematic zoom
const CameraAnimation = () => {
  const { camera } = useThree();
  const initialZ = 12;
  const targetZ = 5;

  useFrame((state) => {
    const t = Math.min(state.clock.getElapsedTime() / 2.5, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    camera.position.z = initialZ - (initialZ - targetZ) * eased;
    camera.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
    camera.position.x = Math.cos(state.clock.getElapsedTime() * 0.25) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// 3D Scene
const IntroScene = () => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#3b82f6" />
      <pointLight position={[-10, -10, 5]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[0, 8, 5]} intensity={0.8} color="#06b6d4" />
      <spotLight position={[0, 10, 0]} intensity={1.5} color="#ffffff" angle={0.4} penumbra={0.5} />

      <CameraAnimation />
      <AIBrain />
      <DataRings />
      <DataNodes />
      <DataCubes />
      <ParticleField />
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
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    
    const textTimer = setTimeout(() => setShowText(true), 500);
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000);
    const completeTimer = setTimeout(() => {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
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
            camera={{ position: [0, 0, 12], fov: 50 }}
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
              initial={{ scale: 0.3, opacity: 0, y: 40 }}
              animate={showText ? { scale: 1, opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-4"
            >
              <motion.div
                className="mb-6 flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={showText ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                <span className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-primary" />
                <span className="text-xs md:text-sm text-primary/70 tracking-[0.4em] uppercase font-medium">
                  Portfolio
                </span>
                <span className="w-16 h-[1px] bg-gradient-to-l from-transparent via-primary to-primary" />
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-3"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #60a5fa 30%, #a78bfa 60%, #34d399 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 60px rgba(96, 165, 250, 0.3)",
                }}
              >
                Mohit Sinha
              </motion.h1>
              
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={showText ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mt-4 space-y-2"
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-medium">
                  <span className="text-blue-400">Data Scientist</span>
                  <span className="text-muted-foreground mx-3">|</span>
                  <span className="text-violet-400">AI Researcher</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={showText ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="mt-4 flex items-center justify-center gap-3"
              >
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs tracking-wider">
                  BCA
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs tracking-wider">
                  BS DATA SCIENCE
                </span>
              </motion.div>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 md:bottom-16"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-8 rounded-full"
                      style={{ 
                        background: `linear-gradient(to top, ${['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'][i]}, transparent)` 
                      }}
                      animate={{ 
                        scaleY: [0.3, 1, 0.3], 
                        opacity: [0.4, 1, 0.4] 
                      }}
                      transition={{ 
                        duration: 0.8, 
                        repeat: Infinity, 
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Loading Experience</span>
              </div>
            </motion.div>
          </div>

          {/* Enhanced glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="absolute top-1/3 right-1/3 w-[200px] h-[200px] bg-emerald-500/8 rounded-full blur-[60px]" />
          </div>

          {/* Professional grid overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroAnimation;
