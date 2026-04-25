"use client";

import { useState } from "react";
import { MOCK_FEED, MOCK_LISTINGS } from "@/lib/mockData";
import FeedCard from "@/components/FeedCard";
import EventCard from "@/components/EventCard";

const CATEGORIES = [
  { key: "tümü", label: "Tümü", emoji: "✨" },
  { key: "konser", label: "Konser", emoji: "🎸" },
  { key: "festival", label: "Festival", emoji: "🎪" },
  { key: "workshop", label: "Workshop", emoji: "🕯️" },
  { key: "yemek", label: "Yemek", emoji: "🍽️" },
  { key: "seyahat", label: "Seyahat", emoji: "⛵" },
  { key: "müze", label: "Müze", emoji: "🖼️" },
];

const FOOD_TAGS = [
  { key: "pizza", label: "Pizza 🍕" },
  { key: "suşi", label: "Suşi 🍣" },
  { key: "mantı", label: "Mantı 🥟" },
  { key: "börek", label: "Börek" },
  { key: "şarap", label: "Şarap 🍷" },
  { key: "bira", label: "Bira 🍺" },
  { key: "kahve", label: "Kahve ☕" },
  { key: "sınırsız", label: "Sınırsız" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"feed" | "kesfet">("feed");
  const [activeCategory, setActiveCategory] = useState("tümü");
  const [activeFoodTag, setActiveFoodTag] = useState("");
  const [search, setSearch] = useState("");

  const q = search.toLowerCase().trim();

  const filteredListings = MOCK_LISTINGS.filter((l) => {
    const catMatch = activeCategory === "tümü" || l.category === activeCategory;
    const tagMatch = !activeFoodTag || l.tags.includes(activeFoodTag);
    const searchMatch =
      !q ||
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.venue.toLowerCase().includes(q) ||
      l.tags.some((t) => t.toLowerCase().includes(q)) ||
      l.city.toLowerCase().includes(q);
    return catMatch && tagMatch && searchMatch;
  });

  function handleCategoryChange(key: string) {
    setActiveCategory(key);
    setActiveFoodTag("");
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero banner */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-gradient-to-br from-emerald-900/40 via-green-900/20 to-slate-900 border border-emerald-800/30 rounded-2xl p-4">
          <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
            🎵 Müzik uyumuna göre eşleş
          </p>
          <h2 className="text-xl font-bold text-white leading-tight">
            Etkinliklere birlikte git,<br />
            <span className="text-emerald-400">yeni arkadaşlar edin.</span>
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Spotify müzik zevkin + etkinlik geçmişin → doğal buluşma
          </p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="px-4 pt-2">
        <div className="flex bg-slate-900 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveTab("feed")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "feed"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🔴 Canlı Akış
          </button>
          <button
            onClick={() => setActiveTab("kesfet")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "kesfet"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🔍 Keşfet
          </button>
        </div>
      </div>

      {/* Keşfet filters */}
      {activeTab === "kesfet" && (
        <>
          {/* Search */}
          <div className="px-4 pt-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pizza, konser, Kadıköy..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category chips */}
          <div className="px-4 pt-2 overflow-x-auto">
            <div className="flex gap-2 pb-1" style={{ width: "max-content" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
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

          {/* Food quick-tags */}
          {activeCategory === "yemek" && (
            <div className="px-4 pt-1 overflow-x-auto">
              <div className="flex gap-2 pb-1" style={{ width: "max-content" }}>
                {FOOD_TAGS.map((tag) => (
                  <button
                    key={tag.key}
                    onClick={() => setActiveFoodTag(activeFoodTag === tag.key ? "" : tag.key)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                      activeFoodTag === tag.key
                        ? "bg-cyan-600 text-white border-cyan-500"
                        : "bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Content */}
      <div className="flex-1 px-4 pt-3 pb-4 space-y-3">
        {activeTab === "feed" ? (
          <>
            <div className="flex items-center gap-2 py-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-slate-400 font-medium">
                {MOCK_FEED.length} etkinlik akışta
              </span>
            </div>
            {MOCK_FEED.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </>
        ) : (
          <>
            <p className="text-xs text-slate-500 py-1">
              {filteredListings.length} etkinlik bulundu
            </p>
            {filteredListings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <span className="text-4xl mb-3">🔍</span>
                <p className="text-sm">Sonuç bulunamadı.</p>
                <button
                  onClick={() => { setSearch(""); setActiveFoodTag(""); setActiveCategory("tümü"); }}
                  className="mt-3 text-xs text-emerald-400 underline"
                >
                  Filtreleri temizle
                </button>
              </div>
            ) : (
              filteredListings.map((listing) => (
                <EventCard key={listing.id} listing={listing} showCompatibility />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
