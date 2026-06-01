import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MOCK_LISTINGS, CURRENT_USER } from "@/lib/mockData";
import type { ChatMessage } from "@/lib/types";
import MusicCompatibilityBar from "@/components/MusicCompatibilityBar";

export default function EtkinlikDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const listing = MOCK_LISTINGS.find((l) => l.id === id);

  const [tab, setTab] = useState<"detaylar" | "sohbet">("detaylar");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(listing?.chatMessages ?? []);
  const [draft, setDraft] = useState("");

  if (!listing) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center">
        <Text className="text-slate-500">Etkinlik bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        userId: "me",
        displayName: CURRENT_USER.displayName,
        avatarUrl: CURRENT_USER.avatarUrl,
        text: draft.trim(),
        sentAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setDraft("");
  };

  const hasIcebreaker = listing.sharedPastEvents.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center gap-3 px-4 py-3 border-b border-slate-800">
        <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center rounded-xl bg-slate-800">
          <Text className="text-white text-base">←</Text>
        </TouchableOpacity>
        <Text className="text-white font-bold text-base flex-1" numberOfLines={1}>{listing.title}</Text>
      </View>

      {/* Tab switcher */}
      <View className="mx-4 mt-3 flex-row bg-slate-900 rounded-xl p-1 gap-1">
        {(["detaylar", "sohbet"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg items-center ${tab === t ? "bg-emerald-600" : ""}`}
          >
            <Text className={`text-sm font-bold ${tab === t ? "text-white" : "text-slate-400"}`}>
              {t === "detaylar" ? "Detaylar" : `💬 Grup Sohbeti${messages.length > 0 ? ` (${messages.length})` : ""}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === "detaylar" ? (
        <ScrollView className="flex-1 mt-3" contentContainerClassName="pb-6">
          {/* Cover image */}
          <View className="mx-4 h-44 bg-slate-800 rounded-2xl overflow-hidden mb-3">
            <Image source={{ uri: listing.imageUrl }} className="w-full h-full" resizeMode="cover" />
          </View>

          {/* Icebreaker */}
          {hasIcebreaker && (
            <View className="mx-4 mb-3 bg-amber-900/20 border border-amber-500/30 rounded-2xl p-3 flex-row items-center gap-2">
              <Text className="text-xl">🔥</Text>
              <View className="flex-1">
                <Text className="text-amber-300 text-sm font-bold">Ortak Geçmişiniz Var!</Text>
                <Text className="text-amber-200/70 text-xs">{listing.sharedPastEvents.map((e) => e.name).join(", ")}</Text>
              </View>
            </View>
          )}

          {/* Details */}
          <View className="mx-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-3 gap-2.5">
            <View className="flex-row flex-wrap gap-x-4 gap-y-1.5">
              <Text className="text-slate-300 text-sm">📍 {listing.venue}, {listing.city}</Text>
              <Text className="text-slate-300 text-sm">📅 {listing.date}</Text>
              <Text className="text-slate-300 text-sm">⏰ {listing.time}</Text>
              {listing.ticketPrice && <Text className="text-slate-300 text-sm">🎟️ {listing.ticketPrice}</Text>}
            </View>
            <Text className="text-slate-400 text-sm leading-relaxed">{listing.description}</Text>
            {listing.tags.length > 0 && (
              <View className="flex-row flex-wrap gap-1.5 mt-1">
                {listing.tags.map((tag) => (
                  <View key={tag} className="bg-slate-800 rounded-full px-2.5 py-1">
                    <Text className="text-slate-400 text-xs">#{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Music compatibility */}
          {listing.musicCompatibility != null && (
            <View className="mx-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-3">
              <MusicCompatibilityBar score={listing.musicCompatibility} />
            </View>
          )}

          {/* Participants */}
          <View className="mx-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 gap-2">
            <Text className="text-white font-semibold text-sm">👥 Katılımcılar ({listing.attendeeCount})</Text>
            {[listing.organizer, ...listing.groupMembers].map((member) => (
              <TouchableOpacity
                key={member.id}
                onPress={() => router.push(`/kullanici/${member.id}`)}
                className="flex-row items-center gap-3 py-1.5"
              >
                <View className="w-10 h-10 rounded-xl overflow-hidden bg-slate-700">
                  <Image source={{ uri: member.avatarUrl }} className="w-full h-full" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-200 text-sm font-semibold">{member.displayName}</Text>
                  {member.isVerified && <Text className="text-emerald-400 text-xs">✓ Doğrulandı</Text>}
                </View>
                <Text className="text-slate-600 text-base">›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Join button */}
          {!joined ? (
            <TouchableOpacity
              onPress={() => setJoined(true)}
              className="mx-4 py-4 bg-emerald-600 rounded-2xl items-center"
            >
              <Text className="text-white font-bold">Katılmak İstiyorum</Text>
            </TouchableOpacity>
          ) : (
            <View className="mx-4 gap-2">
              <View className="py-3 bg-emerald-900/30 border border-emerald-500/30 rounded-2xl items-center">
                <Text className="text-emerald-400 font-bold text-sm">✓ Katıldın!</Text>
              </View>
              <TouchableOpacity
                onPress={() => setTab("sohbet")}
                className="py-3 bg-blue-600 rounded-2xl items-center"
              >
                <Text className="text-white font-bold text-sm">💬 Grup Sohbetine Git</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      ) : (
        /* Chat tab */
        <View className="flex-1">
          {!joined ? (
            <View className="flex-1 items-center justify-center p-8 gap-4">
              <Text className="text-4xl">💬</Text>
              <Text className="text-white font-bold text-center">Grup Sohbetine Katıl</Text>
              <Text className="text-slate-400 text-sm text-center">Sohbete katılmak için önce etkinliğe katılman gerekiyor.</Text>
              <TouchableOpacity onPress={() => setTab("detaylar")} className="py-3 px-6 bg-emerald-600 rounded-2xl">
                <Text className="text-white font-bold text-sm">Etkinliğe Katıl</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <ScrollView className="flex-1 px-4 mt-2" contentContainerClassName="pb-3 gap-2">
                {messages.length === 0 ? (
                  <View className="py-12 items-center">
                    <Text className="text-slate-600 text-sm">Henüz mesaj yok. İlk sen yaz!</Text>
                  </View>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.userId === "me";
                    return (
                      <View key={msg.id} className={`flex-row gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                        {!isMe && (
                          <View className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 mt-auto">
                            <Image source={{ uri: msg.avatarUrl }} className="w-full h-full" />
                          </View>
                        )}
                        <View className={`max-w-[75%] rounded-2xl px-3 py-2 gap-0.5 ${isMe ? "bg-emerald-700 rounded-tr-sm" : "bg-slate-800 rounded-tl-sm"}`}>
                          {!isMe && <Text className="text-emerald-400 text-xs font-semibold">{msg.displayName}</Text>}
                          <Text className="text-white text-sm">{msg.text}</Text>
                          <Text className={`text-xs ${isMe ? "text-emerald-300/60 text-right" : "text-slate-500"}`}>{msg.sentAt}</Text>
                        </View>
                      </View>
                    );
                  })
                )}
              </ScrollView>
              {/* Input */}
              <View className="flex-row gap-2 px-4 py-3 border-t border-slate-800">
                <TextInput
                  value={draft}
                  onChangeText={setDraft}
                  placeholder="Mesaj yaz..."
                  placeholderTextColor="#475569"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"
                  onSubmitEditing={sendMessage}
                  returnKeyType="send"
                />
                <TouchableOpacity
                  onPress={sendMessage}
                  disabled={!draft.trim()}
                  className={`w-10 h-10 rounded-xl items-center justify-center ${draft.trim() ? "bg-emerald-600" : "bg-slate-800"}`}
                >
                  <Text className="text-white text-base">↑</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
