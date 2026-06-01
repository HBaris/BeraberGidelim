"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePremium } from "@/lib/usePremium";

const FREE_FEATURES = [
  "Etkinliklere katıl ve grup sohbetine gir",
  "Müzik uyumu skoru görüntüle",
  "Ayda 3 etkinlik oluştur",
  "Geçmiş etkinlik icebreaker",
  "Temel profil & doğrulama",
];

const PREMIUM_FEATURES = [
  {
    icon: "📍",
    title: "Konuma Göre Sıralama",
    desc: "En yakın etkinlikler önce gelsin",
  },
  {
    icon: "🎂",
    title: "Yaş Aralığı Filtresi",
    desc: "18-25, 26-35, 35+ bantlarında ara",
  },
  {
    icon: "👥",
    title: "Cinsiyet Tercihi",
    desc: "Karma / Sadece kadın / Sadece erkek grupları",
  },
  {
    icon: "🎵",
    title: "Müzik Uyum Eşiği",
    desc: "Yalnızca %70+ uyumlu etkinlikleri göster",
  },
  {
    icon: "✨",
    title: "Spark",
    desc: "Birine gizlice ilgi sinyali gönder — karşılıklıysa bildirim",
  },
  {
    icon: "💬",
    title: "1-on-1 Sohbet",
    desc: "Grup sohbetinin dışında biriyle özel konuşabilirsin",
  },
  {
    icon: "🔝",
    title: "Etkinliği Öne Çıkar",
    desc: "Oluşturduğun etkinlik 24 saat öncelikli akışta",
  },
  {
    icon: "👁️",
    title: "Profil İstatistikleri",
    desc: "Kim profilini gördü, kimin müzik uyumu yüksek",
  },
  {
    icon: "🔔",
    title: "Erken Erişim",
    desc: "Yeni etkinlikleri herkesin 2 saat öncesinde gör",
  },
  {
    icon: "♾️",
    title: "Sınırsız Etkinlik",
    desc: "Aylık 3 limit yok, istediğin kadar oluştur",
  },
];

export default function PremiumPage() {
  const router = useRouter();
  const { isPremium, activate, deactivate } = usePremium();
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);

  function handlePurchase() {
    setPurchasing(true);
    setTimeout(() => {
      activate();
      setPurchasing(false);
      setPurchased(true);
    }, 1500);
  }

  if (purchased || isPremium) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center space-y-5">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-4xl shadow-2xl shadow-amber-500/30">
          ✦
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Premium aktif!</h2>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Artık tüm özelliklere erişimin var.<br />
            Hayat ne getirir, biz karışmayız 😉
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => router.push("/")}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-bold text-base shadow-lg shadow-amber-500/20"
          >
            Keşfetmeye Başla →
          </button>
          <button
            onClick={() => { deactivate(); setPurchased(false); }}
            className="text-xs text-slate-600 underline"
          >
            (Demo: Premium'u iptal et)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-8">
      {/* Header */}
      <div className="relative overflow-hidden px-4 pt-8 pb-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-3xl mx-auto mb-4 shadow-xl shadow-amber-500/20">
            ✦
          </div>
          <h1 className="text-2xl font-bold text-white">BeraberGidelim Premium</h1>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Etkinlik arkadaşı bul. Hayat güzel sürprizler<br />
            getirirse, biz karışmayız.
          </p>
        </div>
      </div>

      {/* Plan toggle */}
      <div className="mx-4 mb-4">
        <div className="flex bg-slate-900 rounded-xl p-1 gap-1">
          <button
            onClick={() => setPlan("monthly")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              plan === "monthly"
                ? "bg-slate-700 text-white"
                : "text-slate-500"
            }`}
          >
            Aylık
          </button>
          <button
            onClick={() => setPlan("yearly")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              plan === "yearly"
                ? "bg-amber-500 text-amber-950"
                : "text-slate-500"
            }`}
          >
            Yıllık
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${plan === "yearly" ? "bg-amber-950/20" : "bg-emerald-600/20 text-emerald-400"}`}>
              %35 indirim
            </span>
          </button>
        </div>
      </div>

      {/* Price card */}
      <div className="mx-4 mb-5">
        <div className="bg-gradient-to-br from-amber-500/15 via-yellow-500/5 to-slate-900 border border-amber-500/30 rounded-2xl p-5 text-center">
          <div className="flex items-end justify-center gap-1">
            <span className="text-4xl font-bold text-white">
              {plan === "monthly" ? "₺89" : "₺699"}
            </span>
            <span className="text-slate-400 text-sm pb-1.5">
              / {plan === "monthly" ? "ay" : "yıl"}
            </span>
          </div>
          {plan === "yearly" && (
            <p className="text-xs text-amber-400 mt-1">
              Aylık ₺58 — 4 ay bedava
            </p>
          )}
          <p className="text-xs text-slate-500 mt-2">
            İstediğin zaman iptal edebilirsin
          </p>
        </div>
      </div>

      {/* Premium features */}
      <div className="mx-4 mb-5">
        <h2 className="text-sm font-bold text-white mb-3">✦ Premium Özellikler</h2>
        <div className="space-y-2">
          {PREMIUM_FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3"
            >
              <span className="text-xl flex-shrink-0">{f.icon}</span>
              <div>
                <p className="text-sm font-semibold text-white">{f.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free tier comparison */}
      <div className="mx-4 mb-6">
        <h2 className="text-sm font-bold text-slate-400 mb-3">Ücretsiz planda bunlar var:</h2>
        <div className="space-y-2">
          {FREE_FEATURES.map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-sm text-slate-400">
              <span className="text-emerald-500 flex-shrink-0">✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Soft dating note */}
      <div className="mx-4 mb-6 bg-amber-500/8 border border-amber-500/20 rounded-2xl p-4">
        <p className="text-xs text-amber-200/70 leading-relaxed italic text-center">
          &quot;BeraberGidelim bir etkinlik uygulaması. Ama hayat güzel sürprizler getirirse, biz karışmayız.&quot;
        </p>
      </div>

      {/* CTA */}
      <div className="mx-4 space-y-3">
        <button
          onClick={handlePurchase}
          disabled={purchasing}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 text-base font-bold hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-amber-500/20 disabled:opacity-60"
        >
          {purchasing ? "İşleniyor..." : `✦ Premium'a Geç — ${plan === "monthly" ? "₺89/ay" : "₺699/yıl"}`}
        </button>
        <p className="text-center text-xs text-slate-600">
          App Store / Google Play üzerinden ödeme · İptal kolaydır
        </p>
      </div>
    </div>
  );
}
