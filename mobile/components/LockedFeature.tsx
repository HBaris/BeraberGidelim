import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface Props {
  label?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function LockedFeature({
  label = "Premium Özellik",
  description = "Bu özelliği kullanmak için Premium'a geçin.",
  children,
}: Props) {
  const router = useRouter();

  return (
    <View className="relative rounded-2xl overflow-hidden">
      {children && (
        <View style={{ opacity: 0.15 }} pointerEvents="none">
          {children}
        </View>
      )}
      <View
        className="absolute inset-0 items-center justify-center bg-slate-950/70 rounded-2xl p-4"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Text className="text-2xl mb-2">🔒</Text>
        <Text className="text-white font-bold text-sm text-center">{label}</Text>
        <Text className="text-slate-400 text-xs text-center mt-1 mb-3">{description}</Text>
        <TouchableOpacity
          onPress={() => router.push("/premium")}
          className="bg-amber-500 rounded-xl px-4 py-2"
        >
          <Text className="text-white font-bold text-xs">✦ Premium'a Geç</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
