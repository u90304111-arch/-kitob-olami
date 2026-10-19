"use client";

import React from "react";
import { Smartphone, QrCode, Sparkles } from "lucide-react";

export default function AppDownloadSection() {
  return (
    <section className="py-16 bg-white border-t border-blue-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-pale-blue via-white to-blue-50/50 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              Mobil Ilova
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-navy">
              KITOB TOP ilovasini yuklab oling!
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              Mobil qurilmangizda ham kitoblar olamiga sho‘ng‘ing, 3D mutolaa va audiolarni tinglang.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <div className="px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-bold flex items-center gap-2 shadow-md">
                <span>App Store (Tez kunda)</span>
              </div>
              <div className="px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-bold flex items-center gap-2 shadow-md">
                <span>Google Play (Tez kunda)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-blue-100 shadow-md">
            <div className="w-20 h-20 bg-pale-blue rounded-xl flex items-center justify-center border border-blue-100">
              <QrCode className="w-14 h-14 text-navy" />
            </div>
            <div className="text-xs text-navy font-semibold">
              <div className="font-bold text-sm text-blue-600">QR Kodni skanerlang</div>
              <div>Telefoningiz orqali darhol ilovani ko'rish uchun</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
