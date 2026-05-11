import React, { useEffect, useState } from "react";
import AnnouncementCard from "../../components/AnnouncementCard";
import Header from "../../components/Header";
import api from "../../src/api/api";

import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";

interface Announcement {
  id: string;
  title: string;
  message: string;
}

export default function HomeScreen() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);

        const response = await api.get("/announcements/");

        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
    >
      {/* Header */}
      <Header />

      {/* Body */}
      <View style={{ padding: 20, flex: 1 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Latest Announcements
        </Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0d1b4c"
            style={{ marginTop: 40 }}
          />
        ) : (
          <FlatList
            data={announcements}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <AnnouncementCard item={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
