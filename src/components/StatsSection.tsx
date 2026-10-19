"use client";

import React from "react";
import { BookOpen, Layers, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      num: "20",
      label: "Kitob",
      sub: "Katalogda jamlangan",
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
    },
    {
      num: "8",
      label: "Janrlar",
      sub: "Har xil yo'nalishlar",
      icon: <Layers className="w-8 h-8 text-cyan-600" />,
    },
    {
      num: "100%",
      label: "Siz uchun",
      sub: "Interaktiv 3D tajriba",
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 via-navy to-indigo-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs text-sky-300 font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Demo Ko‘rsatkichlar
            </span>
            <h2 className="text-2xl font-black text-white">
              KITOB TOP raqamlarda
            </h2>
          </div>
          <p className="text-xs text-blue-200/80 max-w-sm">
            Platformamiz kitobxonlar uchun eng tez va qulay qidiruv hamda 3D vizualizatsiyani taqdim etadi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/15 flex items-center gap-5 hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {item.num}
                </div>
                <div className="text-sm font-bold text-sky-200">{item.label}</div>
                <div className="text-xs text-blue-200/70">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
