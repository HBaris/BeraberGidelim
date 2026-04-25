"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { MOCK_USERS, CURRENT_USER, MOCK_LISTINGS, formatDate } from "@/lib/mockData";
import MusicCompatibilityBar from "@/components/MusicCompatibilityBar";
import Link from "next/link";

export default function KullaniciProfilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const user = MOCK_USERS.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <span className="text-4xl mb-3">😕</span>
        <p>Kullanıcı bulunamadı.</p>
        <button onClick={() => router.back()} className="mt-4 text-emerald-400 underline text-sm">
          Geri dön
        </button>
      </div>
    );
  }

  const sharedEvents = CURRENT_USER.pastEvents.filter((myEvent) =>
    user.pastEvents.some((theirEvent) => theirEvent.id === myEvent.id)
  );

  const myGenres = CURRENT_USER.musicGenres.map((g) => g.name);
  const theirGenres = user.musicGenres.map((g) => g.name);
  const matches = myGenres.filter((g) => theirGenres.includes(g)).length;
  const total = new Set([...myGenres, ...theirGenres]).size;
  const compat = total === 0 ? 0 : Math.round((matches / total) * 100);

  const userEvents = MOCK_LISTINGS.filter(
    (l) =>
      l.organizer.id === user.id ||
      l.groupMembers.some((m) => m.id === user.id)
  );

  const revealLevel = user.revealLevel;

  return (
    <div className="flex flex-col">
      <div className="px-4 pt-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-sm"
        >
          ← Geri
        </button>
      </div>

      {/* Profile — anti-dating design */}
      <div className="mx-4 mt-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={user.avatarUrl}
              alt=""
              className={`w-14 h-14 rounded-2xl object-cover border-2 border-slate-700 ${revealLevel === 0 ? "blur-xl" : ""}`}
            />
            {user.isVerified && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                ✓
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white">{user.displayName}</h1>
              {user.isVerified && (
                <span className="text-xs text-emerald-400 font-medium">Doğrulanmış</span>
              )}
            </div>
            <p className="text-xs text-slate-400">{user.city} · {user.eventsAttended} etkinlik</p>
          </div>
        </div>

        {revealLevel >= 2 && <p className="text-sm text-slate-300 leading-relaxed">{user.bio}</p>}

        {revealLevel < 2 && (
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3">
            <p className="text-xs text-slate-400">
              🔒 Bu kullanıcının profil detayları gizli. Ortak etkinliklere gittikçe daha fazlası görünür.
            </p>
          </div>
        )}

        {/* Music genres — always shown, anti-dating focus */}
        {revealLevel >= 1 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-200">🎵 Müzik Zevki</h3>
            <div className="flex flex-wrap gap-2">
              {user.musicGenres.map((g) => (
                <span
                  key={g.name}
                  className="flex items-center gap-1.5 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  <span className="text-base">{g.emoji}</span>
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {revealLevel >= 3 && (
          <div className="flex gap-2 flex-wrap">
            {user.instagram && (
              <span className="text-xs text-pink-400 bg-pink-500/10 border border-pink-500/20 px-3 py-1.5 rounded-full">
                📸 {user.instagram}
              </span>
            )}
            {user.spotify && (
              <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
                🎧 Spotify
              </span>
            )}
          </div>
        )}
      </div>

      {/* Music compatibility */}
      <div className="mx-4 mt-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white">Seninle Uyumu</h3>
        <MusicCompatibilityBar score={compat} />
        {matches > 0 && (
          <div className="mt-2">
            <p className="text-xs text-slate-500 mb-2">Ortak müzik zevkleri:</p>
            <div className="flex flex-wrap gap-1.5">
              {myGenres.filter((g) => theirGenres.includes(g)).map((g) => {
                const genre = CURRENT_USER.musicGenres.find((mg) => mg.name === g);
                return (
                  <span key={g} className="text-xs bg-emerald-600/20 text-emerald-300 px-2 py-0.5 rounded-full">
                    {genre?.emoji} {g}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Icebreaker */}
      {sharedEvents.length > 0 && (
        <div className="mx-4 mt-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <h3 className="text-sm font-bold text-amber-300">Ortak Geçmiş!</h3>
          </div>
          <p className="text-xs text-amber-200/80">
            İkiniz de aynı etkinliklere gitmişsiniz. Harika bir sohbet başlangıcı!
          </p>
          <div className="space-y-2">
            {sharedEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-2 bg-amber-500/10 rounded-xl p-2.5">
                <span className="text-xl">{event.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-amber-200">{event.name}</p>
                  <p className="text-[11px] text-amber-300/60">{event.venue} · {event.date}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-amber-400/60 italic">
            &quot;Hadi bir daha gidelim, bak yakında yine var!&quot;
          </p>
        </div>
      )}

      {/* Past events */}
      {revealLevel >= 2 && user.pastEvents.length > 0 && (
        <div className="mx-4 mt-4 space-y-3">
          <h3 className="text-sm font-semibold text-white">🎟️ Gittiği Etkinlikler</h3>
          <div className="space-y-2">
            {user.pastEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
                <span className="text-xl">{event.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{event.name}</p>
                  <p className="text-xs text-slate-400">{event.venue} · {event.city} · {event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming events */}
      {userEvents.length > 0 && (
        <div className="mx-4 mt-4 mb-4 space-y-3">
          <h3 className="text-sm font-semibold text-white">📅 Gideceği Etkinlikler</h3>
          {userEvents.map((listing) => (
            <Link key={listing.id} href={`/etkinlik/${listing.id}`}>
              <div className="flex gap-3 items-center bg-slate-900 border border-slate-800 rounded-xl p-3 hover:border-emerald-500/40 transition-all">
                <img src={listing.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{listing.title}</p>
                  <p className="text-xs text-slate-400">{formatDate(listing.date)}</p>
                </div>
                <span className="text-xs text-emerald-400">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
