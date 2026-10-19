"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Kerakli kitobni qanday topaman?",
      a: "Bosh sahifadagi yoki yuqori navigatsiyadagi qidiruv satriga kitob nomi, muallif ismi yoki kalit so‘zlarni kiritib 1 soniyada topishingiz mumkin. Shuningdek, 3D interaktiv scroll bo'limi orqali kitoblarni ko'zdan kechirishingiz mumkin.",
    },
    {
      q: "Kitoblarni janr bo‘yicha qanday saralayman?",
      a: "Katalog bo‘limidagi janr tugmalari (Romanlar, Badiiy adabiyot, Biznes, Tarix, va hokazo) yoki tepadagi janr filtridan foydalanib saralashingiz mumkin.",
    },
    {
      q: "Sevimli kitoblarimni saqlay olamanmi?",
      a: "Ha! Har bir kitob kartasidagi yoki 3D tafsilot oynasidagi yurak tugmasini bosish orqali kitoblarni sevimlilar ro‘yxatiga saqlashingiz mumkin. Saqlangan kitoblar kompyuteringiz yoki telefoningiz xotirasida saqlanadi.",
    },
    {
      q: "Saytdagi narxlar haqiqiymi?",
      a: "KITOB TOP — bu namuna va demo platformasi hisoblanadi. Ko‘rsatilgan narxlar o‘zbek kitob bozoridagi o‘rtacha narxlarning namunasidir.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-pale-blue relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Ko‘p So‘raladigan Savollar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Tez-tez so‘raladigan savollar
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="glass-card rounded-2xl bg-white border border-blue-100 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-navy text-base sm:text-lg flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                      ?
                    </span>
                    {faq.q}
                  </span>
                  <div
                    className={`p-2 rounded-full bg-pale-blue text-navy transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-blue-600 text-white" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
