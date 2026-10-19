"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { INITIAL_BOOKS, Book } from "@/data/books";
import { drawBookCoverToCanvas } from "@/utils/createBookTexture";

function HeroOpenBookMesh() {
  const groupRef = useRef<THREE.Group>(null!);
  const mainBook = INITIAL_BOOKS[0]; // O'tkan kunlar or Ikigai

  const textures = useMemo(() => {
    const createTex = (type: "front" | "back" | "spine" | "page-inner-left" | "page-inner-right") => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 768;
      drawBookCoverToCanvas(canvas, mainBook, type);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    return {
      leftPage: createTex("page-inner-left"),
      rightPage: createTex("page-inner-right"),
      front: createTex("front"),
      back: createTex("back"),
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.12 + (state.pointer.x * 0.2);
    groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.08 - (state.pointer.y * 0.1);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Light from book interior */}
      <pointLight position={[0, 0.4, 0.2]} intensity={2.5} color="#77C8FF" distance={5} />

      {/* LEFT OPEN PAGE */}
      <mesh position={[-0.9, 0, 0]} rotation={[0, 0.25, 0]}>
        <boxGeometry args={[1.7, 2.5, 0.08]} />
        <meshStandardMaterial map={textures.leftPage} roughness={0.7} />
      </mesh>

      {/* RIGHT OPEN PAGE */}
      <mesh position={[0.9, 0, 0]} rotation={[0, -0.25, 0]}>
        <boxGeometry args={[1.7, 2.5, 0.08]} />
        <meshStandardMaterial map={textures.rightPage} roughness={0.7} />
      </mesh>

      {/* SPINE CREASE SHADOW */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.08, 0.08, 2.5, 16]} />
        <meshStandardMaterial color="#0755D9" roughness={0.3} />
      </mesh>
    </group>
  );
}

function FloatingMiniBook({
  book,
  position,
  rotation,
  scale = 0.7,
  floatSpeed = 2,
}: {
  book: Book;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  floatSpeed?: number;
}) {
  const meshRef = useRef<THREE.Group>(null!);

  const frontTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 384;
    drawBookCoverToCanvas(canvas, book, "front");
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [book.id]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * floatSpeed;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.15;
    meshRef.current.rotation.y = rotation[1] + Math.cos(t * 0.8) * 0.15;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.4} floatIntensity={0.5}>
      <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
        {/* Book Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.3, 1.9, 0.22]} />
          <meshStandardMaterial map={frontTexture} roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Hero3DCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ikigaiBook = INITIAL_BOOKS.find((b) => b.title === "Ikigai") || INITIAL_BOOKS[18];
  const sariqDevBook = INITIAL_BOOKS.find((b) => b.title === "Sariq devni minib") || INITIAL_BOOKS[11];
  const book1984 = INITIAL_BOOKS.find((b) => b.title === "1984") || INITIAL_BOOKS[10];

  if (!mounted) {
    return <div className="w-full h-[450px] bg-blue-900/10 rounded-3xl animate-pulse" />;
  }

  return (
    <div className="w-full h-[420px] sm:h-[500px] lg:h-[580px] relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} castShadow />
        <directionalLight position={[-4, -3, -2]} intensity={0.6} color="#77C8FF" />

        {/* Central Open Photorealistic Book */}
        <HeroOpenBookMesh />

        {/* Floating Surround Books: Ikigai, Sariq devni minib, 1984 */}
        <FloatingMiniBook
          book={ikigaiBook}
          position={[-2.2, 1.3, 0.4]}
          rotation={[0.2, 0.4, -0.15]}
          scale={0.68}
          floatSpeed={1.8}
        />
        <FloatingMiniBook
          book={sariqDevBook}
          position={[2.1, 1.4, -0.2]}
          rotation={[-0.15, -0.3, 0.1]}
          scale={0.65}
          floatSpeed={2.2}
        />
        <FloatingMiniBook
          book={book1984}
          position={[2.2, -1.2, 0.3]}
          rotation={[0.3, -0.5, -0.1]}
          scale={0.62}
          floatSpeed={1.5}
        />

        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.5}
          scale={8}
          blur={2}
          color="#0755D9"
        />
      </Canvas>
    </div>
  );
}
