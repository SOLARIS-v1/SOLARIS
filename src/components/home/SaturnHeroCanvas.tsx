import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// Procedural Saturn Planet Texture Generator
// Generates photorealistic atmospheric bands, cloud striations, and subtle storms
// ============================================================================
function createSaturnSurfaceTextures(): {
  diffuseMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const width = 2048;
  const height = 1024;

  // 1. Diffuse Color Map
  const diffuseCanvas = document.createElement('canvas');
  diffuseCanvas.width = width;
  diffuseCanvas.height = height;
  const ctx = diffuseCanvas.getContext('2d')!;

  // Authentic Saturn latitude color gradient
  // Palette: Deep burgundy-browns at poles, warm caramel & golden-beige in temperate zones,
  // bright champagne & warm ivory at the equatorial zone.
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0.00, '#261219'); // North Polar vortex (deep burgundy-brown)
  gradient.addColorStop(0.04, '#381D26');
  gradient.addColorStop(0.09, '#56313C');
  gradient.addColorStop(0.16, '#7D5246'); // North Polar belt
  gradient.addColorStop(0.24, '#AC8863'); // North Temperate belt (golden caramel)
  gradient.addColorStop(0.32, '#CCA982'); // North Temperate zone
  gradient.addColorStop(0.40, '#E5CCA7'); // North Tropical zone (soft champagne)
  gradient.addColorStop(0.47, '#F7EDDC'); // Equatorial belt boundary
  gradient.addColorStop(0.50, '#FCF5E8'); // Equatorial Zone core (warm ivory / champagne)
  gradient.addColorStop(0.53, '#F5E6CE');
  gradient.addColorStop(0.58, '#E1C49F'); // South Tropical belt
  gradient.addColorStop(0.66, '#C49F75'); // South Temperate zone
  gradient.addColorStop(0.75, '#9D7351'); // South Temperate belt
  gradient.addColorStop(0.84, '#71443D'); // South Polar belt (warm burgundy-caramel)
  gradient.addColorStop(0.92, '#48242D');
  gradient.addColorStop(1.00, '#200E14'); // South Polar vortex

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // 2. Bump Map Canvas
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width / 2;
  bumpCanvas.height = height / 2;
  const bCtx = bumpCanvas.getContext('2d')!;
  const bImgData = bCtx.createImageData(width / 2, height / 2);
  const bData = bImgData.data;

  // Atmospheric jet streams & cloud turbulence
  for (let y = 0; y < height; y++) {
    const ny = y / height;
    // Multi-frequency sinusoidal bands
    const bandFreq1 = Math.sin(ny * Math.PI * 46) * 14;
    const bandFreq2 = Math.sin(ny * Math.PI * 110) * 8;
    const bandFreq3 = Math.sin(ny * Math.PI * 240) * 4;
    const microJitter = Math.sin(ny * 580) * 2;
    const bandOffset = bandFreq1 + bandFreq2 + bandFreq3 + microJitter;

    for (let x = 0; x < width; x++) {
      const nx = x / width;
      // Longitudinal wind shear & turbulent cloud streaks
      const streak1 = Math.sin(nx * Math.PI * 12 + ny * 20) * 7;
      const streak2 = Math.cos(nx * Math.PI * 32 + ny * 55) * 4;
      const streak3 = Math.sin(nx * Math.PI * 80 + ny * 120) * 2;

      // Subtle atmospheric white storm spots (analogous to the Great White Spot)
      let storm = 0;
      if (Math.abs(ny - 0.46) < 0.035) {
        const dx = (nx - 0.38) * 30;
        const dy = (ny - 0.46) * 90;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.0) {
          storm = (1.0 - dist) * 28;
        }
      }

      const totalMod = bandOffset + streak1 + streak2 + streak3 + storm;
      const idx = (y * width + x) * 4;

      // Apply atmospheric turbulence onto RGB with warm tint balance
      data[idx]     = Math.min(255, Math.max(0, data[idx]     + totalMod * 0.95)); // R
      data[idx + 1] = Math.min(255, Math.max(0, data[idx + 1] + totalMod * 0.85)); // G
      data[idx + 2] = Math.min(255, Math.max(0, data[idx + 2] + totalMod * 0.65)); // B
    }
  }

  // Populate lower-res bump map for surface depth
  const bW = width / 2;
  const bH = height / 2;
  for (let by = 0; by < bH; by++) {
    const ny = by / bH;
    const band = Math.sin(ny * Math.PI * 46) * 25 + Math.sin(ny * Math.PI * 110) * 15;
    for (let bx = 0; bx < bW; bx++) {
      const nx = bx / bW;
      const wave = Math.sin(nx * Math.PI * 16 + ny * 30) * 12;
      const val = Math.min(255, Math.max(0, 128 + band + wave));
      const bIdx = (by * bW + bx) * 4;
      bData[bIdx] = val;
      bData[bIdx + 1] = val;
      bData[bIdx + 2] = val;
      bData[bIdx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  bCtx.putImageData(bImgData, 0, 0);

  const diffuseMap = new THREE.CanvasTexture(diffuseCanvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.ClampToEdgeWrapping;
  diffuseMap.colorSpace = THREE.SRGBColorSpace;
  diffuseMap.generateMipmaps = true;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;
  bumpMap.generateMipmaps = true;

  return { diffuseMap, bumpMap };
}

// ============================================================================
// Procedural Saturn Rings Texture Generator
// Produces Saturn's distinct C Ring, B Ring, Cassini Division, A Ring & F Ring
// ============================================================================
function createSaturnRingsTexture(innerRatio = 0.48): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;
  const center = size / 2;
  const maxRadius = size / 2;

  // Precompute 1000 radial sample points for ring structure
  const steps = 1000;
  const lutR = new Float32Array(steps);
  const lutG = new Float32Array(steps);
  const lutB = new Float32Array(steps);
  const lutA = new Float32Array(steps);

  for (let i = 0; i < steps; i++) {
    const t = i / steps; // 0.0 = inner ring boundary, 1.0 = outer ring boundary

    let r = 210, g = 185, b = 155, a = 0.0;

    if (t < 0.18) {
      // 1. C Ring (Crepe Ring): Faint, semi-transparent, smoky champagne tone
      const ct = t / 0.18;
      const ripple = Math.sin(ct * 60) * 12;
      r = 175 + ripple;
      g = 150 + ripple * 0.8;
      b = 130 + ripple * 0.6;
      a = 0.22 + ct * 0.22 + Math.sin(ct * 120) * 0.06;
    } else if (t < 0.22) {
      // Maxwell Gap: slight thinning
      r = 135;
      g = 115;
      b = 95;
      a = 0.08;
    } else if (t < 0.58) {
      // 2. B Ring: Dense, luminous, multi-banded champagne, gold & warm ivory
      const bt = (t - 0.22) / (0.58 - 0.22);
      const wave =
        Math.sin(bt * 110) * 16 +
        Math.sin(bt * 320) * 9 +
        Math.cos(bt * 640) * 5;

      r = Math.min(255, 242 + wave * 0.85);
      g = Math.min(255, 222 + wave * 0.8);
      b = Math.min(255, 192 + wave * 0.65);
      a = 0.88 + Math.sin(bt * 90) * 0.08;
    } else if (t < 0.66) {
      // 3. Cassini Division: Iconic prominent dark gap separating B and A rings
      const dt = (t - 0.58) / (0.66 - 0.58);
      r = 45;
      g = 30;
      b = 35;
      // Traces of faint ring dust inside the division
      a = 0.04 + Math.sin(dt * Math.PI) * 0.03;
    } else if (t < 0.93) {
      // 4. A Ring: Medium density, warm beige and champagne with Encke Gap
      const at = (t - 0.66) / (0.93 - 0.66);
      // Encke Gap near at = 0.77
      if (Math.abs(at - 0.77) < 0.02) {
        r = 55;
        g = 40;
        b = 42;
        a = 0.05;
      } else {
        const wave = Math.sin(at * 95) * 12 + Math.cos(at * 220) * 6;
        r = Math.min(255, 218 + wave * 0.7);
        g = Math.min(255, 198 + wave * 0.7);
        b = Math.min(255, 172 + wave * 0.6);
        a = 0.75 + Math.sin(at * 70) * 0.06;
      }
    } else if (t < 0.96) {
      // Roche Division outer gap
      a = 0.0;
    } else {
      // 5. F Ring: Delicate, ethereal outer ring strand with soft champagne glow
      const ft = (t - 0.96) / 0.04;
      const bell = Math.sin(ft * Math.PI);
      r = 250;
      g = 238;
      b = 218;
      a = bell * 0.52;
    }

    lutR[i] = r;
    lutG[i] = g;
    lutB[i] = b;
    lutA[i] = a;
  }

  // Populate radial 2D texture array
  for (let y = 0; y < size; y++) {
    const dy = y - center;
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ratio = dist / maxRadius;
      const idx = (y * size + x) * 4;

      if (ratio >= innerRatio && ratio <= 1.0) {
        const norm = (ratio - innerRatio) / (1.0 - innerRatio);
        const lutIdx = Math.min(steps - 1, Math.max(0, Math.floor(norm * steps)));
        data[idx]     = lutR[lutIdx];
        data[idx + 1] = lutG[lutIdx];
        data[idx + 2] = lutB[lutIdx];
        data[idx + 3] = Math.floor(lutA[lutIdx] * 255);
      } else {
        data[idx + 3] = 0;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  return texture;
}

// ============================================================================
// Saturn System (Planet + Atmospheric Limb Glow + 3D Rings + Telemetry)
// ============================================================================
function SaturnSystem() {
  const { size } = useThree();
  const systemRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const probeRef = useRef<THREE.Group>(null);
  const telemetryRingRef = useRef<THREE.Mesh>(null);

  // Responsive device breakpoint adjustments
  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;

  const basePosition: [number, number, number] = useMemo(() => {
    if (isMobile) return [0.3, -0.6, -1.8];
    if (isTablet) return [1.2, -0.4, -1.0];
    return [1.9, -0.15, -0.5]; // Desktop right side hero placement
  }, [isMobile, isTablet]);

  const baseScale = useMemo(() => {
    if (isMobile) return 0.72;
    if (isTablet) return 0.85;
    return 1.0;
  }, [isMobile, isTablet]);

  // Planet & Ring geometry dimensions
  const planetRadius = 1.35;
  const ringInnerRadius = 1.72;
  const ringOuterRadius = 3.65;
  const innerRatio = ringInnerRadius / ringOuterRadius; // ~0.471

  // Generate procedural textures once
  const { diffuseMap, bumpMap } = useMemo(() => createSaturnSurfaceTextures(), []);
  const ringTexture = useMemo(() => createSaturnRingsTexture(innerRatio), [innerRatio]);

  // Base astronomical axial tilt of Saturn: ~26.7Â°
  const baseTiltX = 0.44; // ~25.2Â°
  const baseTiltZ = -0.16;
  const baseTiltY = 0.12;

  const targetRotX = useRef(baseTiltX);
  const targetRotY = useRef(baseTiltY);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Slow, realistic axial rotation of Saturn
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.045;
    }

    // 2. Slow differential orbital rotation of the ring particles
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.012;
    }

    // 3. Smooth mouse parallax interaction
    if (systemRef.current) {
      const mouseX = state.pointer.x; // -1 to 1
      const mouseY = state.pointer.y; // -1 to 1

      targetRotY.current = baseTiltY + mouseX * 0.32;
      targetRotX.current = baseTiltX - mouseY * 0.22;

      systemRef.current.rotation.x = THREE.MathUtils.damp(
        systemRef.current.rotation.x,
        targetRotX.current,
        2.5,
        delta
      );
      systemRef.current.rotation.y = THREE.MathUtils.damp(
        systemRef.current.rotation.y,
        targetRotY.current,
        2.5,
        delta
      );

      // Subtle, cinematic planetary floating bob
      systemRef.current.position.y = basePosition[1] + Math.sin(t * 0.7) * 0.07;
    }

    // 4. Orbiting SOLARIS Medical Telemetry Probe & Sensor Ring
    if (probeRef.current) {
      const orbitSpeed = 0.35;
      const orbitR = 3.95;
      probeRef.current.position.x = Math.cos(t * orbitSpeed) * orbitR;
      probeRef.current.position.z = Math.sin(t * orbitSpeed) * orbitR;
      probeRef.current.position.y = Math.sin(t * orbitSpeed * 1.5) * 0.8;
      probeRef.current.rotation.y = -t * orbitSpeed;
      probeRef.current.rotation.z = Math.sin(t) * 0.2;
    }

    if (telemetryRingRef.current) {
      telemetryRingRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <group
      ref={systemRef}
      position={basePosition}
      scale={[baseScale, baseScale, baseScale]}
      rotation={[baseTiltX, baseTiltY, baseTiltZ]}
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. Saturn Planetary Body (Oblate Spheroid - flattened at poles)    */}
      {/* ------------------------------------------------------------------ */}
      <mesh
        ref={planetRef}
        scale={[1.0, 0.91, 1.0]} // Natural 9% polar flattening of gas giant
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshStandardMaterial
          map={diffuseMap}
          bumpMap={bumpMap}
          bumpScale={0.035}
          roughness={0.72}
          metalness={0.06}
        />
      </mesh>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Saturn Atmospheric Edge Glow / Limb Scattering (Champagne & Burgundy) */}
      {/* ------------------------------------------------------------------ */}
      <mesh scale={[1.018, 0.925, 1.018]}>
        <sphereGeometry args={[planetRadius, 48, 48]} />
        <meshBasicMaterial
          color="#EEDAC0"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh scale={[1.035, 0.94, 1.035]}>
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshBasicMaterial
          color="#6E3342"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Realistic 3D Saturn Rings Geometry & Material                   */}
      {/* ------------------------------------------------------------------ */}
      <mesh
        ref={ringsRef}
        rotation={[-Math.PI / 2, 0, 0]} // Aligned with planet equator
        castShadow
        receiveShadow
      >
        <ringGeometry args={[ringInnerRadius, ringOuterRadius, 128, 8]} />
        <meshStandardMaterial
          map={ringTexture}
          transparent
          side={THREE.DoubleSide}
          roughness={0.48}
          metalness={0.08}
          depthWrite={false}
        />
      </mesh>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Elegant SOLARIS Telemetry Orbit Path & Sensor Satellite           */}
      {/* ------------------------------------------------------------------ */}
      {/* Inclined telemetry orbit trajectory line */}
      <mesh ref={telemetryRingRef} rotation={[0.45, 0.25, 0]}>
        <ringGeometry args={[3.92, 3.94, 96]} />
        <meshBasicMaterial
          color="#D5BDA4"
          side={THREE.DoubleSide}
          transparent
          opacity={0.32}
        />
      </mesh>

      {/* Orbiting Telemetry Satellite */}
      <group ref={probeRef}>
        {/* Core telemetry pod */}
        <mesh>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color="#FAF3E7"
            emissive="#542B38"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Sensor solar wings in champagne wireframe */}
        <mesh scale={[1.8, 0.2, 0.4]}>
          <boxGeometry args={[0.22, 0.05, 0.12]} />
          <meshStandardMaterial
            color="#D5BDA4"
            emissive="#A56F73"
            emissiveIntensity={0.4}
            wireframe
          />
        </mesh>
        {/* Beacon light emitting soft champagne glow */}
        <pointLight intensity={1.8} distance={2.5} color="#F7ECDD" />
      </group>
    </group>
  );
}

