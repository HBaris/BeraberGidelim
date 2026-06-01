import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import type { FeedItem } from "@/lib/types";
import MusicCompatibilityBar from "./MusicCompatibilityBar";

interface Props {
  item: FeedItem;
}

const BORDER_COLORS: Record<string, string> = {
  event_created: "border-emerald-500",
  trending: "border-blue-500",
  icebreaker: "border-amber-500",
  nearby: "border-cyan-500",
};

const BG_COLORS: Record<string, string> = {
  event_created: "bg-emerald-500",
  trending: "bg-blue-500",
  icebreaker: "bg-amber-500",
  nearby: "bg-cyan-500",
};

export default function FeedCard({ item }: Props) {
  const router = useRouter();
  const border = BORDER_COLORS[item.type] ?? "border-slate-700";
  const bg = BG_COLORS[item.type] ?? "bg-slate-500";

  return (
    <TouchableOpacity
      onPress={() => router.push(`/etkinlik/${item.listing.id}`)}
      className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex-row`}
    >
      {/* Left accent bar */}
      <View className={`w-1 ${bg} rounded-l-2xl`} />

      <View className="flex-1 p-3 gap-1.5">
        <View className="flex-row items-center justify-between">
          <Text className="text-slate-400 text-xs flex-1 mr-2" numberOfLines={1}>{item.feedText}</Text>
          <Text className="text-slate-600 text-xs">{item.timeAgo}</Text>
        </View>

        <Text className="text-white font-semibold text-sm" numberOfLines={1}>{item.listing.title}</Text>

        <View className="flex-row items-center gap-3">
          <Text className="text-slate-500 text-xs">📍 {item.listing.venue}</Text>
          <Text className="text-slate-500 text-xs">📅 {item.listing.date}</Text>
        </View>

        {item.listing.musicCompatibility != null && (
          <MusicCompatibilityBar score={item.listing.musicCompatibility} compact />
        )}

        <View className="flex-row items-center gap-1">
          <Text className="text-slate-600 text-xs">👥 {item.listing.attendeeCount} kişi</Text>
          {item.listing.chatMessages.length > 0 && (
            <Text className="text-slate-600 text-xs">· 💬 {item.listing.chatMessages.length}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
