import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

// Galaxy particle field
const GalaxyField = () => {
  const points = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 12 + 3;
      const spinAngle = radius * 0.8;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * 3;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 2 - 8;
      
      const mixedColor = new THREE.Color();
      const innerColor = new THREE.Color('#22d3ee');
      const outerColor = new THREE.Color('#a855f7');
      mixedColor.lerpColors(innerColor, outerColor, radius / 15);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.015;
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
        size={0.025}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Floating orbs
const FloatingOrbs = () => {
  return (
    <>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[0.35, 12, 12]} position={[-5, 2, -6]}>
          <meshStandardMaterial
            color="#22d3ee"
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </Float>

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <Sphere args={[0.25, 12, 12]} position={[6, -2, -7]}>
          <meshStandardMaterial
            color="#a855f7"
            roughness={0.5}
            metalness={0.5}
            transparent
            opacity={0.25}
          />
        </Sphere>
      </Float>

      <Float speed={0.8} rotationIntensity={0.25} floatIntensity={0.4}>
        <Sphere args={[0.3, 12, 12]} position={[4, 3, -8]}>
          <meshStandardMaterial
            color="#6366f1"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </Float>
    </>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#22d3ee" />
      <FloatingOrbs />
      <GalaxyField />
    </>
  );
};

const Background3D = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Disable on mobile and reduced motion
  if (isMobile || prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.25]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;