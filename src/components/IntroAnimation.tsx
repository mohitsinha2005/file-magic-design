import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Torus, Sphere, RoundedBox } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// Cinematic rotating neon torus
const NeonTorus = ({ onComplete }: { onComplete: () => void }) => {
  const torusRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0.01);
  const [opacity, setOpacity] = useState(0);

  useFrame((state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.3;
      torusRef.current.rotation.y += delta * 0.5;
      torusRef.current.rotation.z += delta * 0.2;
    }
    
    // Animate scale in
    if (scale < 1) {
      setScale(prev => Math.min(prev + delta * 0.8, 1));
    }
    if (opacity < 1) {
      setOpacity(prev => Math.min(prev + delta * 1.2, 1));
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <Torus ref={torusRef} args={[1.5, 0.4, 24, 48]} scale={scale}>
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#0066ff"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={opacity}
        />
      </Torus>
    </Float>
  );
};

// Glassmorphic sphere
const GlassSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0.01);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.2;
    }
    if (scale < 1) {
      setScale(prev => Math.min(prev + delta * 0.6, 1));
    }
  });

  return (
    <Sphere ref={sphereRef} args={[0.6, 32, 32]} position={[0, 0, 0]} scale={scale}>
      <meshStandardMaterial
        color="#ffffff"
        emissive="#2563eb"
        emissiveIntensity={0.3}
        roughness={0.05}
        metalness={0.95}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
};

// Orbiting particles
const OrbitingParticles = () => {
  const groupRef = useRef<THREE.Group>(null);
  const count = 12;
  
  const particles = Array.from({ length: count }, (_, i) => ({
    angle: (i / count) * Math.PI * 2,
    radius: 2.2,
    speed: 0.5 + Math.random() * 0.3,
    size: 0.08 + Math.random() * 0.06,
    yOffset: (Math.random() - 0.5) * 0.5,
  }));

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Sphere
          key={i}
          args={[p.size, 8, 8]}
          position={[
            Math.cos(p.angle) * p.radius,
            p.yOffset,
            Math.sin(p.angle) * p.radius,
          ]}
        >
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
        </Sphere>
      ))}
    </group>
  );
};

// Camera animation
const CameraAnimation = () => {
  const { camera } = useThree();
  const initialZ = 12;
  const targetZ = 5;

  useFrame((state) => {
    const t = Math.min(state.clock.getElapsedTime() / 2.5, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    camera.position.z = initialZ - (initialZ - targetZ) * eased;
    camera.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// 3D Scene
const IntroScene = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#8b5cf6" />
      <spotLight
        position={[0, 10, 0]}
        intensity={2}
        color="#ffffff"
        angle={0.4}
        penumbra={0.5}
      />
      
      <CameraAnimation />
      <NeonTorus onComplete={onComplete} />
      <GlassSphere />
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
    // Show text after 1 second
    const textTimer = setTimeout(() => setShowText(true), 800);
    // Start fade out after 3 seconds
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000);
    // Complete after 3.8 seconds
    const completeTimer = setTimeout(() => onComplete(), 3800);

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
            camera={{ position: [0, 0, 12], fov: 50 }}
            dpr={[1, 2]}
            style={{ background: "transparent" }}
          >
            <IntroScene onComplete={onComplete} />
          </Canvas>

          {/* Animated text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.3, opacity: 0, z: -100 }}
              animate={showText ? { scale: 1, opacity: 1, z: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading"
                style={{
                  background: "linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #00d4ff 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 80px rgba(0, 212, 255, 0.5)",
                }}
              >
                Mohit Sinha
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={showText ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-xl md:text-2xl text-primary/80 mt-4 tracking-widest uppercase"
              >
                AI & Data Science
              </motion.p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-20"
            >
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-violet-500/15 rounded-full blur-[100px]" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroAnimation;
