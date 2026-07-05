import React from "react";
import { View } from "react-native";

import ActionCard from "./ActionCard";

export default function QuickActions() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginVertical: 20,
      }}
    >
      <ActionCard title="Daily Devotional" icon="📖" route="/devotional" />

      <ActionCard title="Giving" icon="💳" route="/giving" />

      <ActionCard title="Sermons" icon="🎤" route="/sermons" />

      <ActionCard title="Events" icon="📅" route="/events" />

      <ActionCard title="Testimonies" icon="✨" route="/testimonies" />
    </View>
  );
}
