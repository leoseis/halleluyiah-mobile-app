import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import AnnouncementCard from "../../components/AnnouncementCard";

import api from "../../src/api/api";

interface Announcement {
  id: string;
  title: string;
  message: string;
}

export default function HomeScreen() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await api.get("/announcements/");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
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
      <View
        style={{
          backgroundColor: "#0d1b4c",
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/icon.png")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 12,
          }}
        />

        <View>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            RCCG Hallelujah Parish
          </Text>

          <Text
            style={{
              color: "#d1d5db",
            }}
          >
            Parish Announcements
          </Text>
        </View>
      </View>

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

        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AnnouncementCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
