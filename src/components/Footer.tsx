"use client";

import React from "react";
import { BookOpen, Send, Mail, Sparkles, Heart, Globe, Share2 } from "lucide-react";

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export default function Footer({ onNavigateSection }: FooterProps) {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t border-blue-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-blue-900/60">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-navy rounded-[10px] flex items-center justify-center text-white">
                  <BookOpen className="w-5 h-5 text-sky-300" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                KITOB <span className="text-sky-400">TOP</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-blue-200/80 leading-relaxed max-w-sm">
              Kitoblar dunyosiga bir qadam yaqinroq. O‘zingiz izlagan asarlarni tez, qulay va 3D formatda kashf eting.
            </p>

            <div className="text-xs text-blue-300/80 italic border-l-2 border-sky-400 pl-3">
              “Yaxshi kitob — bu o'z hayotingizni o'zgartirishning eng qulay usulidir.”
              <span className="block font-semibold not-italic mt-0.5 text-sky-200">— Napoleon Hill</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-sky-300 uppercase tracking-wider">
              Navigatsiya
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-blue-200">
              <li>
                <button onClick={() => onNavigateSection("hero")} className="hover:text-white transition-colors">
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("catalog")} className="hover:text-white transition-colors">
                  Kitoblar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("genres")} className="hover:text-white transition-colors">
                  Janrlar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("problem-solution")} className="hover:text-white transition-colors">
                  Muammo va yechim
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("favorites")} className="hover:text-white transition-colors">
                  Sevimlilar
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-sky-300 uppercase tracking-wider">
              Bog‘lanish
            </h4>
            <ul className="space-y-2 text-xs text-blue-200">
              <li className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Telegram: @kitobtop_bot</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>Instagram: @kitobtop_uz</span>
              </li>
              <li className="flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span>YouTube: Kitob Top TV</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Email: info@kitobtop.uz</span>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold text-sky-300 uppercase tracking-wider">
              Ijtimoiy tarmoqlar
            </h4>
            <div className="flex items-center gap-2">
              <a href="https://t.me" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-sky-400 hover:text-navy text-white transition-all">
                <Send className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-sky-400 hover:text-navy text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-sky-400 hover:text-navy text-white transition-all">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300/70 gap-4">
          <div>
            © 2025 KITOB TOP. Barcha huquqlar himoyalangan.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Foydalanish shartlari</span>
            <span className="hover:text-white cursor-pointer transition-colors">Maxfiylik siyosati</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
