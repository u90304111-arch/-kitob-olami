"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Book } from "@/data/books";
import { drawBookCoverToCanvas } from "@/utils/createBookTexture";

interface Scroll3DBookCanvasProps {
  currentBook: Book;
  scrollProgress: number; // 0 to 1 across the 3D section
}

function AnimatedBookMesh({
  book,
  scrollProgress,
}: {
  book: Book;
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const coverPivotRef = useRef<THREE.Group>(null!);
  const page1PivotRef = useRef<THREE.Group>(null!);
  const page2PivotRef = useRef<THREE.Group>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  // Generate textures for current book
  const textures = useMemo(() => {
    const createTex = (type: "front" | "back" | "spine" | "page-inner-left" | "page-inner-right") => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 768;
      drawBookCoverToCanvas(canvas, book, type);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    return {
      front: createTex("front"),
      back: createTex("back"),
      spine: createTex("spine"),
      leftPage: createTex("page-inner-left"),
      rightPage: createTex("page-inner-right"),
    };
  }, [book.id]);

  // Page dimensions
  const width = 1.8;
  const height = 2.6;
  const thickness = 0.28;

  useFrame((state) => {
    if (!groupRef.current) return;

    // Timeline calculations based on scrollProgress (0 to 1)
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Smooth hover tilt based on mouse position
    const targetMouseX = (state.pointer.x * Math.PI) / 8;
    const targetMouseY = (state.pointer.y * Math.PI) / 8;

    let targetRotY = Math.PI * 0.15 + targetMouseX;
    let targetRotX = Math.PI * 0.05 + targetMouseY;
    let targetPosY = 0;
    let coverAngle = 0;
    let page1Angle = 0;
    let page2Angle = 0;
    let lightIntensity = 0.5;

    if (p < 0.2) {
      // Scene 1: Floating closed book rising
      const t = p / 0.2;
      targetPosY = -1 + t * 0.8;
      targetRotY = (1 - t) * Math.PI * 0.4 + t * (Math.PI * 0.15);
      targetRotX = 0.2 - t * 0.15;
      coverAngle = 0;
      page1Angle = 0;
      page2Angle = 0;
      lightIntensity = 0.2;
    } else if (p < 0.45) {
      // Scene 2: Opening cover
      const t = (p - 0.2) / 0.25;
      targetPosY = -0.2 + t * 0.2;
      targetRotY = Math.PI * 0.15 - t * (Math.PI * 0.1);
      targetRotX = 0.05 + t * 0.1;
      coverAngle = t * (Math.PI * 0.88); // Front cover opens
      page1Angle = 0;
      page2Angle = 0;
      lightIntensity = 0.2 + t * 1.5;
    } else if (p < 0.7) {
      // Scene 3: Page turning right to left
      const t = (p - 0.45) / 0.25;
      targetPosY = 0;
      targetRotY = 0.05;
      targetRotX = 0.15;
      coverAngle = Math.PI * 0.88;
      page1Angle = Math.min(Math.PI * 0.85, t * 1.3 * Math.PI);
      page2Angle = Math.max(0, (t - 0.4) * 1.2 * Math.PI);
      lightIntensity = 1.7 + Math.sin(t * Math.PI) * 0.8;
    } else if (p < 0.85) {
      // Scene 4: Wide reveal
      const t = (p - 0.7) / 0.15;
      targetPosY = 0.1 - t * 0.1;
      targetRotY = 0;
      targetRotX = 0.2 - t * 0.05;
      coverAngle = Math.PI * 0.88;
      page1Angle = Math.PI * 0.85;
      page2Angle = Math.PI * 0.82;
      lightIntensity = 2.2;
    } else {
      // Scene 5: Closing
      const t = (p - 0.85) / 0.15;
      targetPosY = -t * 0.8;
      targetRotY = -t * Math.PI * 0.3;
      targetRotX = 0.15 + t * 0.2;
      coverAngle = (1 - t) * Math.PI * 0.88;
      page1Angle = (1 - t) * Math.PI * 0.85;
      page2Angle = (1 - t) * Math.PI * 0.82;
      lightIntensity = (1 - t) * 2.2;
    }

    // Interpolate group transforms
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);

    if (coverPivotRef.current) {
      coverPivotRef.current.rotation.y = THREE.MathUtils.lerp(coverPivotRef.current.rotation.y, -coverAngle, 0.12);
    }
    if (page1PivotRef.current) {
      page1PivotRef.current.rotation.y = THREE.MathUtils.lerp(page1PivotRef.current.rotation.y, -page1Angle, 0.12);
    }
    if (page2PivotRef.current) {
      page2PivotRef.current.rotation.y = THREE.MathUtils.lerp(page2PivotRef.current.rotation.y, -page2Angle, 0.12);
    }
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, lightIntensity, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Book Inner Glow Light */}
      <pointLight
        ref={lightRef}
        position={[0, 0.2, 0.5]}
        color="#77C8FF"
        distance={6}
        intensity={0.5}
      />

      {/* BACK COVER & SPINE */}
      <mesh position={[width / 2, 0, -thickness / 2]}>
        <boxGeometry args={[width, height, 0.04]} />
        <meshStandardMaterial map={textures.back} roughness={0.3} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.04, height, thickness]} />
        <meshStandardMaterial map={textures.spine} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* PAPER STACK BLOCK */}
      <mesh position={[width / 2 - 0.02, 0, 0]}>
        <boxGeometry args={[width - 0.08, height - 0.08, thickness - 0.05]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.9} />
      </mesh>

      {/* PAGE EDGES LAYER SIMULATION */}
      <mesh position={[width - 0.02, 0, 0]}>
        <boxGeometry args={[0.02, height - 0.08, thickness - 0.05]} />
        <meshStandardMaterial color="#E6E0D4" roughness={0.95} />
      </mesh>

      {/* FRONT COVER WITH HINGE PIVOT */}
      <group ref={coverPivotRef} position={[0, 0, thickness / 2]}>
        <mesh position={[width / 2, 0, 0]}>
          <boxGeometry args={[width, height, 0.04]} />
          <meshStandardMaterial map={textures.front} roughness={0.3} metalness={0.1} />
        </mesh>
      </group>

      {/* ANIMATED TURNING PAGE 1 */}
      <group ref={page1PivotRef} position={[0, 0, thickness / 4]}>
        <mesh position={[width / 2 - 0.02, 0, 0]}>
          <planeGeometry args={[width - 0.04, height - 0.06]} />
          <meshStandardMaterial map={textures.leftPage} side={THREE.DoubleSide} roughness={0.8} />
        </mesh>
      </group>

      {/* ANIMATED TURNING PAGE 2 */}
      <group ref={page2PivotRef} position={[0, 0, 0]}>
        <mesh position={[width / 2 - 0.02, 0, 0]}>
          <planeGeometry args={[width - 0.04, height - 0.06]} />
          <meshStandardMaterial map={textures.rightPage} side={THREE.DoubleSide} roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

export default function Scroll3DBookCanvas({
  currentBook,
  scrollProgress,
}: Scroll3DBookCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-blue-900/10 rounded-2xl animate-pulse" />;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
        <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#77C8FF" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <AnimatedBookMesh book={currentBook} scrollProgress={scrollProgress} />
        </Float>

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.45}
          scale={7}
          blur={2.5}
          far={4}
          color="#0755D9"
        />
      </Canvas>
    </div>
  );
}
