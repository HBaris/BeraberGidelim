"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_LISTINGS, CURRENT_USER, formatDate } from "@/lib/mockData";
import MusicCompatibilityBar from "@/components/MusicCompatibilityBar";
import EventChat from "@/components/EventChat";
import Link from "next/link";

export default function EtkinlikDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const listing = MOCK_LISTINGS.find((l) => l.id === id);
  const [joined, setJoined] = useState(false);
  const [activeTab, setActiveTab] = useState<"detay" | "sohbet">("detay");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [message, setMessage] = useState("");

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <span className="text-4xl mb-3">😕</span>
        <p>Etkinlik bulunamadı.</p>
        <button onClick={() => router.back()} className="mt-4 text-emerald-400 underline">
          Geri dön
        </button>
      </div>
    );
  }

  const { organizer, groupMembers, sharedPastEvents, musicCompatibility } = listing;
  const allParticipants = [organizer, ...groupMembers];

  return (
    <div className="flex flex-col">
      {/* Back button */}
      <div className="px-4 pt-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-sm"
        >
          ← Geri
        </button>
      </div>

      {/* Event image */}
      <div className="relative mt-3 mx-4 rounded-2xl overflow-hidden h-52">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{listing.emoji}</span>
            <span className="text-xs font-semibold bg-emerald-600/80 text-white px-2 py-0.5 rounded-full">
              {listing.category}
            </span>
          </div>
          <h1 className="text-xl font-bold text-white leading-tight">{listing.title}</h1>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="mx-4 mt-4">
        <div className="flex bg-slate-900 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveTab("detay")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "detay"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Detaylar
          </button>
          <button
            onClick={() => setActiveTab("sohbet")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "sohbet"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>💬</span>
            Grup Sohbeti
            {listing.chatMessages.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === "sohbet" ? "bg-white/20" : "bg-emerald-600/40 text-emerald-300"}`}>
                {listing.chatMessages.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 mt-4 space-y-4 pb-6">
        {activeTab === "sohbet" ? (
          <EventChat
            messages={listing.chatMessages}
            eventTitle={listing.title}
            isJoined={joined}
            onJoin={() => setJoined(true)}
          />
        ) : (
          <>
            {/* Icebreaker alert */}
            {sharedPastEvents.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3">
                <div className="flex items-start gap-2">
                  <span className="text-xl">🔥</span>
                  <div>
                    <p className="text-sm font-bold text-amber-300">Ortak Geçmiş Bulundu!</p>
                    <p className="text-xs text-amber-200/80 mt-0.5">
                      Sen de{" "}
                      {sharedPastEvents.map((e) => `"${e.name}"`).join(", ")}{" "}
                      {sharedPastEvents.length > 1 ? "etkinliklerinde" : "etkinliğinde"} bulundun. Mükemmel bir sohbet açıcı!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Event details */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-500">Tarih</p>
                  <p className="text-sm font-semibold text-white">📅 {formatDate(listing.date)}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-500">Saat</p>
                  <p className="text-sm font-semibold text-white">⏰ {listing.time}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-500">Mekan</p>
                  <p className="text-sm font-semibold text-white">📍 {listing.venue}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-500">Şehir</p>
                  <p className="text-sm font-semibold text-white">🏙️ {listing.city}</p>
                </div>
              </div>
              {listing.ticketPrice && (
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-xs text-slate-500 mb-0.5">Bilet Fiyatı</p>
                  <p className="text-sm font-bold text-emerald-300">🎟️ {listing.ticketPrice}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-2">Hakkında</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{listing.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {listing.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Music compatibility */}
            {musicCompatibility !== undefined && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <MusicCompatibilityBar score={musicCompatibility} />
                <p className="text-xs text-slate-500 mt-2">
                  Spotify ve müzik zevkiniz karşılaştırılarak hesaplandı.
                </p>
              </div>
            )}

            {/* Participants — anti-dating: music first, photo small */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">
                Gidenler ({listing.attendeeCount} kişi)
              </h3>
              <div className="space-y-2">
                {allParticipants.map((person, idx) => {
                  const revealLevel = "revealLevel" in person ? person.revealLevel : 1;
                  const isOrganizer = idx === 0;
                  const fullUser = isOrganizer ? organizer : null;

                  return (
                    <Link key={person.id} href={`/kullanici/${person.id}`}>
                      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3 hover:border-emerald-500/40 transition-all">
                        <div className="relative flex-shrink-0">
                          <img
                            src={person.avatarUrl}
                            alt=""
                            className={`w-10 h-10 rounded-xl object-cover ${revealLevel === 0 ? "blur-md" : ""}`}
                          />
                          {person.isVerified && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center text-[9px] text-white font-bold">
                              ✓
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-white">{person.displayName}</span>
                            {isOrganizer && (
                              <span className="text-[10px] bg-emerald-600/30 text-emerald-300 px-1.5 py-0.5 rounded-full">
                                Düzenleyen
                              </span>
                            )}
                          </div>
                          {fullUser && revealLevel >= 1 && (
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {fullUser.musicGenres.slice(0, 3).map((g) => (
                                <span key={g.name} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-full">
                                  {g.emoji} {g.name}
                                </span>
                              ))}
                            </div>
                          )}
                          {revealLevel === 0 && (
                            <p className="text-xs text-slate-500 mt-0.5">
                              🔒 Profil ortak etkinlikle açılıyor
                            </p>
                          )}
                        </div>

                        {fullUser && (
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs text-slate-400">{fullUser.eventsAttended}</p>
                            <p className="text-[10px] text-slate-600">etkinlik</p>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            {!joined ? (
              <button
                onClick={() => setShowRequestModal(true)}
                className="w-full py-4 rounded-2xl text-base font-bold bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95 shadow-lg shadow-emerald-500/30 transition-all"
              >
                Katıl — Benimle gel! →
              </button>
            ) : (
              <div className="space-y-3">
                <div className="w-full py-4 rounded-2xl text-base font-bold text-center bg-emerald-600/20 text-emerald-400 border border-emerald-600/30">
                  ✅ Gruba katıldın!
                </div>
                <button
                  onClick={() => setActiveTab("sohbet")}
                  className="w-full py-3 rounded-2xl text-sm font-semibold border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/10 transition-all"
                >
                  💬 Grup sohbetine git →
                </button>
              </div>
            )}

            {listing.ticketUrl && (
              <a
                href={listing.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-2xl text-sm font-semibold text-center border border-slate-700 text-slate-300 hover:border-emerald-500/40 hover:text-white transition-all"
              >
                🎟️ Bilet Al (Biletinial)
              </a>
            )}
          </>
        )}
      </div>

      {/* Join request modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end">
          <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-700 rounded-t-3xl p-6 space-y-4">
            <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto" />
            <h3 className="text-lg font-bold text-white">Gruba Katıl</h3>
            <p className="text-sm text-slate-400">
              Kendini kısaca tanıt. Neden bu etkinliğe gitmek istiyorsun?
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Örn: Ben de YYK büyük hayranıyım. Sahne önü severim, önceden beraber yiyelim derim 🎸"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 resize-none h-28 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  setJoined(true);
                  setShowRequestModal(false);
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500"
              >
                Katıl ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
