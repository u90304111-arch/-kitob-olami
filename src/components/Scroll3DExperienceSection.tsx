"use client";

import React, { useState, useEffect, useRef } from "react";
import Scroll3DBookCanvas from "./3d/Scroll3DBookCanvas";
import { Book, INITIAL_BOOKS } from "@/data/books";
import { Layers, Sparkles, BookOpen, ChevronRight, Eye } from "lucide-react";

interface Scroll3DExperienceSectionProps {
  onSelectBook: (book: Book) => void;
}

export default function Scroll3DExperienceSection({
  onSelectBook,
}: Scroll3DExperienceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeBookIndex, setActiveBookIndex] = useState(0);

  const scrollBooks = [
    INITIAL_BOOKS[0], // O'tkan kunlar
    INITIAL_BOOKS[5], // Alkimyogar
    INITIAL_BOOKS[10], // 1984
    INITIAL_BOOKS[18], // Ikigai
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress within this 300vh section
      const totalScrollableDistance = rect.height - viewportHeight;
      const currentPassed = -rect.top;

      let progress = currentPassed / totalScrollableDistance;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);

      // Change book depending on scroll progress
      if (progress < 0.25) {
        setActiveBookIndex(0);
      } else if (progress < 0.5) {
        setActiveBookIndex(1);
      } else if (progress < 0.75) {
        setActiveBookIndex(2);
      } else {
        setActiveBookIndex(3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentBook = scrollBooks[activeBookIndex] || scrollBooks[0];

  // Helper text describing the 3D scroll scenes
  const scenesInfo = [
    {
      title: "1-Bosqich: Yopiq Kitob Parvozi",
      desc: "Scroll qilganingizda kitob ekranda ko'tarilib, tomoshabinga buriladi.",
      badge: "Yopiq Kitob",
    },
    {
      title: "2-Bosqich: Menteşali Ochiqlik",
      desc: "Front muqova spine bo'ylab ochiladi va ichidan mayin ko'k nur taraladi.",
      badge: "Nur Taralishi",
    },
    {
      title: "3-Bosqich: Sahifa Varoqlash",
      desc: "Individual 3D sahifalar o'ngdan chapga realistic egilish bilan varoqlanadi.",
      badge: "Varoqlash",
    },
    {
      title: "4-Bosqich: Mazmun Namoyishi",
      desc: "Kitob keng ochilib, uning ichki sahifalaridagi asar ma'lumoti va hikoyasini namoyish etadi.",
      badge: "To'liq Mazmun",
    },
  ];

  // Determine active scene text
  let currentSceneIndex = 0;
  if (scrollProgress >= 0.7) currentSceneIndex = 3;
  else if (scrollProgress >= 0.45) currentSceneIndex = 2;
  else if (scrollProgress >= 0.2) currentSceneIndex = 1;

  const currentScene = scenesInfo[currentSceneIndex];

  return (
    <section
      ref={sectionRef}
      className="relative h-[240vh] bg-gradient-to-b from-indigo-950 via-navy to-blue-950 text-white"
    >
      {/* STICKY 3D VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden">
        
        {/* Background Glowing Ambient Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/15 rounded-full blur-[150px] pointer-events-none" />

        {/* TOP BAR OVERLAY */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto w-full pt-16 sm:pt-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-electric animate-ping" />
            <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-sky-200 backdrop-blur-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Scroll-Controlled 3D Tajriba
            </span>
          </div>

          {/* Book Switcher Dots */}
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md p-1.5 rounded-full border border-white/10">
            {scrollBooks.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => {
                  const targetScroll = (idx / 4) * (sectionRef.current?.clientHeight || 0);
                  window.scrollTo({ top: (sectionRef.current?.offsetTop || 0) + targetScroll, behavior: "smooth" });
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeBookIndex === idx
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {b.title}
              </button>
            ))}
          </div>
        </div>

        {/* CENTER 3D CANVAS & TEXT OVERLAY */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full my-auto h-[65vh]">
          
          {/* LEFT SCENE INFORMATION CARD */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold border border-sky-300/30 w-fit">
              <Layers className="w-3.5 h-3.5" />
              {currentScene.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {currentScene.title}
            </h3>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              {currentScene.desc}
            </p>

            {/* Currently Active Book Info */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-sky-200 block font-medium">Hozirgi Kitob:</span>
                <span className="text-lg font-bold text-white">{currentBook.title}</span>
                <span className="text-xs text-blue-200 block">{currentBook.author}</span>
              </div>
              <button
                onClick={() => onSelectBook(currentBook)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-500/30 hover:scale-105 transition-all"
              >
                <Eye className="w-4 h-4" />
                Batafsil
              </button>
            </div>
          </div>

          {/* RIGHT 3D CANVAS */}
          <div className="lg:col-span-7 h-full w-full relative">
            <Scroll3DBookCanvas
              currentBook={currentBook}
              scrollProgress={scrollProgress}
            />
          </div>

        </div>

        {/* BOTTOM PROGRESS TRACK BAR */}
        <div className="relative z-20 max-w-7xl mx-auto w-full pb-4">
          <div className="flex items-center justify-between text-xs text-blue-200 font-semibold mb-2">
            <span>Scroll progress: {Math.round(scrollProgress * 100)}%</span>
            <span>Aylantirishda davom eting ↓</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-electric transition-all duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
