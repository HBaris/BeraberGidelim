import { Tabs } from "expo-router";
import { Text } from "react-native";
import { usePremium } from "@/lib/usePremium";

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.5 }}>
      {emoji}
    </Text>
  );
}

export default function TabLayout() {
  const { isPremium } = usePremium();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#020617",
          borderTopColor: "#1e293b",
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#34d399",
        tabBarInactiveTintColor: "#64748b",
        tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Keşfet",
          tabBarIcon: ({ focused }) => <TabIcon emoji="🔍" label="Keşfet" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="etkinlikler"
        options={{
          title: "Etkinlikler",
          tabBarIcon: ({ focused }) => <TabIcon emoji="🎟️" label="Etkinlikler" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="olustur"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: focused ? "#059669" : "#065f46",
                fontSize: 22,
                textAlign: "center",
                lineHeight: 44,
                overflow: "hidden",
              }}
            >
              ➕
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: isPremium ? "✦ Profil" : "Profil",
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" label="Profil" focused={focused} />,
          tabBarActiveTintColor: isPremium ? "#f59e0b" : "#34d399",
        }}
      />
      <Tabs.Screen name="two" options={{ href: null }} />
    </Tabs>
  );
}
