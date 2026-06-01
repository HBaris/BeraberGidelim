import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { MOCK_FEED, MOCK_LISTINGS } from "@/lib/mockData";
import FeedCard from "@/components/FeedCard";
import EventCard from "@/components/EventCard";

const CATEGORIES = [
  { key: "tümü", label: "Tümü", emoji: "✨" },
  { key: "konser", label: "Konser", emoji: "🎸" },
  { key: "festival", label: "Festival", emoji: "🎪" },
  { key: "workshop", label: "Workshop", emoji: "🕯️" },
  { key: "yemek", label: "Yemek", emoji: "🍽️" },
  { key: "seyahat", label: "Seyahat", emoji: "⛵" },
  { key: "müze", label: "Müze", emoji: "🖼️" },
];

const FOOD_TAGS = [
  { key: "pizza", label: "Pizza 🍕" },
  { key: "suşi", label: "Suşi 🍣" },
  { key: "mantı", label: "Mantı 🥟" },
  { key: "şarap", label: "Şarap 🍷" },
  { key: "kahve", label: "Kahve ☕" },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"feed" | "kesfet">("feed");
  const [activeCategory, setActiveCategory] = useState("tümü");
  const [activeFoodTag, setActiveFoodTag] = useState("");
  const [search, setSearch] = useState("");

  const q = search.toLowerCase().trim();
  const filteredListings = MOCK_LISTINGS.filter((l) => {
    const catMatch = activeCategory === "tümü" || l.category === activeCategory;
    const tagMatch = !activeFoodTag || l.tags.includes(activeFoodTag);
    const searchMatch =
      !q ||
      l.title.toLowerCase().includes(q) ||
      l.venue.toLowerCase().includes(q) ||
      l.tags.some((t) => t.toLowerCase().includes(q));
    return catMatch && tagMatch && searchMatch;
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 h-14 border-b border-slate-800">
        <View className="flex-row items-center gap-2">
          <Text className="text-xl">🎵</Text>
          <Text className="text-white font-bold text-lg">BeraberGidelim</Text>
        </View>
        <Link href="/premium" asChild>
          <TouchableOpacity className="border border-amber-500/30 bg-amber-500/10 rounded-full px-3 py-1.5">
            <Text className="text-amber-400 text-xs font-bold">✦ Premium</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Hero */}
      <View className="mx-4 mt-4 rounded-2xl p-4 bg-emerald-950/40 border border-emerald-800/30">
        <Text className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
          🎵 Müzik uyumuna göre eşleş
        </Text>
        <Text className="text-white text-xl font-bold leading-tight">
          Etkinliklere birlikte git,{"\n"}
          <Text className="text-emerald-400">yeni arkadaşlar edin.</Text>
        </Text>
        <Text className="text-slate-400 text-xs mt-2">
          Spotify müzik zevkin + etkinlik geçmişin → doğal buluşma
        </Text>
      </View>

      {/* Tab switcher */}
      <View className="mx-4 mt-3 flex-row bg-slate-900 rounded-xl p-1 gap-1">
        {(["feed", "kesfet"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg items-center ${activeTab === tab ? "bg-emerald-600" : ""}`}
          >
            <Text className={`text-sm font-bold ${activeTab === tab ? "text-white" : "text-slate-400"}`}>
              {tab === "feed" ? "🔴 Canlı Akış" : "🔍 Keşfet"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Keşfet filters */}
      {activeTab === "kesfet" && (
        <View className="mt-2">
          <View className="mx-4">
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Pizza, konser, Kadıköy..."
              placeholderTextColor="#64748b"
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm"
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2" contentContainerClassName="px-4 gap-2">
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                onPress={() => { setActiveCategory(cat.key); setActiveFoodTag(""); }}
                className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full ${activeCategory === cat.key ? "bg-emerald-600" : "bg-slate-800"}`}
              >
                <Text>{cat.emoji}</Text>
                <Text className={`text-xs font-bold ${activeCategory === cat.key ? "text-white" : "text-slate-400"}`}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {activeCategory === "yemek" && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-1.5" contentContainerClassName="px-4 gap-2">
              {FOOD_TAGS.map((tag) => (
                <TouchableOpacity
                  key={tag.key}
                  onPress={() => setActiveFoodTag(activeFoodTag === tag.key ? "" : tag.key)}
                  className={`px-3 py-1 rounded-full border ${activeFoodTag === tag.key ? "bg-cyan-600 border-cyan-500" : "bg-slate-900 border-slate-700"}`}
                >
                  <Text className={`text-xs font-bold ${activeFoodTag === tag.key ? "text-white" : "text-slate-400"}`}>
                    {tag.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}

      {/* Content */}
      <ScrollView className="flex-1 mt-3" contentContainerClassName="px-4 pb-6 gap-3">
        {activeTab === "feed" ? (
          <>
            <View className="flex-row items-center gap-2 py-1">
              <View className="w-2 h-2 rounded-full bg-red-500" />
              <Text className="text-slate-400 text-xs font-medium">{MOCK_FEED.length} etkinlik akışta</Text>
            </View>
            {MOCK_FEED.map((item) => <FeedCard key={item.id} item={item} />)}
          </>
        ) : (
          <>
            <Text className="text-slate-500 text-xs py-1">{filteredListings.length} etkinlik bulundu</Text>
            {filteredListings.map((listing) => <EventCard key={listing.id} listing={listing} />)}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
