"use client";

import React, { useState } from "react";
import { Book } from "@/data/books";
import { Sparkles, ChevronLeft, ChevronRight, Eye, Heart, Star } from "lucide-react";

interface RecommendationsSectionProps {
  books: Book[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectBook: (book: Book) => void;
}

export default function RecommendationsSection({
  books,
  favorites,
  onToggleFavorite,
  onSelectBook,
}: RecommendationsSectionProps) {
  const [startIndex, setStartIndex] = useState(0);

  const recommendedBooks = books.filter((b) => b.rating >= 4.8);
  const itemsPerPage = 4;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(recommendedBooks.length - itemsPerPage, prev + 1)
    );
  };

  const visibleBooks = recommendedBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Siz uchun tavsiyalar
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Yuqori baholangan asarlar
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="p-2.5 rounded-full border border-blue-100 bg-white text-navy hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= recommendedBooks.length - itemsPerPage}
              className="p-2.5 rounded-full border border-blue-100 bg-white text-navy hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Recommended Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {visibleBooks.map((book) => {
            const isFav = favorites.includes(book.id);

            return (
              <div
                key={book.id}
                className="glass-card rounded-2xl p-3 sm:p-4 bg-pale-blue/40 hover:bg-white border border-blue-100 flex flex-col justify-between group transition-all duration-300"
              >
                <div
                  onClick={() => onSelectBook(book)}
                  className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-blue-950 relative mb-3 cursor-pointer shadow-md group-hover:shadow-xl transition-all"
                >
                  <img
                    src={`/covers/${book.id}.svg`}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(book.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-gray-400 hover:text-rose-500 shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{book.rating}</span>
                    <span className="text-gray-400 font-normal ml-auto text-[11px]">{book.genre}</span>
                  </div>

                  <h4
                    onClick={() => onSelectBook(book)}
                    className="font-bold text-navy text-sm line-clamp-1 hover:text-blue-600 cursor-pointer"
                  >
                    {book.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mb-3">{book.author}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs font-black text-blue-700">{book.formattedPrice}</span>
                    <button
                      onClick={() => onSelectBook(book)}
                      className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
