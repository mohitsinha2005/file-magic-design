import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, Points, PointMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import SafeCanvas from "./SafeCanvas";

// Galaxy spiral arms
const GalaxySpiral = () => {
  const points = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 5 + 0.5;
      const spinAngle = radius * 2.5;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2;
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      // Color gradient from center (blue/cyan) to edge (purple/pink)
      const mixedColor = new THREE.Color();
      const innerColor = new THREE.Color('#22d3ee');
      const outerColor = new THREE.Color('#a855f7');
      mixedColor.lerpColors(innerColor, outerColor, radius / 5.5);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Nebula clouds
const NebulaClouds = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const clouds = useMemo(() => [
    { pos: [2, 1, -2] as [number, number, number], scale: 1.2, color: '#6366f1' },
    { pos: [-2.5, -0.5, -1.5] as [number, number, number], scale: 0.9, color: '#ec4899' },
    { pos: [0, 1.5, -3] as [number, number, number], scale: 1.5, color: '#06b6d4' },
    { pos: [-1.5, -1.5, -2.5] as [number, number, number], scale: 0.8, color: '#8b5cf6' },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, i) => (
        <Float key={i} speed={0.5 + i * 0.1} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere args={[cloud.scale, 24, 24]} position={cloud.pos}>
            <meshStandardMaterial
              color={cloud.color}
              emissive={cloud.color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.15}
              roughness={1}
              metalness={0}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

// Central star/sun
const CentralStar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(0.01);

  useFrame((state, delta) => {
    if (!meshRef.current || !glowRef.current) return;
    
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    
    // Scale animation
    scaleRef.current = Math.min(scaleRef.current + delta * 0.4, 1);
    meshRef.current.scale.setScalar(scaleRef.current);
    glowRef.current.scale.setScalar(scaleRef.current * 2);
    
    // Pulse glow
    const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.1 + 1;
    glowRef.current.scale.multiplyScalar(pulse);
  });

  return (
    <group>
      <Sphere ref={glowRef} args={[0.6, 32, 32]} scale={0.01}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
      </Sphere>
      <Sphere ref={meshRef} args={[0.5, 32, 32]} scale={0.01}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#60a5fa"
          emissiveIntensity={1.5}
          roughness={0}
          metalness={1}
        />
      </Sphere>
    </group>
  );
};

// Orbiting rings
const OrbitRings = () => {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.3;
      ring1.current.rotation.z = t * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.25;
      ring2.current.rotation.x = t * 0.15;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.2;
      ring3.current.rotation.y = t * 0.12;
    }
  });

  return (
    <>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.012, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>
    </>
  );
};

// Floating data orbs
const DataOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const orbs = useMemo(() => [
    { pos: [2.5, 1, 0] as [number, number, number], size: 0.12, color: '#10b981' },
    { pos: [-2, -1, 0.5] as [number, number, number], size: 0.1, color: '#f59e0b' },
    { pos: [1.5, -1.5, -0.5] as [number, number, number], size: 0.08, color: '#ec4899' },
    { pos: [-1.5, 1.2, -0.3] as [number, number, number], size: 0.11, color: '#06b6d4' },
    { pos: [0, 2.2, -0.5] as [number, number, number], size: 0.09, color: '#3b82f6' },
    { pos: [-0.5, -2, 0] as [number, number, number], size: 0.13, color: '#8b5cf6' },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Sphere args={[orb.size, 16, 16]} position={orb.pos}>
            <meshStandardMaterial
              color={orb.color}
              emissive={orb.color}
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

// Background stars
const BackgroundStars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 30;
      pos[i3 + 1] = (Math.random() - 0.5) * 30;
      pos[i3 + 2] = (Math.random() - 0.5) * 30 - 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
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
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

// Camera animation with cinematic zoom
const CameraAnimation = () => {
  const { camera } = useThree();
  const initialZ = 15;
  const targetZ = 6;

  useFrame((state) => {
    const t = Math.min(state.clock.getElapsedTime() / 3, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    camera.position.z = initialZ - (initialZ - targetZ) * eased;
    camera.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    camera.position.x = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main 3D Scene
const GalaxyScene = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#60a5fa" distance={20} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#a855f7" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#06b6d4" />
      
      <CameraAnimation />
      <BackgroundStars />
      <GalaxySpiral />
      <NebulaClouds />
      <CentralStar />
      <OrbitRings />
      <DataOrbs />
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
    // Disable browser scroll restoration so refresh always lands at top
    const prevRestoration = window.history.scrollRestoration;
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Strip any hash so anchor links don't auto-scroll
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Keep page pinned to top while intro plays
    const pin = () => window.scrollTo(0, 0);
    window.addEventListener('scroll', pin, { passive: true });

    const textTimer = setTimeout(() => setShowText(true), 600);
    const fadeTimer = setTimeout(() => setFadeOut(true), 3500);
    const completeTimer = setTimeout(() => {
      window.removeEventListener('scroll', pin);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      window.removeEventListener('scroll', pin);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = prevRestoration || 'auto';
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #030014 0%, #0a0a1f 50%, #030014 100%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* 3D Galaxy Canvas */}
          <SafeCanvas>
            <Canvas
              camera={{ position: [0, 0, 15], fov: 60 }}
              dpr={[1, 1.5]}
              style={{ background: "transparent" }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: false,
              }}
            >
              <GalaxyScene />
            </Canvas>
          </SafeCanvas>


          {/* Animated text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.3, opacity: 0, y: 50 }}
              animate={showText ? { scale: 1, opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-4"
            >
              {/* Decorative line */}
              <motion.div
                className="mb-6 flex items-center justify-center gap-4"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={showText ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="w-20 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-cyan-400" />
                <span className="text-xs md:text-sm text-cyan-400/80 tracking-[0.5em] uppercase font-medium">
                  Welcome
                </span>
                <span className="w-20 h-[2px] bg-gradient-to-l from-transparent via-cyan-400 to-cyan-400" />
              </motion.div>

              {/* Name with galaxy gradient */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-4"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #22d3ee 25%, #a855f7 50%, #ec4899 75%, #ffffff 100%)",
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 80px rgba(168, 85, 247, 0.4)",
                  animation: "gradient-shift 4s ease-in-out infinite",
                }}
              >
                Mohit Sinha
              </motion.h1>
              
              {/* Titles */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={showText ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="mt-4 space-y-2"
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-medium flex items-center justify-center gap-4">
                  <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Data Scientist</span>
                  <span className="text-purple-400/50">✦</span>
                  <span className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">AI Researcher</span>
                </p>
              </motion.div>

              {/* Badges */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={showText ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                className="mt-6 flex items-center justify-center gap-4"
              >
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-400 text-sm tracking-wider backdrop-blur-sm">
                  BCA Student
                </span>
                <span className="px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/40 text-blue-400 text-sm tracking-wider backdrop-blur-sm">
                  BS Data Science
                </span>
              </motion.div>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-12 md:bottom-16"
            >
              <div className="flex flex-col items-center gap-4">
                {/* Animated dots */}
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        background: ['#22d3ee', '#3b82f6', '#8b5cf6', '#a855f7', '#ec4899'][i]
                      }}
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-cyan-400/60 tracking-[0.4em] uppercase">
                  Entering Portfolio
                </span>
              </div>
            </motion.div>
          </div>

          {/* Radial glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/8 rounded-full blur-[200px]" />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-pink-500/8 rounded-full blur-[100px]" />
          </div>

          {/* Vignette effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)'
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroAnimation;