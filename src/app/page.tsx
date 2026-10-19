"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Scroll3DExperienceSection from "@/components/Scroll3DExperienceSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import CatalogSection from "@/components/CatalogSection";
import FeaturedBookSection from "@/components/FeaturedBookSection";
import GenresSection from "@/components/GenresSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FavoritesSection from "@/components/FavoritesSection";
import RecommendationsSection from "@/components/RecommendationsSection";
import StatsSection from "@/components/StatsSection";
import FaqSection from "@/components/FaqSection";
import NewsletterSection from "@/components/NewsletterSection";
import AppDownloadSection from "@/components/AppDownloadSection";
import Footer from "@/components/Footer";
import Detail3DModal from "@/components/3d/Detail3DModal";
import SearchModal from "@/components/SearchModal";
import { INITIAL_BOOKS, Book } from "@/data/books";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [heroSearchQuery, setHeroSearchQuery] = useState("");

  // Load favorites from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kitobtop_favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save favorites to LocalStorage
  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("kitobtop_favorites", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleOpenDetailModal = (book: Book) => {
    setSelectedBook(book);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHeroSearch = (query: string) => {
    setHeroSearchQuery(query);
    handleNavigateSection("catalog");
  };

  const ikigaiBook = books.find((b) => b.title === "Ikigai") || books[18];

  return (
    <main className="min-h-screen bg-pale-blue text-navy selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Top Header Navigation */}
      <Header
        favoriteCount={favorites.length}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <HeroSection
        onSearchSubmit={handleHeroSearch}
        onNavigateSection={handleNavigateSection}
      />

      {/* Problem & Solution Section */}
      <ProblemSolutionSection />

      {/* Catalog Section with Exactly 20 Books */}
      <CatalogSection
        books={books}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onSelectBook={handleOpenDetailModal}
        initialSearchQuery={heroSearchQuery}
      />

      {/* Signature 3D Scroll Experience */}
      <Scroll3DExperienceSection
        onSelectBook={handleOpenDetailModal}
      />

      {/* Featured Book Section (Ikigai) */}
      <FeaturedBookSection
        book={ikigaiBook}
        onSelectBook={handleOpenDetailModal}
      />

      {/* Genres Grid Section */}
      <GenresSection
        onSelectGenre={(genre) => {
          handleNavigateSection("catalog");
        }}
      />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Recommendations Section */}
      <RecommendationsSection
        books={books}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onSelectBook={handleOpenDetailModal}
      />

      {/* Favorites Section */}
      <FavoritesSection
        favoriteIds={favorites}
        allBooks={books}
        onToggleFavorite={handleToggleFavorite}
        onSelectBook={handleOpenDetailModal}
        onNavigateSection={handleNavigateSection}
      />

      {/* Statistics Section */}
      <StatsSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Mobile App Section */}
      <AppDownloadSection />

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* 3D Book Detail Experience Modal */}
      <Detail3DModal
        book={selectedBook}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        isFavorite={selectedBook ? favorites.includes(selectedBook.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Quick Search Modal Overlay */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        books={books}
        onSelectBook={handleOpenDetailModal}
      />

    </main>
  );
}
