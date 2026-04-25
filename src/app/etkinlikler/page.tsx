"use client";

import { useState } from "react";
import { MOCK_LISTINGS } from "@/lib/mockData";
import EventCard from "@/components/EventCard";

const CATEGORIES = [
  { key: "tümü", label: "Tümü", emoji: "✨" },
  { key: "konser", label: "Konser", emoji: "🎸" },
  { key: "festival", label: "Festival", emoji: "🎪" },
  { key: "workshop", label: "Workshop", emoji: "🕯️" },
  { key: "gastronomi", label: "Gastronomi", emoji: "🍣" },
  { key: "seyahat", label: "Seyahat", emoji: "⛵" },
  { key: "müze", label: "Müze", emoji: "🖼️" },
];

const CITIES = ["Tüm Şehirler", "İstanbul", "Ankara", "İzmir", "Balıkesir"];

export default function EtkinliklerPage() {
  const [activeCategory, setActiveCategory] = useState("tümü");
  const [activeCity, setActiveCity] = useState("Tüm Şehirler");
  const [sortBy, setSortBy] = useState<"uyum" | "tarih" | "katilimci">("uyum");

  let filtered = MOCK_LISTINGS.filter((l) => {
    const catMatch = activeCategory === "tümü" || l.category === activeCategory;
    const cityMatch = activeCity === "Tüm Şehirler" || l.city === activeCity;
    return catMatch && cityMatch;
  });

  if (sortBy === "uyum") {
    filtered = [...filtered].sort(
      (a, b) => (b.musicCompatibility ?? 0) - (a.musicCompatibility ?? 0)
    );
  } else if (sortBy === "tarih") {
    filtered = [...filtered].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } else {
    filtered = [...filtered].sort((a, b) => b.attendeeCount - a.attendeeCount);
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="px-4 pt-4 space-y-3">
        <h1 className="text-xl font-bold text-white">Etkinlikler</h1>

        {/* Category filter */}
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex gap-2 pb-1" style={{ width: "max-content" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.key
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* City + sort */}
        <div className="flex gap-2">
          <select
            value={activeCity}
            onChange={(e) => setActiveCity(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                🏙️ {c}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            <option value="uyum">🎵 Müzik Uyumu</option>
            <option value="tarih">📅 Tarih</option>
            <option value="katilimci">👥 Katılımcı</option>
          </select>
        </div>

        <p className="text-xs text-slate-500">{filtered.length} etkinlik bulundu</p>
      </div>

      <div className="px-4 pb-4 mt-2 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-sm">Bu kriterlerde etkinlik bulunamadı.</p>
          </div>
        ) : (
          filtered.map((listing) => (
            <EventCard key={listing.id} listing={listing} variant="full" />
          ))
        )}
      </div>
    </div>
  );
}
