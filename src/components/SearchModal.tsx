"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, BookOpen, ChevronRight, Star } from "lucide-react";
import { Book } from "@/data/books";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  onSelectBook: (book: Book) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  books,
  onSelectBook,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()) ||
          b.genre.toLowerCase().includes(query.toLowerCase())
      )
    : books.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-navy-950/60 backdrop-blur-md transition-all duration-300">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3 bg-pale-blue/50">
          <Search className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kitob nomi yoki muallifini yozing..."
            className="w-full bg-transparent text-navy text-base sm:text-lg font-medium placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 bg-white hover:bg-gray-100 text-gray-500 rounded-full shadow-sm text-xs font-semibold px-3"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            {query.trim() ? `Natijalar (${filtered.length})` : "Tavsiya etilgan kitoblar"}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <BookOpen className="w-10 h-10 text-blue-300 mx-auto mb-2 opacity-50" />
              <p className="font-semibold text-sm">Afsuski, "{query}" bo‘yicha kitob topilmadi.</p>
              <p className="text-xs text-gray-400 mt-1">Boshqa nom yoki muallifni qidirib ko‘ring.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map((book) => (
                <button
                  key={book.id}
                  onClick={() => {
                    onClose();
                    onSelectBook(book);
                  }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-blue-50/80 text-left transition-all duration-200 group border border-transparent hover:border-blue-100"
                >
                  <div className="w-12 h-16 rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-blue-900">
                    <img
                      src={`/covers/${book.id}.svg`}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-navy text-sm sm:text-base group-hover:text-blue-600 transition-colors truncate">
                      {book.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium truncate">{book.author}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                        {book.genre}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600">
                        {book.formattedPrice}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-white group-hover:bg-blue-600 text-gray-400 group-hover:text-white shadow-sm transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
