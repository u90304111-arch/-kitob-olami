"use client";

import React from "react";
import { Book } from "@/data/books";
import { Sparkles, Star, ArrowRight, BookOpen, Flame } from "lucide-react";

interface FeaturedBookSectionProps {
  book: Book;
  onSelectBook: (book: Book) => void;
}

export default function FeaturedBookSection({
  book,
  onSelectBook,
}: FeaturedBookSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-900 via-navy to-indigo-950 text-white relative overflow-hidden my-10">
      {/* Background glowing particles & light beam */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/20 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COVER VISUAL */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={() => onSelectBook(book)}
              className="relative group cursor-pointer w-56 sm:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/30 border-2 border-white/30 transform group-hover:rotate-1 group-hover:scale-105 transition-all duration-300"
            >
              <img
                src={`/covers/${book.id}.svg`}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-400 text-navy text-xs font-black shadow-md flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-navy fill-navy" />
                Haftaning kitobi
              </div>
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-sky-200 text-xs font-bold border border-blue-300/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Maxsus Tavsiya
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {book.title}
            </h2>

            <p className="text-lg text-sky-200 font-semibold">
              Mualliflar: {book.author}
            </p>

            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed max-w-xl">
              {book.summary}
            </p>

            <div className="flex items-center gap-6 pt-2">
              <div>
                <span className="text-xs text-blue-200 block font-medium">Namuna narxi:</span>
                <span className="text-2xl font-black text-amber-400">{book.formattedPrice}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-400 font-bold text-sm bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <Star className="w-4 h-4 fill-amber-400" />
                {book.rating} / 5.0
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onSelectBook(book)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-electric text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Batafsil ko‘rish
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
