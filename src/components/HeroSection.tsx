"use client";

import React, { useState } from "react";
import Hero3DCanvas from "./3d/Hero3DCanvas";
import { Search, ArrowDown, Sparkles, Compass, Flame } from "lucide-react";

interface HeroSectionProps {
  onSearchSubmit: (query: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function HeroSection({
  onSearchSubmit,
  onNavigateSection,
}: HeroSectionProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-950 text-white">
      {/* Background glowing particles & ambient blur orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-cyan-400/15 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle cloud / geometric background lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT TEXT COLUMN */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold text-sky-200 animate-pulse-glow">
              <Flame className="w-4 h-4 text-amber-400" />
              Kitoblar — yangi dunyo
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>

            {/* Main Uzbek Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              <span className="block text-white">
                Kitob qidirib charchadingizmi?
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-blue-200 mt-1">
                Bizda siz izlagan kitoblar bor!
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-xl">
              Kerakli kitobni topish uchun soatlab vaqt sarflamang. KITOB TOP orqali sevimli kitoblaringizni qidiring, yangi asarlarni kashf eting va o‘zingizga mos kitobni bir necha soniyada toping.
            </p>

            {/* Working Search Bar */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl relative group mt-2"
            >
              <div className="relative flex items-center bg-white/95 rounded-2xl p-2 shadow-2xl shadow-blue-900/50 border border-blue-200/80 focus-within:ring-4 focus-within:ring-sky-400/40 transition-all duration-300">
                <Search className="w-5 h-5 text-blue-600 ml-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Kitob nomi yoki muallifini yozing..."
                  className="w-full bg-transparent text-navy font-medium placeholder-gray-400 px-3 py-2 focus:outline-none text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient-to-r from-blue-600 to-electric text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-blue-500/40 active:scale-95 transition-all duration-200 flex-shrink-0"
                >
                  Qidirish
                </button>
              </div>
            </form>

            {/* Two Animated Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigateSection("catalog")}
                className="px-8 py-4 rounded-2xl bg-white text-navy font-extrabold text-sm sm:text-base shadow-xl shadow-white/10 hover:bg-sky-50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform" />
                Kitoblarni topish
              </button>

              <button
                onClick={() => onNavigateSection("how-it-works")}
                className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
              >
                <Compass className="w-5 h-5 text-sky-300" />
                Qanday ishlaydi?
              </button>
            </div>

            {/* Scroll Indicator Hint */}
            <div className="pt-4 flex items-center gap-2 text-xs font-semibold text-sky-200/80">
              <ArrowDown className="w-4 h-4 animate-bounce text-sky-300" />
              <span>Pastga aylantiring — 3D interaktiv olamni kashf eting</span>
            </div>

          </div>

          {/* RIGHT 3D CANVAS COLUMN */}
          <div className="lg:col-span-6 relative">
            {/* Background 3D Glow aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 to-blue-600/30 rounded-full blur-3xl" />
            <Hero3DCanvas />
          </div>

        </div>
      </div>
    </section>
  );
}
