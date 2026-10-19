"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Book } from "@/data/books";
import { drawBookCoverToCanvas } from "@/utils/createBookTexture";
import { X, Heart, BookOpen, Star, Sparkles, Check, Share2, Tag, Calendar, Layers } from "lucide-react";
import confetti from "canvas-confetti";

interface Detail3DModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

function Detail3DBookMesh({ book }: { book: Book }) {
  const groupRef = useRef<THREE.Group>(null!);
  const coverPivotRef = useRef<THREE.Group>(null!);
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => setIsOpenAnimation(true), 300);
    return () => clearTimeout(timer);
  }, [book.id]);

  const width = 1.9;
  const height = 2.7;
  const thickness = 0.3;

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetAngle = isOpenAnimation ? Math.PI * 0.82 : 0;
    if (coverPivotRef.current) {
      coverPivotRef.current.rotation.y = THREE.MathUtils.lerp(
        coverPivotRef.current.rotation.y,
        -targetAngle,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} rotation={[0.1, Math.PI * 0.1, 0]}>
      <pointLight position={[0, 0.2, 0.4]} intensity={2.0} color="#77C8FF" distance={5} />

      {/* BACK COVER & SPINE */}
      <mesh position={[width / 2, 0, -thickness / 2]}>
        <boxGeometry args={[width, height, 0.04]} />
        <meshStandardMaterial map={textures.back} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.04, height, thickness]} />
        <meshStandardMaterial map={textures.spine} roughness={0.3} />
      </mesh>

      {/* PAPER STACK */}
      <mesh position={[width / 2 - 0.02, 0, 0]}>
        <boxGeometry args={[width - 0.08, height - 0.08, thickness - 0.04]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.9} />
      </mesh>

      {/* INNER LEFT PAGE */}
      <mesh position={[width / 2 - 0.02, 0, thickness / 2 - 0.02]}>
        <planeGeometry args={[width - 0.06, height - 0.06]} />
        <meshStandardMaterial map={textures.leftPage} side={THREE.DoubleSide} roughness={0.8} />
      </mesh>

      {/* FRONT COVER WITH HINGE */}
      <group ref={coverPivotRef} position={[0, 0, thickness / 2]}>
        <mesh position={[width / 2, 0, 0]}>
          <boxGeometry args={[width, height, 0.04]} />
          <meshStandardMaterial map={textures.front} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

export default function Detail3DModal({
  book,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: Detail3DModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const handleFavClick = () => {
    onToggleFavorite(book.id);
    if (!isFavorite) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#1685FF", "#77C8FF", "#0755D9"],
      });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-navy-950/70 backdrop-blur-md transition-all duration-300">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl bg-white/95 rounded-3xl shadow-2xl border border-blue-200/80 overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 hover:bg-white text-gray-600 hover:text-navy-900 rounded-full shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Yopish"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Column: 3D Interactive Canvas */}
        <div className="lg:col-span-6 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 p-6 sm:p-8 flex flex-col justify-between relative min-h-[380px] sm:min-h-[460px]">
          {/* Subtle glowing orb */}
          <div className="absolute top-10 left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-300/30 text-xs font-semibold text-sky-200 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              3D Interaktiv Vizualizatsiya
            </span>
            <span className="text-xs text-blue-200 font-medium hidden sm:inline">
              Aylantirish uchun sudrang
            </span>
          </div>

          <div className="w-full h-[320px] sm:h-[380px] relative">
            <Canvas camera={{ position: [0, 0, 4.8], fov: 42 }}>
              <ambientLight intensity={1.1} />
              <directionalLight position={[4, 6, 4]} intensity={1.5} />
              <directionalLight position={[-4, -3, -2]} intensity={0.5} color="#77C8FF" />
              <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
                <Detail3DBookMesh book={book} />
              </Float>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
              <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={6} blur={2} color="#0755D9" />
            </Canvas>
          </div>

          <div className="relative z-10 text-center text-xs text-blue-200/80">
            Sichqoncha yoki barmog'ingiz orqali 360° ko'rishingiz mumkin
          </div>
        </div>

        {/* Right Column: Book Details */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white text-navy">
          <div>
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                {book.genre}
              </span>
              {book.badge && (
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                  {book.badge}
                </span>
              )}
              <div className="ml-auto flex items-center gap-1 text-amber-500 text-sm font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {book.rating} / 5.0
              </div>
            </div>

            {/* Title & Author */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight mb-2">
              {book.title}
            </h2>
            <p className="text-base text-blue-600 font-semibold mb-5 flex items-center gap-1.5">
              Muallif: <span className="text-navy">{book.author}</span>
            </p>

            {/* Price Box */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 rounded-2xl border border-blue-100 mb-6 flex items-center justify-between">
              <div>
                <div className="text-xs text-blue-500 font-medium">Kitob narxi (namuna)</div>
                <div className="text-2xl font-black text-blue-700">{book.formattedPrice}</div>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>Mavjudligi: <span className="text-emerald-600 font-bold">Mavjud</span></div>
                <div>Yetkazish: <span className="font-semibold text-navy">1-2 kun</span></div>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6 text-center text-xs">
              <div className="bg-pale-blue p-3 rounded-xl border border-blue-100">
                <Layers className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <span className="text-gray-500 block">Sahifalar</span>
                <span className="font-bold text-navy text-sm">{book.pages} bet</span>
              </div>
              <div className="bg-pale-blue p-3 rounded-xl border border-blue-100">
                <Calendar className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <span className="text-gray-500 block">Chaqirilgan yil</span>
                <span className="font-bold text-navy text-sm">{book.year}</span>
              </div>
              <div className="bg-pale-blue p-3 rounded-xl border border-blue-100">
                <Tag className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <span className="text-gray-500 block">Tili</span>
                <span className="font-bold text-navy text-sm">{book.language}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-navy mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Asar haqida qisqacha
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto pr-2">
                {book.summary}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
            <button
              onClick={handleFavClick}
              className={`flex-1 py-3.5 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                isFavorite
                  ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-sm"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 active:scale-95"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
              {isFavorite ? "Sevimli asar" : "Sevimlilarga qo‘shish"}
            </button>

            <button
              onClick={handleShare}
              className="p-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 relative"
              title="Ulashish"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
