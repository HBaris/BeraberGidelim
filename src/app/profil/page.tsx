"use client";

import { useState } from "react";
import { CURRENT_USER, MOCK_LISTINGS } from "@/lib/mockData";
import Link from "next/link";

const REVEAL_LABELS = [
  "Sadece etkinlik bilgisi görünüyor",
  "Müzik zevkin görünüyor",
  "Geçmiş etkinliklerin görünüyor",
  "Tam profil açık",
];

export default function ProfilPage() {
  const [revealLevel, setRevealLevel] = useState<0 | 1 | 2 | 3>(CURRENT_USER.revealLevel);

  const myListings = MOCK_LISTINGS.filter((l) => l.organizer.id === CURRENT_USER.id);

  return (
    <div className="flex flex-col">
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Profilim</h1>
            <p className="text-xs text-slate-500 mt-0.5">Nasıl göründüğünü kontrol et</p>
          </div>
          <button className="text-xs text-emerald-400 border border-emerald-500/40 px-3 py-1.5 rounded-full">
            Düzenle
          </button>
        </div>
      </div>

      {/* Profile card */}
      <div className="mx-4 mt-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={CURRENT_USER.avatarUrl}
              alt=""
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700"
            />
            {CURRENT_USER.isVerified && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                ✓ Doğrulandı
              </span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{CURRENT_USER.displayName}</h2>
            <p className="text-xs text-slate-400">{CURRENT_USER.city} · {CURRENT_USER.eventsAttended} etkinlik</p>
            <p className="text-xs text-slate-500 mt-0.5">Üye: {CURRENT_USER.memberSince}</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">{CURRENT_USER.bio}</p>

        {/* Music genres — front and center */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">🎵 Müzik Zevkim</h3>
            <button className="flex items-center gap-1 text-xs text-green-400 border border-green-500/30 px-2 py-1 rounded-full">
              <span>🎧</span>
              Spotify Bağlı
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {CURRENT_USER.musicGenres.map((g) => (
              <span
                key={g.name}
                className="flex items-center gap-1.5 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                <span className="text-base">{g.emoji}</span>
                {g.name}
              </span>
            ))}
            <button className="text-xs text-slate-500 border border-slate-700 border-dashed px-3 py-1.5 rounded-full hover:border-emerald-500/40">
              + Ekle
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800" />

        <div className="flex gap-2">
          {CURRENT_USER.spotify && (
            <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
              🎧 Spotify
            </div>
          )}
          <button className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full">
            📱 Instagram Bağla
          </button>
        </div>
      </div>

      {/* Progressive reveal */}
      <div className="mx-4 mt-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-white">🔒 Profil Görünürlüğü</h3>
          <p className="text-xs text-slate-500 mt-0.5">Başkalarının seni nasıl gördüğünü ayarla</p>
        </div>
        <div className="space-y-2">
          {REVEAL_LABELS.map((label, idx) => (
            <button
              key={idx}
              onClick={() => setRevealLevel(idx as 0 | 1 | 2 | 3)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                revealLevel === idx
                  ? "border-emerald-500/60 bg-emerald-600/10"
                  : "border-slate-800 bg-slate-950 hover:border-slate-700"
              }`}
            >
              <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${revealLevel === idx ? "border-emerald-500 bg-emerald-500" : "border-slate-600"}`}>
                {revealLevel === idx && <span className="text-[10px] text-white font-bold">✓</span>}
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-200">Seviye {idx}</p>
                <p className="text-[11px] text-slate-500">{label}</p>
              </div>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-600">
          Ortak etkinlik arttıkça profil detayları otomatik olarak da açılabilir.
        </p>
      </div>

      {/* Past events */}
      <div className="mx-4 mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">
            🎟️ Geçmiş Etkinliklerim
            <span className="ml-2 text-xs font-normal text-slate-500">(Sohbet açıcı!)</span>
          </h3>
          <button className="text-xs text-emerald-400">+ Ekle</button>
        </div>
        <div className="space-y-2">
          {CURRENT_USER.pastEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3"
            >
              <span className="text-2xl">{event.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{event.name}</p>
                <p className="text-xs text-slate-400">{event.venue} · {event.city} · {event.date}</p>
              </div>
              <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full flex-shrink-0">
                Icebreaker
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* My listings */}
      {myListings.length > 0 && (
        <div className="mx-4 mt-4 mb-4 space-y-3">
          <h3 className="text-sm font-semibold text-white">📣 Düzenlediğim Etkinlikler</h3>
          {myListings.map((listing) => (
            <Link key={listing.id} href={`/etkinlik/${listing.id}`}>
              <div className="flex gap-3 items-center bg-slate-900 border border-slate-800 rounded-xl p-3 hover:border-emerald-500/40 transition-all">
                <img src={listing.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{listing.title}</p>
                  <p className="text-xs text-slate-400">{listing.attendeeCount} kişi katıldı</p>
                </div>
                <span className="text-xs text-emerald-400">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Verification */}
      <div className="mx-4 mt-2 mb-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white">🛡️ Doğrulama</h3>
        <div className="space-y-2">
          {[
            { label: "Telefon numarası", done: true },
            { label: "Spotify", done: true },
            { label: "Instagram", done: false },
            { label: "Kimlik doğrulama", done: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={item.done ? "text-emerald-400" : "text-slate-500"}>
                  {item.done ? "✓" : "○"}
                </span>
                <span className={`text-sm ${item.done ? "text-slate-300" : "text-slate-400"}`}>
                  {item.label}
                </span>
              </div>
              {item.done ? (
                <span className="text-xs text-emerald-400">Doğrulandı</span>
              ) : (
                <button className="text-xs text-blue-400 border border-blue-500/30 px-2 py-1 rounded-full">
                  Bağla
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
