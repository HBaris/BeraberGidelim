import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import type { EventListing } from "@/lib/types";
import MusicCompatibilityBar from "./MusicCompatibilityBar";

interface Props {
  listing: EventListing;
}

const CATEGORY_LABELS: Record<string, string> = {
  konser: "Konser",
  festival: "Festival",
  workshop: "Workshop",
  yemek: "Yemek",
  seyahat: "Seyahat",
  müze: "Müze & Sergi",
  spor: "Spor",
  diger: "Diğer",
};

export default function EventCard({ listing }: Props) {
  const router = useRouter();
  const hasIcebreaker = listing.sharedPastEvents.length > 0;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/etkinlik/${listing.id}`)}
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
    >
      {/* Image */}
      <View className="h-36 bg-slate-800 relative">
        <Image
          source={{ uri: listing.imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-2 left-2 flex-row items-center gap-1.5 bg-slate-950/70 rounded-full px-2.5 py-1">
          <Text style={{ fontSize: 12 }}>{listing.emoji}</Text>
          <Text className="text-white text-xs font-bold">{CATEGORY_LABELS[listing.category] ?? listing.category}</Text>
        </View>
        {hasIcebreaker && (
          <View className="absolute top-2 right-2 bg-amber-500/90 rounded-full px-2.5 py-1">
            <Text className="text-white text-xs font-bold">🔥 Ortak geçmiş!</Text>
          </View>
        )}
      </View>

      <View className="p-3 gap-2">
        <Text className="text-white font-bold text-sm" numberOfLines={2}>{listing.title}</Text>

        <View className="flex-row flex-wrap gap-x-3 gap-y-0.5">
          <Text className="text-slate-400 text-xs">📍 {listing.venue}</Text>
          <Text className="text-slate-400 text-xs">📅 {listing.date}</Text>
          {listing.ticketPrice && (
            <Text className="text-slate-400 text-xs">🎟️ {listing.ticketPrice}</Text>
          )}
        </View>

        {listing.musicCompatibility != null && (
          <MusicCompatibilityBar score={listing.musicCompatibility} compact />
        )}

        <View className="flex-row items-center justify-between mt-0.5">
          <View className="flex-row items-center gap-1.5">
            {[listing.organizer, ...listing.groupMembers].slice(0, 4).map((member, i) => (
              <View
                key={member.id}
                className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600 overflow-hidden"
                style={{ marginLeft: i > 0 ? -6 : 0 }}
              >
                <Image source={{ uri: member.avatarUrl }} className="w-full h-full" />
              </View>
            ))}
            <Text className="text-slate-500 text-xs ml-1">{listing.attendeeCount} kişi</Text>
          </View>
          {listing.chatMessages.length > 0 && (
            <Text className="text-slate-500 text-xs">💬 {listing.chatMessages.length}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
