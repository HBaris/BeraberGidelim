import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useRouter } from "expo-router";
import { usePremium } from "@/lib/usePremium";

interface Props {
  targetName: string;
}

export default function SparkButton({ targetName }: Props) {
  const { isPremium } = usePremium();
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [matched, setMatched] = useState(false);

  if (!isPremium) {
    return (
      <TouchableOpacity
        onPress={() => router.push("/premium")}
        className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-2xl border border-amber-500/40 bg-amber-500/10"
      >
        <Text className="text-amber-400 text-sm font-bold">✦ Spark Gönder</Text>
        <Text className="text-amber-500/60 text-xs">(Premium)</Text>
      </TouchableOpacity>
    );
  }

  if (matched) {
    return (
      <Modal transparent animationType="fade" visible={matched}>
        <View className="flex-1 bg-black/60 items-center justify-center p-8">
          <View className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 items-center gap-3 w-full">
            <Text className="text-5xl">🔥</Text>
            <Text className="text-white text-xl font-bold">Karşılıklı Spark!</Text>
            <Text className="text-slate-400 text-sm text-center">
              {targetName} da seni fark etti. Şimdi konuşabilirsiniz!
            </Text>
            <TouchableOpacity
              onPress={() => setMatched(false)}
              className="w-full mt-2 py-3 bg-emerald-600 rounded-2xl items-center"
            >
              <Text className="text-white font-bold">Harika!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setSent(true);
        setTimeout(() => {
          if (Math.random() < 0.5) setMatched(true);
        }, 2000);
      }}
      disabled={sent}
      className={`flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-2xl ${sent ? "bg-slate-800" : "bg-amber-500"}`}
    >
      <Text className={`text-sm font-bold ${sent ? "text-slate-400" : "text-white"}`}>
        {sent ? "✓ Spark Gönderildi" : "⚡ Spark Gönder"}
      </Text>
    </TouchableOpacity>
  );
}
