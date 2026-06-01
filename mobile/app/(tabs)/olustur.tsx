import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const CATEGORIES = [
  { key: "konser", label: "Konser", emoji: "🎸" },
  { key: "festival", label: "Festival", emoji: "🎪" },
  { key: "workshop", label: "Workshop", emoji: "🕯️" },
  { key: "yemek", label: "Yemek", emoji: "🍽️" },
  { key: "seyahat", label: "Seyahat", emoji: "⛵" },
  { key: "müze", label: "Müze & Sergi", emoji: "🖼️" },
  { key: "spor", label: "Spor", emoji: "⚽" },
  { key: "diger", label: "Diğer", emoji: "✨" },
];

const STEPS = ["Kategori", "Detaylar", "Ayarlar", "Özet"];

export default function OlusturScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    category: "", title: "", venue: "", city: "İstanbul",
    date: "", time: "", ticketPrice: "", description: "",
    showMusicMatch: true, tags: "",
  });

  const update = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const canNext = () => {
    if (step === 0) return form.category !== "";
    if (step === 1) return !!(form.title && form.venue && form.date);
    return true;
  };

  if (submitted) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center px-8">
        <View className="w-20 h-20 rounded-3xl bg-emerald-900/40 border border-emerald-500/30 items-center justify-center mb-4">
          <Text className="text-4xl">🎉</Text>
        </View>
        <Text className="text-white text-xl font-bold text-center">Etkinliğin yayında!</Text>
        <Text className="text-slate-400 text-sm text-center mt-2 leading-relaxed">
          Katılımcılara müzik uyum skoru gösterilecek. Ortak geçmiş varsa icebreaker otomatik açılır.
        </Text>
        <TouchableOpacity onPress={() => router.push("/")} className="w-full mt-6 py-4 rounded-2xl bg-emerald-600 items-center">
          <Text className="text-white font-bold text-base">Ana Sayfaya Dön</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setSubmitted(false); setStep(0); setForm({ category: "", title: "", venue: "", city: "İstanbul", date: "", time: "", ticketPrice: "", description: "", showMusicMatch: true, tags: "" }); }}
          className="w-full mt-3 py-3 rounded-2xl border border-slate-700 items-center"
        >
          <Text className="text-slate-300 text-sm">Yeni Etkinlik Oluştur</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="px-4 pt-4 gap-3">
          <Text className="text-white text-xl font-bold">Etkinlik Oluştur</Text>

          {/* Progress */}
          <View className="gap-1">
            <View className="flex-row gap-1">
              {STEPS.map((_, i) => (
                <View key={i} className={`flex-1 h-1 rounded-full ${i <= step ? "bg-emerald-500" : "bg-slate-700"}`} />
              ))}
            </View>
            <Text className="text-slate-500 text-xs">Adım {step + 1}/{STEPS.length}: {STEPS[step]}</Text>
          </View>
        </View>

        <View className="px-4 pt-4 pb-4">
          {/* Step 0: Category */}
          {step === 0 && (
            <View className="gap-3">
              <Text className="text-slate-200 text-base font-semibold">Ne tür bir etkinlik?</Text>
              <View className="flex-row flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.key}
                    onPress={() => update("category", cat.key)}
                    className={`w-[47%] flex-row items-center gap-3 p-4 rounded-2xl border ${form.category === cat.key ? "border-emerald-500 bg-emerald-900/30" : "border-slate-800 bg-slate-900"}`}
                  >
                    <Text className="text-2xl">{cat.emoji}</Text>
                    <Text className="text-slate-200 text-sm font-semibold">{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Step 1: Details */}
          {step === 1 && (
            <View className="gap-4">
              <Text className="text-slate-200 text-base font-semibold">Etkinlik Detayları</Text>
              {[
                { key: "title", label: "Etkinlik Adı *", placeholder: "Örn: YYK Yaz Konseri" },
                { key: "venue", label: "Mekan *", placeholder: "Örn: KüçükÇiftlik Park" },
                { key: "date", label: "Tarih *", placeholder: "GG.AA.YYYY" },
                { key: "time", label: "Saat", placeholder: "21:00" },
                { key: "ticketPrice", label: "Bilet Fiyatı (opsiyonel)", placeholder: "₺850 / Ücretsiz" },
              ].map((field) => (
                <View key={field.key}>
                  <Text className="text-slate-400 text-xs mb-1.5">{field.label}</Text>
                  <TextInput
                    value={(form as Record<string, string | boolean>)[field.key] as string}
                    onChangeText={(v) => update(field.key, v)}
                    placeholder={field.placeholder}
                    placeholderTextColor="#64748b"
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-white text-sm"
                  />
                </View>
              ))}
              <View>
                <Text className="text-slate-400 text-xs mb-1.5">Açıklama</Text>
                <TextInput
                  value={form.description}
                  onChangeText={(v) => update("description", v)}
                  placeholder="Neden gitmek istiyorsun?"
                  placeholderTextColor="#64748b"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-white text-sm h-24"
                />
              </View>
            </View>
          )}

          {/* Step 2: Settings */}
          {step === 2 && (
            <View className="gap-4">
              <Text className="text-slate-200 text-base font-semibold">Ayarlar</Text>
              <View className="bg-slate-900 border border-slate-800 rounded-2xl p-4 gap-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 mr-3">
                    <Text className="text-white text-sm font-semibold">🎵 Müzik Uyumunu Göster</Text>
                    <Text className="text-slate-400 text-xs mt-0.5">Katılımcılara uyum skoru görünsün mü?</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => update("showMusicMatch", !form.showMusicMatch)}
                    className={`w-12 h-6 rounded-full ${form.showMusicMatch ? "bg-emerald-600" : "bg-slate-700"}`}
                    style={{ justifyContent: "center" }}
                  >
                    <View className={`w-4 h-4 bg-white rounded-full mx-1 ${form.showMusicMatch ? "self-end" : "self-start"}`} />
                  </TouchableOpacity>
                </View>
                <View className="border-t border-slate-800 pt-4">
                  <Text className="text-white text-sm font-semibold mb-1">💬 Grup Sohbeti</Text>
                  <Text className="text-slate-400 text-xs">Katılan herkes otomatik gruba eklenir.</Text>
                  <View className="flex-row items-center gap-1.5 mt-2">
                    <View className="w-2 h-2 rounded-full bg-emerald-400" />
                    <Text className="text-emerald-400 text-xs">Otomatik aktif</Text>
                  </View>
                </View>
              </View>
              <View className="bg-emerald-900/20 border border-emerald-800/30 rounded-2xl p-4">
                <Text className="text-emerald-300 text-xs leading-relaxed">
                  💡 Sınır yok — 5 kişi de gidebilir, 50 kişi de. Katılan herkes grup sohbetinde buluşur.
                </Text>
              </View>
            </View>
          )}

          {/* Step 3: Summary */}
          {step === 3 && (
            <View className="gap-4">
              <Text className="text-slate-200 text-base font-semibold">Özet</Text>
              <View className="bg-slate-900 border border-slate-800 rounded-2xl p-4 gap-3">
                <View className="flex-row items-center gap-2">
                  <Text className="text-2xl">{CATEGORIES.find((c) => c.key === form.category)?.emoji}</Text>
                  <Text className="text-white font-bold text-base flex-1">{form.title || "(İsimsiz)"}</Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {[
                    { label: "📍", value: form.venue || "—" },
                    { label: "📅", value: form.date || "—" },
                    { label: "⏰", value: form.time || "—" },
                    { label: "🎟️", value: form.ticketPrice || "Belirtilmedi" },
                  ].map((item) => (
                    <View key={item.label} className="bg-slate-950 rounded-xl p-2.5 flex-1 min-w-[45%]">
                      <Text className="text-slate-200 text-xs">{item.label} {item.value}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className="bg-slate-800/60 border border-slate-700 rounded-2xl p-3">
                <Text className="text-slate-400 text-xs">
                  🔒 Anasayfada anonim görünecek: &quot;Biri {form.category} için buluşma düzenledi&quot;
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Navigation buttons */}
      <View className="px-4 pb-4 pt-2 flex-row gap-3 border-t border-slate-800">
        {step > 0 && (
          <TouchableOpacity onPress={() => setStep((s) => s - 1)} className="px-6 py-3.5 rounded-2xl border border-slate-700">
            <Text className="text-slate-300 font-semibold text-sm">← Geri</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          disabled={!canNext()}
          onPress={() => { if (step < STEPS.length - 1) setStep((s) => s + 1); else setSubmitted(true); }}
          className={`flex-1 py-3.5 rounded-2xl items-center ${canNext() ? "bg-emerald-600" : "bg-slate-800"}`}
        >
          <Text className={`font-bold text-sm ${canNext() ? "text-white" : "text-slate-500"}`}>
            {step === STEPS.length - 1 ? "Yayınla 🚀" : "Devam →"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
