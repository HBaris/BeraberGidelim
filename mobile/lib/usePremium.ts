import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "bbg_premium";

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => setIsPremium(v === "true"));
  }, []);

  async function activate() {
    await AsyncStorage.setItem(KEY, "true");
    setIsPremium(true);
  }

  async function deactivate() {
    await AsyncStorage.removeItem(KEY);
    setIsPremium(false);
  }

  return { isPremium, activate, deactivate };
}
