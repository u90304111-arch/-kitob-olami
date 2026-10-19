"use client";

import React, { useState, useMemo } from "react";
import { Book, GENRES } from "@/data/books";
import { Search, Heart, Star, SlidersHorizontal, BookOpen, Layers, Sparkles, Eye, ArrowUpDown } from "lucide-react";

interface CatalogSectionProps {
  books: Book[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectBook: (book: Book) => void;
  initialSearchQuery?: string;
}

export default function CatalogSection({
  books,
  favorites,
  onToggleFavorite,
  onSelectBook,
  initialSearchQuery = "",
}: CatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedGenre, setSelectedGenre] = useState<string>("Barcha kitoblar");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "title" | "rating">("default");

  // Filter & Sort Logic
  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q)
      );
    }

    // Genre filter
    if (selectedGenre && selectedGenre !== "Barcha kitoblar") {
      result = result.filter((b) => {
        if (selectedGenre === "Romanlar") return b.genre === "Roman" || b.genre === "Falsafiy roman";
        return b.genre.toLowerCase() === selectedGenre.toLowerCase();
      });
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [books, searchQuery, selectedGenre, sortBy]);

  return (
    <section id="catalog" className="py-20 sm:py-28 bg-pale-blue relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              Kitoblar katalogi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Siz uchun tanlangan 20 ta eng yaxshi kitob
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
              <span className="text-blue-600 font-extrabold text-sm mr-1">{filteredBooks.length}</span> ta natija
            </span>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROL BAR */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-blue-100 shadow-xl shadow-blue-500/5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kitob qidirish..."
              className="w-full pl-10 pr-4 py-2.5 bg-pale-blue/60 text-navy font-medium rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 border border-blue-100/60"
            />
          </div>

          {/* Genre Dropdown Mobile / Pills */}
          <div className="w-full md:w-auto flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 bg-pale-blue/60 text-navy font-bold rounded-2xl text-xs border border-blue-100 focus:outline-none cursor-pointer"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-4 py-2.5 bg-pale-blue/60 text-navy font-bold rounded-2xl text-xs border border-blue-100 focus:outline-none cursor-pointer"
              >
                <option value="default">Saralash: Standart</option>
                <option value="price-asc">Narx: Arzonroq</option>
                <option value="price-desc">Narx: Qimmatroq</option>
                <option value="title">Nom bo‘yicha (A-Z)</option>
                <option value="rating">Reyting bo‘yicha</option>
              </select>
            </div>
          </div>
        </div>

        {/* GENRE PILLS HORIZONTAL BAR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {GENRES.map((genre) => {
            const isActive = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-navy hover:bg-blue-50 border border-blue-100"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-blue-100 shadow-sm max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-blue-300 mx-auto mb-3 opacity-60" />
            <h3 className="text-xl font-bold text-navy mb-1">Mos kitob topilmadi</h3>
            <p className="text-sm text-gray-500 mb-6">
              Siz kiritgan qidiruv shartlari bo‘yicha birorta ham kitob topilmadi.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("Barcha kitoblar");
                setSortBy("default");
              }}
              className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
            >
              Qidiruvni tozalash
            </button>
          </div>
        ) : (
          /* 20 BOOK PRODUCTS GRID */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredBooks.map((book) => {
              const isFav = favorites.includes(book.id);

              return (
                <div
                  key={book.id}
                  className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group p-3 sm:p-4 bg-white relative hover:shadow-2xl transition-all duration-300 border border-blue-100"
                >
                  {/* Card Index Badge 1-20 */}
                  <div className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full bg-navy/80 text-white text-[11px] font-black flex items-center justify-center backdrop-blur-md">
                    {book.id}
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={() => onToggleFavorite(book.id)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-rose-500 shadow-sm transition-transform duration-200 active:scale-90"
                    aria-label="Sevimlilar"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>

                  {/* Book Cover Image Container */}
                  <div
                    onClick={() => onSelectBook(book)}
                    className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-950 mb-3 relative cursor-pointer group-hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={`/covers/${book.id}.svg`}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Subtle Shine Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                      <span className="w-full py-1.5 rounded-lg bg-blue-600/90 text-white text-[11px] font-bold text-center backdrop-blur-sm flex items-center justify-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> 3D Ko‘rish
                      </span>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-blue-600 mb-1">
                        <span className="truncate max-w-[100px]">{book.genre}</span>
                        <div className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{book.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => onSelectBook(book)}
                        className="font-bold text-navy text-sm sm:text-base leading-snug line-clamp-1 hover:text-blue-600 cursor-pointer transition-colors mb-0.5"
                        title={book.title}
                      >
                        {book.title}
                      </h3>

                      <p className="text-xs text-gray-500 font-medium line-clamp-1 mb-2">
                        {book.author}
                      </p>
                    </div>

                    {/* Price & Batafsil Action */}
                    <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                      <div className="text-xs font-black text-blue-700">
                        {book.formattedPrice}
                      </div>

                      <button
                        onClick={() => onSelectBook(book)}
                        className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1 active:scale-95"
                      >
                        Batafsil
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
