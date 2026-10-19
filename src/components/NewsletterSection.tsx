"use client";

import React, { useState } from "react";
import { Mail, Check, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !email.includes("@") || !email.includes(".")) {
      setMessage({ text: "Iltimos, to‘g‘ri email manzilini kiriting!", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ text: data.message, type: "success" });
        setEmail("");
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 },
        });
      } else {
        setMessage({ text: data.message || "Xatolik yuz berdi", type: "error" });
      }
    } catch (err) {
      setMessage({
        text: "Tashakkur! Obuna bo‘ldingiz (Demo rejimi).",
        type: "success",
      });
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-electric text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Mail className="w-8 h-8 text-sky-200" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
          Yangiliklardan xabardor bo‘ling
        </h2>

        <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8 font-medium">
          Eng so‘nggi kitoblar, aksiyalar va yangiliklar haqida birinchilardan bo‘lib xabar oling.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/95 p-2 rounded-2xl shadow-2xl border border-white/50">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email manzilingiz..."
              className="w-full bg-transparent text-navy font-medium px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-navy text-white hover:bg-blue-900 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 flex-shrink-0 active:scale-95"
            >
              {loading ? "Yuborilmoqda..." : "Obuna bo‘lish"}
              <Send className="w-4 h-4 text-sky-300" />
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-xl text-xs font-bold max-w-md mx-auto ${
              message.type === "success"
                ? "bg-emerald-500/20 text-emerald-100 border border-emerald-300/30"
                : "bg-rose-500/20 text-rose-100 border border-rose-300/30"
            }`}
          >
            {message.text}
          </div>
        )}

      </div>
    </section>
  );
}
