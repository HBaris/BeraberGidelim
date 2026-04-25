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
  { key: "gastronomi", label: "Gastronomi", emoji: "🍣" },
  { key: "seyahat", label: "Seyahat", emoji: "⛵" },
  { key: "müze", label: "Müze", emoji: "🖼️" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"feed" | "kesfet">("feed");
  const [activeCategory, setActiveCategory] = useState("tümü");

  const filteredListings =
    activeCategory === "tümü"
      ? MOCK_LISTINGS
      : MOCK_LISTINGS.filter((l) => l.category === activeCategory);

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

      {/* Category filter (kesfet tab) */}
      {activeTab === "kesfet" && (
        <div className="px-4 pt-3 overflow-x-auto">
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
            {filteredListings.map((listing) => (
              <EventCard key={listing.id} listing={listing} showCompatibility />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
