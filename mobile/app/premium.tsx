import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { usePremium } from "@/lib/usePremium";

const FEATURES = [
  { emoji: "📍", title: "Konuma Göre Sırala", desc: "En yakın etkinlikleri önce gör" },
  { emoji: "🎂", title: "Yaş & Cinsiyet Filtresi", desc: "Sana uygun katılımcıları filtrele" },
  { emoji: "⚡", title: "Spark Gönder", desc: "Birinin ilgisini çek, karşılıklıysa bildir" },
  { emoji: "💌", title: "Özel Mesaj", desc: "1-1 sohbet başlat" },
  { emoji: "👁️", title: "Profil Görüntüleme", desc: "Kim profiline baktı gör" },
  { emoji: "🎵", title: "Gelişmiş Müzik Analizi", desc: "Spotify detaylı uyum analizi" },
  { emoji: "🔍", title: "Erken Erişim", desc: "Yeni etkinlikleri önce keşfet" },
  { emoji: "✨", title: "Öne Çıkan Profil", desc: "Etkinlik listelerinde üstte gör" },
  { emoji: "📊", title: "İstatistikler", desc: "Aktivite ve eşleşme raporları" },
  { emoji: "🚫", title: "Reklamsız", desc: "Kesintisiz deneyim" },
];

export default function PremiumScreen() {
  const router = useRouter();
  const { isPremium, activate, deactivate } = usePremium();
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      <ScrollView className="flex-1" contentContainerClassName="pb-10">
        {/* Header */}
        <View className="flex-row items-center gap-3 px-4 py-3">
          <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center rounded-xl bg-slate-800">
            <Text className="text-white text-base">←</Text>
          </TouchableOpacity>
          <Text className="text-white font-bold text-base">Premium</Text>
        </View>

        {/* Hero */}
        <View className="items-center px-6 pt-4 pb-6 gap-2">
          <View className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 items-center justify-center mb-2">
            <Text className="text-3xl">✦</Text>
          </View>
          <Text className="text-white text-2xl font-bold text-center">BeraberGidelim Premium</Text>
          <Text className="text-slate-400 text-sm text-center leading-relaxed">
            Etkinlik uygulamasıyız. Ama hayat güzel sürprizler getirirse, biz karışmayız.
          </Text>
        </View>

        {/* Billing toggle */}
        <View className="mx-4 flex-row bg-slate-900 rounded-xl p-1 gap-1 mb-4">
          {(["monthly", "yearly"] as const).map((b) => (
            <TouchableOpacity
              key={b}
              onPress={() => setBilling(b)}
              className={`flex-1 py-2 rounded-lg items-center ${billing === b ? "bg-amber-500" : ""}`}
            >
              <Text className={`text-sm font-bold ${billing === b ? "text-white" : "text-slate-400"}`}>
                {b === "monthly" ? "Aylık" : "Yıllık · %35 İndirim"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price */}
        <View className="mx-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 items-center mb-4 gap-1">
          <Text className="text-amber-400 text-4xl font-bold">
            {billing === "monthly" ? "₺89" : "₺699"}
          </Text>
          <Text className="text-slate-400 text-sm">
            {billing === "monthly" ? "aylık" : "yıllık (₺58/ay)"}
          </Text>
          {billing === "yearly" && (
            <View className="mt-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1">
              <Text className="text-emerald-400 text-xs font-bold">₺369 Tasarruf</Text>
            </View>
          )}
        </View>

        {/* Features */}
        <View className="mx-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-4">
          {FEATURES.map((f, i) => (
            <View
              key={f.title}
              className={`flex-row items-center gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-slate-800" : ""}`}
            >
              <Text className="text-xl w-8 text-center">{f.emoji}</Text>
              <View className="flex-1">
                <Text className="text-white text-sm font-semibold">{f.title}</Text>
                <Text className="text-slate-500 text-xs">{f.desc}</Text>
              </View>
              <Text className="text-emerald-500 text-sm">✓</Text>
            </View>
          ))}
        </View>

        {/* Free tier comparison */}
        <View className="mx-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">
          <Text className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">Ücretsiz Planda</Text>
          {[
            "Etkinlikleri keşfet ve katıl",
            "Müzik uyum skoru gör",
            "Grup sohbetine katıl",
            "Etkinlik oluştur",
          ].map((item) => (
            <View key={item} className="flex-row items-center gap-2 py-1">
              <Text className="text-slate-500 text-xs">✓</Text>
              <Text className="text-slate-500 text-xs">{item}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        {isPremium ? (
          <View className="mx-4 gap-3">
            <View className="py-4 bg-amber-500/20 border border-amber-500/30 rounded-2xl items-center">
              <Text className="text-amber-400 font-bold">✦ Premium Aktif</Text>
            </View>
            <TouchableOpacity onPress={deactivate} className="py-3 border border-slate-700 rounded-2xl items-center">
              <Text className="text-slate-500 text-sm">Premium İptal (Demo)</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={async () => { await activate(); router.back(); }}
            className="mx-4 py-4 bg-amber-500 rounded-2xl items-center"
          >
            <Text className="text-white font-bold text-base">
              {billing === "monthly" ? "₺89/ay ile Başla" : "₺699/yıl ile Başla"}
            </Text>
            <Text className="text-amber-100/70 text-xs mt-0.5">Demo — gerçek ödeme yok</Text>
          </TouchableOpacity>
        )}

        <Text className="text-slate-700 text-xs text-center px-8 mt-4 leading-relaxed">
          BeraberGidelim bir etkinlik uygulamasıdır. Abonelik istediğin zaman iptal edilebilir.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
