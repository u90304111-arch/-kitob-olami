"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Search, Heart, Menu, X, Sparkles } from "lucide-react";

interface HeaderProps {
  favoriteCount: number;
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({
  favoriteCount,
  onOpenSearch,
  onNavigateSection,
  activeSection,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Bosh sahifa" },
    { id: "catalog", label: "Kitoblar" },
    { id: "genres", label: "Janrlar" },
    { id: "problem-solution", label: "Muammo va yechim" },
    { id: "favorites", label: "Sevimlilar" },
  ];

  const handleNav = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-blue-100 shadow-lg shadow-blue-500/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <button
          onClick={() => handleNav("hero")}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 p-0.5 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-navy rounded-[10px] flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5 text-sky-300 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-navy flex items-center gap-1">
              KITOB <span className="text-blue-600">TOP</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </span>
            <span className="text-[10px] font-semibold text-blue-500 uppercase tracking-widest -mt-1">
              Raqamli Kutubxona
            </span>
          </div>
        </button>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-100/80 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-navy-800 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full bg-white/80 hover:bg-blue-50 text-navy hover:text-blue-600 border border-blue-100 shadow-sm transition-all duration-200 hover:scale-105"
            aria-label="Qidirish"
            title="Qidirish"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Favorites Button */}
          <button
            onClick={() => handleNav("favorites")}
            className="relative p-2.5 rounded-full bg-white/80 hover:bg-rose-50 text-navy hover:text-rose-600 border border-blue-100 shadow-sm transition-all duration-200 hover:scale-105"
            aria-label="Sevimlilar"
            title="Sevimli kitoblar"
          >
            <Heart className={`w-5 h-5 ${favoriteCount > 0 ? "text-rose-500 fill-rose-500" : ""}`} />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-black rounded-full flex items-center justify-center animate-bounce shadow-md">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-white/80 text-navy border border-blue-100 shadow-sm"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-blue-100 px-4 pt-3 pb-6 mt-3 shadow-xl animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-navy hover:bg-blue-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
