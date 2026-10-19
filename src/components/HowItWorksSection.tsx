"use client";

import React from "react";
import { Search, CheckCircle2, Sparkles, ArrowRight, Compass } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Qidiring",
      desc: "Kitob nomi, muallif yoki kerakli mavzuni qidiruv paneliga kiriting.",
      icon: <Search className="w-7 h-7 text-blue-600" />,
    },
    {
      num: "02",
      title: "Tanlang",
      desc: "3D vizualizatsiya va janrlar bo'yicha eng mos keladigan kitobni tanlang.",
      icon: <CheckCircle2 className="w-7 h-7 text-electric" />,
    },
    {
      num: "03",
      title: "Kashf eting",
      desc: "Kitob haqida to'liq ma'lumot oling va yangi mutolaa olamini kashf eting.",
      icon: <Sparkles className="w-7 h-7 text-amber-500" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-gradient-to-b from-white via-pale-blue to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            3 Oddiy Qadam
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Kerakli kitobni topish endi juda oson!
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="glass-card p-8 rounded-3xl bg-white border border-blue-100/80 relative flex flex-col items-start group hover:shadow-2xl transition-all duration-300"
            >
              {/* Step number badge */}
              <div className="absolute top-6 right-6 text-3xl font-black text-blue-100 group-hover:text-blue-200 transition-colors">
                {step.num}
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {step.desc}
              </p>

              {idx < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-blue-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
