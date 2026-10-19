"use client";

import React from "react";
import { Frown, CheckCircle2, ArrowRight, BookOpen, Sparkles, Clock, SearchCheck } from "lucide-react";

export default function ProblemSolutionSection() {
  return (
    <section id="problem-solution" className="py-20 sm:py-28 bg-gradient-to-b from-pale-blue via-white to-pale-blue relative overflow-hidden">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Nega aynan KITOB TOP?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Kitob qidiruvidagi muammo va bizning mukammal yechimimiz
          </h2>
        </div>

        {/* Two Animated Cards connected by glowing arrow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* PROBLEM CARD */}
          <div className="lg:col-span-5 glass-card p-8 sm:p-10 rounded-3xl border border-red-200/60 bg-gradient-to-br from-white via-rose-50/30 to-red-50/20 relative group hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-6 shadow-md shadow-rose-500/10 group-hover:scale-110 transition-transform">
              <Frown className="w-9 h-9" />
            </div>

            <div className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full mb-3">
              Keng tarqalgan qiyinchilik
            </div>

            <h3 className="text-2xl font-black text-navy mb-3 flex items-center gap-2">
              Muammo:
            </h3>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mb-6">
              Kerakli kitobni topish qiyin. Turli saytlarni qidirish ko‘p vaqt oladi.
            </p>

            <div className="pt-4 border-t border-rose-100 flex items-center gap-3 text-xs text-rose-600 font-semibold">
              <Clock className="w-4 h-4" />
              <span>O'rtacha 2-3 soat behuda vaqt sarfi</span>
            </div>
          </div>

          {/* CONNECTING ARROW & 3D BOOK TRANSITION ICON */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
            <div className="relative group">
              {/* Glowing ring animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
              
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-blue-700 to-electric text-white flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 sm:w-9 sm:h-9 animate-bounce text-sky-200" />
              </div>
            </div>

            <ArrowRight className="w-8 h-8 text-blue-600 mt-3 hidden lg:block animate-pulse" />
          </div>

          {/* SOLUTION CARD */}
          <div className="lg:col-span-5 glass-card p-8 sm:p-10 rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/30 to-sky-50/30 relative group hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-md shadow-emerald-500/10 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-3">
              KITOB TOP Yechimi
            </div>

            <h3 className="text-2xl font-black text-navy mb-3 flex items-center gap-2">
              Yechim:
            </h3>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed mb-6">
              Biz siz izlagan kitoblarni bir joyga jamladik! Qidiring, tanlang va o‘zingizga mos kitobni tezda toping.
            </p>

            <div className="pt-4 border-t border-emerald-100 flex items-center gap-3 text-xs text-emerald-700 font-semibold">
              <SearchCheck className="w-4 h-4 text-emerald-600" />
              <span>1 soniyada aniq natija va 3D ko'rinish</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
