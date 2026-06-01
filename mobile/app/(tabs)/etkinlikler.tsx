import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_LISTINGS } from "@/lib/mockData";
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
  { key: "pizza", label: "Pizza 🍕" }, { key: "suşi", label: "Suşi 🍣" },
  { key: "mantı", label: "Mantı 🥟" }, { key: "börek", label: "Börek" },
  { key: "şarap", label: "Şarap 🍷" }, { key: "bira", label: "Bira 🍺" },
  { key: "kahve", label: "Kahve ☕" }, { key: "sınırsız", label: "Sınırsız" },
];

export default function EtkinliklerScreen() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("tümü");
  const [activeFoodTag, setActiveFoodTag] = useState("");
  const [sortBy, setSortBy] = useState<"uyum" | "tarih">("uyum");

  const q = search.toLowerCase().trim();
  let filtered = MOCK_LISTINGS.filter((l) => {
    const catMatch = activeCategory === "tümü" || l.category === activeCategory;
    const tagMatch = !activeFoodTag || l.tags.includes(activeFoodTag);
    const searchMatch = !q || l.title.toLowerCase().includes(q) || l.venue.toLowerCase().includes(q) || l.tags.some((t) => t.toLowerCase().includes(q));
    return catMatch && tagMatch && searchMatch;
  });

  if (sortBy === "uyum") {
    filtered = [...filtered].sort((a, b) => (b.musicCompatibility ?? 0) - (a.musicCompatibility ?? 0));
  } else {
    filtered = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      <ScrollView className="flex-1" contentContainerClassName="pb-6">
        <View className="px-4 pt-4 gap-3">
          <Text className="text-white text-xl font-bold">Etkinlikler</Text>

          {/* Search */}
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Pizza, konser, Kadıköy..."
            placeholderTextColor="#64748b"
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm"
          />

          {/* Category chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
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

          {/* Food quick tags */}
          {activeCategory === "yemek" && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
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

          {/* Sort + count */}
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-500 text-xs">{filtered.length} etkinlik</Text>
            <View className="flex-row gap-2">
              {(["uyum", "tarih"] as const).map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setSortBy(s)}
                  className={`px-3 py-1 rounded-full border ${sortBy === s ? "bg-emerald-600 border-emerald-500" : "bg-slate-900 border-slate-700"}`}
                >
                  <Text className={`text-xs font-bold ${sortBy === s ? "text-white" : "text-slate-400"}`}>
                    {s === "uyum" ? "🎵 Uyum" : "📅 Tarih"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View className="px-4 mt-2 gap-3">
          {filtered.length === 0 ? (
            <View className="items-center py-16">
              <Text className="text-4xl mb-3">🔍</Text>
              <Text className="text-slate-500 text-sm">Sonuç bulunamadı.</Text>
            </View>
          ) : (
            filtered.map((listing) => <EventCard key={listing.id} listing={listing} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