// ============================================================================
// Deep-Space Atmosphere & Celestial Backdrop
// ============================================================================
function DeepSpaceEnvironment() {
  // Distant glowing stars with warm champagne & ivory tones
  const [starPositions] = useState(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 40;
      pos[idx + 1] = (Math.random() - 0.5) * 30;
      pos[idx + 2] = -12 - Math.random() * 20;
    }
    return pos;
  });

  return (
    <>
      {/* Rich Three.js Starfield */}
      <Stars
        radius={70}
        depth={45}
        count={3200}
        factor={3.8}
        saturation={0.15}
        fade
        speed={0.4}
      />

      {/* Distant Warm Celestial Starfield Cluster */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#FCEFD8"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ------------------------------------------------------------------ */}
      {/* Realistic Cinematic Directional Lighting                           */}
      {/* ------------------------------------------------------------------ */}
      {/* Primary Sun Key Light - Creates dramatic day/night terminator on Saturn & shadows */}
      <directionalLight
        position={[-7, 5, 6]}
        intensity={2.8}
        color="#FFFDF7"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0001}
      />

      {/* Fill Light - Soft muted burgundy illuminating shadows naturally */}
      <directionalLight
        position={[6, -3, -2]}
        intensity={0.45}
        color="#8B5B69"
      />

      {/* Ambient Light - Deep warm tone preserving dark-side detail */}
      <ambientLight intensity={0.28} color="#352129" />

      {/* Space Glow / Rim Light around Saturn's silhouette */}
      <pointLight
        position={[1.9, 0, -3.2]}
        intensity={2.2}
        distance={9}
        color="#D5BDA4"
      />
    </>
  );
}

// ============================================================================
// Main Exported Saturn Hero Canvas Component
// ============================================================================
export default function SaturnHeroCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      className="w-full h-full"
    >
      <DeepSpaceEnvironment />
      <SaturnSystem />
    </Canvas>
  );
}

