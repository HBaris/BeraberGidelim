import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MOCK_USERS, CURRENT_USER } from "@/lib/mockData";
import MusicCompatibilityBar from "@/components/MusicCompatibilityBar";
import SparkButton from "@/components/SparkButton";
import LockedFeature from "@/components/LockedFeature";
import { usePremium } from "@/lib/usePremium";

function getCompatibility(userGenres: string[], currentGenres: string[]) {
  const shared = userGenres.filter((g) => currentGenres.includes(g)).length;
  const total = new Set([...userGenres, ...currentGenres]).size;
  return total > 0 ? Math.round((shared / total) * 100) : 0;
}

export default function KullaniciScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isPremium } = usePremium();

  const user = MOCK_USERS.find((u) => u.id === id);

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center">
        <Text className="text-slate-500">Kullanıcı bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  const currentGenres = CURRENT_USER.musicGenres.map((g) => g.name);
  const userGenres = user.musicGenres.map((g) => g.name);
  const sharedGenres = userGenres.filter((g) => currentGenres.includes(g));
  const compatibility = getCompatibility(userGenres, currentGenres);

  const sharedPastEventIds = new Set(CURRENT_USER.pastEvents.map((e) => e.id));
  const sharedEvents = user.pastEvents.filter((e) => sharedPastEventIds.has(e.id));
  const hasIcebreaker = sharedEvents.length > 0;

  const isBlurred = user.revealLevel === 0;

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center gap-3 px-4 py-3 border-b border-slate-800">
        <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center rounded-xl bg-slate-800">
          <Text className="text-white text-base">←</Text>
        </TouchableOpacity>
        <Text className="text-white font-bold text-base">{isBlurred ? "Anonim Kullanıcı" : user.displayName}</Text>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-8">
        {/* Avatar */}
        <View className="items-center pt-6 pb-4 gap-2">
          <View className={`w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-700 ${isBlurred ? "opacity-30" : ""}`}>
            <Image source={{ uri: user.avatarUrl }} className="w-full h-full" />
          </View>
          {!isBlurred ? (
            <>
              <View className="flex-row items-center gap-2">
                <Text className="text-white text-lg font-bold">{user.displayName}</Text>
                {user.isVerified && <Text className="text-emerald-400 text-sm">✓</Text>}
              </View>
              <Text className="text-slate-400 text-sm">{user.city} · {user.age} yaş</Text>
              {user.revealLevel >= 3 && (
                <Text className="text-slate-500 text-xs text-center px-8">{user.bio}</Text>
              )}
            </>
          ) : (
            <Text className="text-slate-500 text-sm">Profil gizli</Text>
          )}
        </View>

        {/* Icebreaker */}
        {hasIcebreaker && (
          <View className="mx-4 mb-3 bg-amber-900/20 border border-amber-500/30 rounded-2xl p-4 gap-1.5">
            <Text className="text-amber-300 font-bold text-sm">🔥 Ortak Etkinlik Geçmişiniz Var!</Text>
            {sharedEvents.map((e) => (
              <View key={e.id} className="flex-row items-center gap-2">
                <Text>{e.emoji}</Text>
                <Text className="text-amber-200/80 text-xs">{e.name} · {e.date}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Music compatibility */}
        <View className="mx-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-3 gap-3">
          <MusicCompatibilityBar score={compatibility} />
          {user.revealLevel >= 1 && (
            <View className="gap-1.5">
              <Text className="text-slate-400 text-xs">Müzik Zevki</Text>
              <View className="flex-row flex-wrap gap-1.5">
                {user.musicGenres.map((g) => {
                  const isShared = sharedGenres.includes(g.name);
                  return (
                    <View
                      key={g.name}
                      className={`flex-row items-center gap-1 rounded-full px-2.5 py-1 ${isShared ? "bg-emerald-900/40 border border-emerald-500/30" : "bg-slate-800"}`}
                    >
                      <Text style={{ fontSize: 12 }}>{g.emoji}</Text>
                      <Text className={`text-xs font-semibold ${isShared ? "text-emerald-300" : "text-slate-300"}`}>{g.name}</Text>
                    </View>
                  );
                })}
              </View>
              {sharedGenres.length > 0 && (
                <Text className="text-emerald-400 text-xs">✓ {sharedGenres.join(", ")} ortak</Text>
              )}
            </View>
          )}
        </View>

        {/* Past events */}
        {user.revealLevel >= 2 && user.pastEvents.length > 0 && (
          <View className="mx-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-3 gap-2">
            <Text className="text-white font-semibold text-sm">🎟️ Geçmiş Etkinlikler</Text>
            {user.pastEvents.map((e) => (
              <View key={e.id} className={`flex-row items-center gap-2.5 py-1.5 border-t border-slate-800 ${sharedPastEventIds.has(e.id) ? "opacity-100" : "opacity-70"}`}>
                <Text className="text-xl">{e.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-slate-200 text-xs font-semibold">{e.name}</Text>
                  <Text className="text-slate-500 text-xs">{e.venue} · {e.date}</Text>
                </View>
                {sharedPastEventIds.has(e.id) && (
                  <Text className="text-amber-400 text-xs font-bold">Ortak</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Stats */}
        <View className="mx-4 flex-row gap-3 mb-4">
          <View className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-3 items-center gap-0.5">
            <Text className="text-white font-bold">{user.eventsAttended}</Text>
            <Text className="text-slate-500 text-xs">Etkinlik</Text>
          </View>
          <View className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-3 items-center gap-0.5">
            <Text className="text-white font-bold">{user.memberSince}</Text>
            <Text className="text-slate-500 text-xs">Üyelik</Text>
          </View>
        </View>

        {/* Actions */}
        <View className="mx-4 flex-row gap-2 mb-3">
          <SparkButton targetName={user.displayName} />
        </View>

        {/* DM — locked */}
        <View className="mx-4">
          <LockedFeature
            label="Özel Mesaj"
            description="1-1 sohbet başlatmak için Premium gerekli."
          >
            <View className="py-3.5 bg-slate-800 rounded-2xl items-center">
              <Text className="text-slate-400 text-sm font-bold">💌 Mesaj Gönder</Text>
            </View>
          </LockedFeature>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
