"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { key: "konser", label: "Konser", emoji: "🎸" },
  { key: "festival", label: "Festival", emoji: "🎪" },
  { key: "workshop", label: "Workshop", emoji: "🕯️" },
  { key: "gastronomi", label: "Gastronomi", emoji: "🍣" },
  { key: "seyahat", label: "Seyahat / Gezi", emoji: "⛵" },
  { key: "müze", label: "Müze & Sergi", emoji: "🖼️" },
  { key: "spor", label: "Spor", emoji: "⚽" },
  { key: "diger", label: "Diğer", emoji: "✨" },
];

const STEPS = ["Etkinlik", "Detaylar", "Grup", "Özet"];

export default function OlusturPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    category: "",
    title: "",
    venue: "",
    city: "İstanbul",
    date: "",
    time: "",
    ticketPrice: "",
    description: "",
    totalSpots: "4",
    spotsAvailable: "3",
    requireMusicMatch: true,
    tags: "",
  });

  const update = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canNext = () => {
    if (step === 0) return form.category !== "";
    if (step === 1) return form.title && form.venue && form.date && form.time;
    if (step === 2) return true;
    return true;
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center space-y-4">
        <div className="w-20 h-20 bg-violet-600/20 border border-violet-500/30 rounded-3xl flex items-center justify-center text-4xl">
          🎉
        </div>
        <h2 className="text-xl font-bold text-white">Etkinliğin yayında!</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Katılım isteği gönderenlere müzik uyum skoru gösterilecek. Ortak geçmiş varsa icebreaker otomatik açılacak.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => router.push("/")}
            className="w-full py-3.5 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-500"
          >
            Ana Sayfaya Dön
          </button>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setForm({ category: "", title: "", venue: "", city: "İstanbul", date: "", time: "", ticketPrice: "", description: "", totalSpots: "4", spotsAvailable: "3", requireMusicMatch: true, tags: "" }); }}
            className="w-full py-3 rounded-2xl border border-slate-700 text-slate-300 text-sm"
          >
            Yeni Etkinlik Oluştur
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="px-4 pt-4 space-y-3">
        <h1 className="text-xl font-bold text-white">Etkinlik Oluştur</h1>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex gap-1">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-all ${
                  i <= step ? "bg-violet-500" : "bg-slate-700"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Adım {step + 1}/{STEPS.length}: {STEPS[step]}
          </p>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-4 pt-4 pb-4 space-y-4">
        {/* Step 0: Category */}
        {step === 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-slate-200">
              Ne tür bir etkinliğe gidiyorsun?
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => update("category", cat.key)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                    form.category === cat.key
                      ? "border-violet-500 bg-violet-600/20"
                      : "border-slate-800 bg-slate-900 hover:border-slate-700"
                  }`}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="text-sm font-semibold text-slate-200">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Event details */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-slate-200">Etkinlik Detayları</h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Etkinlik Adı *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Örn: YYK Yaz Konseri - Sahne Önü"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Mekan *</label>
                <input
                  type="text"
                  value={form.venue}
                  onChange={(e) => update("venue", e.target.value)}
                  placeholder="Örn: KüçükÇiftlik Park"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Şehir</label>
                <select
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  {["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Balıkesir", "Diğer"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Tarih *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Saat *</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Bilet Fiyatı (opsiyonel)</label>
                <input
                  type="text"
                  value={form.ticketPrice}
                  onChange={(e) => update("ticketPrice", e.target.value)}
                  placeholder="Örn: ₺850 / Ücretsiz"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Açıklama</label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Neden gitmek istiyorsun? Kimlerle gitmek istersin? Önce kahve içmek ister misin?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 resize-none h-24 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Etiketler (virgülle ayır)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => update("tags", e.target.value)}
                  placeholder="indie, rock, sahne önü, konser sonrası yemek"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Group settings */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-slate-200">Grup Ayarları</h2>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Toplam Kişi Sayısı</label>
                <div className="flex gap-2">
                  {["2", "3", "4", "5", "6"].map((n) => (
                    <button
                      key={n}
                      onClick={() => update("totalSpots", n)}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                        form.totalSpots === n
                          ? "bg-violet-600 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Aranan Kişi Sayısı</label>
                <div className="flex gap-2">
                  {Array.from({ length: parseInt(form.totalSpots) - 1 }, (_, i) => String(i + 1)).map((n) => (
                    <button
                      key={n}
                      onClick={() => update("spotsAvailable", n)}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                        form.spotsAvailable === n
                          ? "bg-violet-600 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Music match toggle */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">🎵 Müzik Uyumunu Göster</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    İsteklerde müzik uyum skoru görünsün mü?
                  </p>
                </div>
                <button
                  onClick={() => update("requireMusicMatch", !form.requireMusicMatch)}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    form.requireMusicMatch ? "bg-violet-600" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      form.requireMusicMatch ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Info box */}
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4">
              <p className="text-xs text-violet-300 leading-relaxed">
                💡 Katılım isteği gönderdiklerinde müzik uyum skoru ve ortak geçmiş etkinlikleri
                otomatik olarak görürsün. Kiminle gittiğin kadar nasıl gittiğin de önemli!
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-slate-200">Özet</h2>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {CATEGORIES.find((c) => c.key === form.category)?.emoji}
                </span>
                <h3 className="text-base font-bold text-white">{form.title || "(İsimsiz)"}</h3>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 rounded-xl p-2.5">
                  <p className="text-slate-500">📍 Mekan</p>
                  <p className="text-slate-200 font-medium mt-0.5">{form.venue || "—"}</p>
                </div>
                <div className="bg-slate-950 rounded-xl p-2.5">
                  <p className="text-slate-500">🏙️ Şehir</p>
                  <p className="text-slate-200 font-medium mt-0.5">{form.city}</p>
                </div>
                <div className="bg-slate-950 rounded-xl p-2.5">
                  <p className="text-slate-500">📅 Tarih</p>
                  <p className="text-slate-200 font-medium mt-0.5">{form.date || "—"}</p>
                </div>
                <div className="bg-slate-950 rounded-xl p-2.5">
                  <p className="text-slate-500">⏰ Saat</p>
                  <p className="text-slate-200 font-medium mt-0.5">{form.time || "—"}</p>
                </div>
                <div className="bg-slate-950 rounded-xl p-2.5">
                  <p className="text-slate-500">👥 Grup</p>
                  <p className="text-slate-200 font-medium mt-0.5">{form.spotsAvailable} kişi aranıyor</p>
                </div>
                <div className="bg-slate-950 rounded-xl p-2.5">
                  <p className="text-slate-500">🎟️ Bilet</p>
                  <p className="text-slate-200 font-medium mt-0.5">{form.ticketPrice || "Belirtilmedi"}</p>
                </div>
              </div>

              {form.description && (
                <div className="bg-slate-950 rounded-xl p-2.5">
                  <p className="text-slate-500 text-xs mb-1">Açıklama</p>
                  <p className="text-slate-300 text-xs leading-relaxed">{form.description}</p>
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <span className={`w-2 h-2 rounded-full ${form.requireMusicMatch ? "bg-green-400" : "bg-slate-600"}`} />
                <span className="text-xs text-slate-400">
                  {form.requireMusicMatch ? "Müzik uyumu gösterilecek" : "Müzik uyumu gizli"}
                </span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3">
              <p className="text-xs text-amber-200/80">
                🔒 Anasayfada etkinliğin anonim görünecek: &quot;Biri {form.city}&apos;da {CATEGORIES.find((c) => c.key === form.category)?.label ?? "etkinlik"} için arkadaş arıyor&quot;
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-4 pb-4 pt-2 flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="px-6 py-3.5 rounded-2xl border border-slate-700 text-slate-300 font-semibold text-sm"
          >
            ← Geri
          </button>
        )}
        <button
          disabled={!canNext()}
          onClick={() => {
            if (step < STEPS.length - 1) {
              setStep((s) => s + 1);
            } else {
              setSubmitted(true);
            }
          }}
          className={`flex-1 py-3.5 rounded-2xl font-bold text-sm transition-all ${
            canNext()
              ? "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-500/30"
              : "bg-slate-800 text-slate-500"
          }`}
        >
          {step === STEPS.length - 1 ? "Yayınla 🚀" : "Devam →"}
        </button>
      </div>
    </div>
  );
}
