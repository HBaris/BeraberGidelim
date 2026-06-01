import { View, Text } from "react-native";

interface Props {
  size?: "sm" | "md";
}

export default function PremiumBadge({ size = "sm" }: Props) {
  if (size === "sm") {
    return (
      <View className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/40 items-center justify-center">
        <Text style={{ fontSize: 8 }}>✦</Text>
      </View>
    );
  }
  return (
    <View className="flex-row items-center gap-1 border border-amber-500/30 bg-amber-500/10 rounded-full px-2.5 py-1">
      <Text className="text-amber-400 text-xs font-bold">✦ Premium</Text>
    </View>
  );
}
