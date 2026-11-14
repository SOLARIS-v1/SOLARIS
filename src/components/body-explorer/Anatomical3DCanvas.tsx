import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ANATOMICAL_BODY_SYSTEMS } from '../../data/hazardData';
import { OrganSystemInfo } from '../../types';
import { sound } from '../../utils/audio';

interface Anatomical3DCanvasProps {
  selectedOrgan: OrganSystemInfo | null;
  onSelectOrgan: (organ: OrganSystemInfo) => void;
  visualMode: 'hologram' | 'sensors' | 'xray';
}

// Interactive Organ Marker in 3D space
function OrganSensorNode({
  organ,
  isSelected,
  onClick,
  visualMode
}: {
  organ: OrganSystemInfo;
  isSelected: boolean;
  onClick: () => void;
  visualMode: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      const scale = isSelected ? 1.3 + Math.sin(t * 6) * 0.15 : hovered ? 1.2 : 1 + Math.sin(t * 3 + organ.position3D[1]) * 0.08;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.03;
      ringRef.current.rotation.x = Math.sin(t * 2) * 0.4;
    }
  });

  const color = organ.currentTelemetryStatus === 'alert'
    ? '#8B3A42' // Muted red / wine
    : organ.currentTelemetryStatus === 'caution'
    ? '#B87D3B' // Muted amber
    : isSelected
    ? '#D5BDA4' // Champagne highlight
    : hovered
    ? '#A56F73' // Secondary Dusty Rose
    : '#542B38'; // Primary Burgundy

  return (
    <group position={organ.position3D}>
      {/* Outer Pulse Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.07, 0.09, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>

      {/* Center Marker Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          sound.playScan();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 1.6 : hovered ? 1.1 : 0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Floating HTML Label */}
      {(hovered || isSelected) && (
        <Html distanceFactor={8} position={[0.1, 0.05, 0]}>
          <div className="bg-[#FFFCF8] border border-[#542B38] text-[#33302E] text-xs px-2.5 py-1 rounded-lg shadow-warm-md whitespace-nowrap pointer-events-none select-none flex items-center gap-1.5 font-mono">
            <span className={`w-2 h-2 rounded-full ${
              organ.currentTelemetryStatus === 'alert' ? 'bg-[#8B3A42] animate-ping' :
              organ.currentTelemetryStatus === 'caution' ? 'bg-[#B87D3B]' : 'bg-[#4E7D63]'
            }`} />
            <span className="font-bold text-[#542B38]">{organ.name.split('&')[0]}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

// 3D Human Holographic Anatomical Silhouette
function HolographicHumanBody({ visualMode }: { visualMode: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Subtle breathing motion
      const breath = Math.sin(t * 1.5) * 0.015;
      groupRef.current.position.y = breath;
    }
  });

  const wireColor = visualMode === 'xray' ? '#A56F73' : visualMode === 'sensors' ? '#D5BDA4' : '#C49CA7';
  const glowColor = visualMode === 'xray' ? '#3A1C26' : '#2A161E';

  return (
    <group ref={groupRef}>
      {/* Head / Cranium */}
      <mesh position={[0, 1.62, 0]}>
        <sphereGeometry args={[0.17, 24, 24]} />
        <meshStandardMaterial
          color={glowColor}
          wireframe={visualMode !== 'sensors'}
          emissive={wireColor}
          emissiveIntensity={0.35}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.41, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.12, 16]} />
        <meshStandardMaterial color={glowColor} wireframe emissive={wireColor} emissiveIntensity={0.2} transparent opacity={0.6} />
      </mesh>

      {/* Torso / Chest */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.26, 0.21, 0.6, 20]} />
        <meshStandardMaterial
          color={glowColor}
          wireframe
          emissive={wireColor}
          emissiveIntensity={0.3}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Spine line (X-Ray hint) */}
      <mesh position={[0, 0.95, -0.05]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshBasicMaterial color="#D5BDA4" wireframe transparent opacity={0.7} />
      </mesh>

      {/* Pelvis / Hips */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.22, 0.18, 0.25, 18]} />
        <meshStandardMaterial color={glowColor} wireframe emissive={wireColor} emissiveIntensity={0.25} transparent opacity={0.6} />
      </mesh>

      {/* Left Shoulder & Arm */}
      <group position={[-0.32, 1.25, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.35, 12]} />
          <meshStandardMaterial color={glowColor} wireframe emissive={wireColor} emissiveIntensity={0.2} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.055, 0.045, 0.35, 12]} />
          <meshStandardMaterial color={glowColor} wireframe emissive={wireColor} emissiveIntensity={0.2} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Right Shoulder & Arm */}
      <group position={[0.32, 1.25, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.35, 12]} />
          <meshStandardMaterial color={glowColor} wireframe emissive={wireColor} emissiveIntensity={0.2} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.055, 0.045, 0.35, 12]} />
          <meshStandardMaterial color={glowColor} wireframe emissive={wireColor} emissiveIntensity={0.2} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group position={[-0.14, 0.5, 0]}>
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.08, 0.065, 0.55, 14]} />
          <meshStandardMaterial color={glowColor} wireframe emissive={wireColor} emissiveIntensity={0.25} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[0.065, 0.05, 0.55, 14]} />
          <meshStandardMaterial color={glowColor} wireframe emissive={wireColor} emissiveIntensity={0.25} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.14, 0.5, 0]}>
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.08, 0.065, 0.55, 14]} />
          <meshStandardMaterial color={glowColor} wireframe emissive={wireColor} emissiveIntensity={0.25} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[0.065, 0.05, 0.55, 14]} />
          <meshStandardMaterial color={glowColor} wireframe emissive={wireColor} emissiveIntensity={0.25} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Pedestal / Telemetry Scan Rings */}
      <mesh position={[0, -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.45, 0.52, 32]} />
        <meshBasicMaterial color="#D5BDA4" side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.65, 0.68, 32]} />
        <meshBasicMaterial color="#A56F73" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Background Particle Starfield
function MedicalGridBackdrop() {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesCount = 200;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#D5BDA4" transparent opacity={0.35} />
    </points>
  );
}

export default function Anatomical3DCanvas({
  selectedOrgan,
  onSelectOrgan,
  visualMode
}: Anatomical3DCanvasProps) {
  const controlsRef = useRef<any>(null);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0.8, 3.2], fov: 45 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#200D14']} />
        <ambientLight intensity={1.0} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#FFFDF9" />
        <pointLight position={[-5, -5, -3]} intensity={0.8} color="#D5BDA4" />
        <spotLight position={[0, 4, 3]} angle={0.4} penumbra={1} intensity={1.4} color="#FAF7F2" />

        <MedicalGridBackdrop />

        <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
          <group position={[0, -0.4, 0]}>
            <HolographicHumanBody visualMode={visualMode} />

            {/* Clickable Anatomical Sensor Nodes */}
            {ANATOMICAL_BODY_SYSTEMS.map((organ) => (
              <OrganSensorNode
                key={organ.id}
                organ={organ}
                isSelected={selectedOrgan?.id === organ.id}
                onClick={() => onSelectOrgan(organ)}
                visualMode={visualMode}
              />
            ))}
          </group>
        </Float>

        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          minDistance={1.2}
          maxDistance={5.5}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 4}
          autoRotate={!selectedOrgan}
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
