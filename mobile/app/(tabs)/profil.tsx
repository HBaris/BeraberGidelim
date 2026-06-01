import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { usePremium } from "@/lib/usePremium";
import { CURRENT_USER } from "@/lib/mockData";
import LockedFeature from "@/components/LockedFeature";
import PremiumBadge from "@/components/PremiumBadge";

export default function ProfilScreen() {
  const router = useRouter();
  const { isPremium, deactivate } = usePremium();

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      <ScrollView className="flex-1" contentContainerClassName="pb-8">
        {/* Header */}
        <View className="px-4 pt-4 flex-row items-center justify-between">
          <Text className="text-white text-xl font-bold">Profilim</Text>
          {isPremium && <PremiumBadge size="md" />}
        </View>

        {/* Avatar + basic info */}
        <View className="items-center pt-6 pb-4 gap-3">
          <View className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/40">
            <Image source={{ uri: CURRENT_USER.avatarUrl }} className="w-full h-full" />
          </View>
          <View className="items-center gap-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-white text-lg font-bold">{CURRENT_USER.displayName}</Text>
              {CURRENT_USER.isVerified && <Text className="text-emerald-400 text-sm">✓</Text>}
            </View>
            <Text className="text-slate-400 text-sm">{CURRENT_USER.city} · {CURRENT_USER.age} yaş</Text>
            <Text className="text-slate-500 text-xs text-center px-8 mt-1">{CURRENT_USER.bio}</Text>
          </View>
        </View>

        {/* Quick stats */}
        <View className="mx-4 flex-row gap-3 mb-4">
          {[
            { label: "Etkinlik", value: String(CURRENT_USER.eventsAttended) },
            { label: "Üyelik", value: CURRENT_USER.memberSince },
            { label: "Açıklık", value: `Seviye ${CURRENT_USER.revealLevel}` },
          ].map((s) => (
            <View key={s.label} className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-3 items-center gap-0.5">
              <Text className="text-white font-bold text-base">{s.value}</Text>
              <Text className="text-slate-500 text-xs">{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Music genres */}
        <View className="mx-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-3 gap-2">
          <Text className="text-white font-semibold text-sm">🎵 Müzik Zevkim</Text>
          <View className="flex-row flex-wrap gap-2">
            {CURRENT_USER.musicGenres.map((g) => (
              <View key={g.name} className="flex-row items-center gap-1.5 bg-slate-800 rounded-full px-3 py-1.5">
                <Text>{g.emoji}</Text>
                <Text className="text-slate-200 text-xs font-semibold">{g.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Past events */}
        <View className="mx-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-3 gap-2">
          <Text className="text-white font-semibold text-sm">🎟️ Geçmiş Etkinlikler</Text>
          {CURRENT_USER.pastEvents.map((e) => (
            <View key={e.id} className="flex-row items-center gap-2.5 py-1.5 border-t border-slate-800 first:border-t-0">
              <Text className="text-xl">{e.emoji}</Text>
              <View className="flex-1">
                <Text className="text-slate-200 text-xs font-semibold">{e.name}</Text>
                <Text className="text-slate-500 text-xs">{e.venue} · {e.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Premium stats — locked if free */}
        <View className="mx-4 mb-4">
          {isPremium ? (
            <View className="bg-slate-900 border border-amber-500/20 rounded-2xl p-4 gap-3">
              <Text className="text-amber-400 font-semibold text-sm">✦ Premium İstatistikler</Text>
              {[
                { label: "Profil görüntüleme (7 gün)", value: "23" },
                { label: "Spark aldın", value: "4" },
                { label: "Uyum skoru ortalaması", value: "%74" },
              ].map((s) => (
                <View key={s.label} className="flex-row justify-between items-center">
                  <Text className="text-slate-400 text-xs">{s.label}</Text>
                  <Text className="text-white font-bold text-sm">{s.value}</Text>
                </View>
              ))}
            </View>
          ) : (
            <LockedFeature
              label="Premium İstatistikler"
              description="Kim profiline baktı, kaç Spark aldın ve daha fazlasını gör."
            >
              <View className="bg-slate-900 border border-slate-800 rounded-2xl p-4 gap-3">
                {["Profil görüntüleme", "Spark sayısı", "Uyum ortalaması"].map((l) => (
                  <View key={l} className="flex-row justify-between">
                    <Text className="text-slate-500 text-xs">{l}</Text>
                    <Text className="text-slate-700 text-sm font-bold">--</Text>
                  </View>
                ))}
              </View>
            </LockedFeature>
          )}
        </View>

        {/* Upsell or premium management */}
        {!isPremium ? (
          <TouchableOpacity
            onPress={() => router.push("/premium")}
            className="mx-4 py-4 bg-amber-500 rounded-2xl items-center mb-3"
          >
            <Text className="text-white font-bold">✦ Premium'a Geç — ₺89/ay</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={deactivate}
            className="mx-4 py-3 border border-slate-700 rounded-2xl items-center mb-3"
          >
            <Text className="text-slate-500 text-sm">Premium İptal (Demo)</Text>
          </TouchableOpacity>
        )}

        {/* Settings placeholder */}
        <View className="mx-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {[
            { label: "Spotify Bağla", emoji: "🎵" },
            { label: "Bildirim Ayarları", emoji: "🔔" },
            { label: "Gizlilik", emoji: "🔒" },
            { label: "Çıkış Yap", emoji: "🚪" },
          ].map((item, i) => (
            <TouchableOpacity
              key={item.label}
              className={`flex-row items-center gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-slate-800" : ""}`}
            >
              <Text>{item.emoji}</Text>
              <Text className="text-slate-300 text-sm">{item.label}</Text>
              <Text className="text-slate-600 ml-auto">›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
