import React from "react";
import { Text, View } from "react-native";

import ActionCard from "./ActionCard";

export default function QuickActions() {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#001f5b",
          marginBottom: 14,
        }}
      >
        Quick Actions
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <ActionCard
          title="Daily Devotional"
          icon="book-outline"
          route="/devotional"
          color="#8B5CF6"
        />

        <ActionCard
          title="Giving"
          icon="card-outline"
          route="/giving"
          color="#10B981"
        />

        <ActionCard
          title="Sermons"
          icon="mic-outline"
          route="/sermons"
          color="#EF4444"
        />

        <ActionCard
          title="Events"
          icon="calendar-outline"
          route="/events"
          color="#F59E0B"
        />

        <ActionCard
          title="Testimonies"
          icon="sparkles-outline"
          route="/testimonies"
          color="#0EA5E9"
        />
      </View>
    </View>
  );
}
