"use client";

import React from "react";
import { GENRES, GENRE_COUNTS } from "@/data/books";
import { BookOpen, Landmark, Briefcase, UserCheck, Compass, Sparkles, ScrollText, Layers } from "lucide-react";

interface GenresSectionProps {
  onSelectGenre: (genre: string) => void;
}

const GENRE_ICONS: Record<string, React.ReactNode> = {
  "Barcha kitoblar": <Layers className="w-6 h-6 text-blue-600" />,
  "Badiiy adabiyot": <BookOpen className="w-6 h-6 text-indigo-600" />,
  "Romanlar": <ScrollText className="w-6 h-6 text-cyan-600" />,
  "Tarix": <Landmark className="w-6 h-6 text-amber-600" />,
  "Biznes va moliya": <Briefcase className="w-6 h-6 text-emerald-600" />,
  "Shaxsiy rivojlanish": <UserCheck className="w-6 h-6 text-violet-600" />,
  "Sarguzasht": <Compass className="w-6 h-6 text-rose-600" />,
  "Fantastika": <Sparkles className="w-6 h-6 text-sky-600" />,
};

export default function GenresSection({ onSelectGenre }: GenresSectionProps) {
  return (
    <section id="genres" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            Mashhur janrlar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            O‘zingizga mos yo‘nalishdagi kitoblarni tanlang
          </h2>
        </div>

        {/* 8 Genre Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {GENRES.map((genre) => {
            const count = GENRE_COUNTS[genre] || 3;
            const icon = GENRE_ICONS[genre] || <BookOpen className="w-6 h-6 text-blue-600" />;

            return (
              <button
                key={genre}
                onClick={() => onSelectGenre(genre)}
                className="glass-card p-5 sm:p-6 rounded-3xl bg-pale-blue/50 hover:bg-white border border-blue-100/80 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md shadow-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {icon}
                </div>

                <h3 className="font-bold text-navy text-sm sm:text-base mb-1 group-hover:text-blue-600 transition-colors">
                  {genre}
                </h3>

                <span className="text-xs font-semibold text-gray-500 bg-blue-100/60 px-2.5 py-0.5 rounded-full">
                  {count} ta kitob
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
