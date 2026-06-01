import { View, Text } from "react-native";

interface Props {
  score: number;
  compact?: boolean;
}

function getColor(score: number) {
  if (score >= 80) return { bar: "bg-emerald-500", text: "text-emerald-400", label: "Harika uyum!" };
  if (score >= 60) return { bar: "bg-blue-500", text: "text-blue-400", label: "İyi uyum" };
  if (score >= 40) return { bar: "bg-teal-500", text: "text-teal-400", label: "Orta uyum" };
  return { bar: "bg-slate-500", text: "text-slate-400", label: "Az uyum" };
}

export default function MusicCompatibilityBar({ score, compact = false }: Props) {
  const { bar, text, label } = getColor(score);

  if (compact) {
    return (
      <View className="flex-row items-center gap-1.5">
        <Text className="text-xs">🎵</Text>
        <View className="flex-1 h-1 bg-slate-700 rounded-full">
          <View className={`h-1 rounded-full ${bar}`} style={{ width: `${score}%` }} />
        </View>
        <Text className={`text-xs font-bold ${text}`}>{score}%</Text>
      </View>
    );
  }

  return (
    <View className="gap-1">
      <View className="flex-row items-center justify-between">
        <Text className="text-slate-400 text-xs">🎵 Müzik Uyumu</Text>
        <Text className={`text-xs font-bold ${text}`}>{score}% — {label}</Text>
      </View>
      <View className="h-2 bg-slate-700 rounded-full">
        <View className={`h-2 rounded-full ${bar}`} style={{ width: `${score}%` }} />
      </View>
    </View>
  );
}
