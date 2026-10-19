"use client";

import React from "react";
import { Book } from "@/data/books";
import { Heart, Trash2, Eye, BookOpen, ArrowRight } from "lucide-react";

interface FavoritesSectionProps {
  favoriteIds: number[];
  allBooks: Book[];
  onToggleFavorite: (id: number) => void;
  onSelectBook: (book: Book) => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function FavoritesSection({
  favoriteIds,
  allBooks,
  onToggleFavorite,
  onSelectBook,
  onNavigateSection,
}: FavoritesSectionProps) {
  const favoriteBooks = allBooks.filter((b) => favoriteIds.includes(b.id));

  return (
    <section id="favorites" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-blue-100">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              Sizning Sevimlilaringiz
            </span>
            <h2 className="text-3xl font-extrabold text-navy tracking-tight">
              Sevimli kitoblarim ({favoriteBooks.length})
            </h2>
          </div>
        </div>

        {/* Empty State */}
        {favoriteBooks.length === 0 ? (
          <div className="text-center py-16 px-4 bg-pale-blue/60 rounded-3xl border border-blue-100 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">
              Sevimli kitoblarim ro‘yxati bo‘sh
            </h3>
            <p className="text-sm text-gray-600 mb-6 font-medium">
              Siz hali hech qanday kitobni sevimlilarga qo‘shmadingiz. Kitob kartasidagi yurak belgisini bosib saqlashingiz mumkin.
            </p>
            <button
              onClick={() => onNavigateSection("catalog")}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 mx-auto"
            >
              <BookOpen className="w-4 h-4" />
              Kitoblar katalogiga o‘tish
            </button>
          </div>
        ) : (
          /* Favorites Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {favoriteBooks.map((book) => (
              <div
                key={book.id}
                className="glass-card rounded-2xl p-3 sm:p-4 bg-white border border-blue-100 flex flex-col justify-between group transition-all duration-300 relative"
              >
                <button
                  onClick={() => onToggleFavorite(book.id)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 transition-colors shadow-sm"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div
                  onClick={() => onSelectBook(book)}
                  className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-blue-950 mb-3 cursor-pointer shadow-md group-hover:shadow-xl transition-all"
                >
                  <img
                    src={`/covers/${book.id}.svg`}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div>
                  <span className="text-[11px] font-bold text-blue-600 block mb-0.5">
                    {book.genre}
                  </span>
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
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
