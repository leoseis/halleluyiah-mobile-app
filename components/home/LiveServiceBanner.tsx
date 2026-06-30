import { useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import api from "../../src/api/api";

export default function LiveServiceBanner() {
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    fetchLiveService();
  }, []);

  const fetchLiveService = async () => {
    try {
      const response = await api.get("/live-service/");

      if (response.data.length > 0) {
        setService(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!service) return null;

  return (
    <View
      style={{
        backgroundColor: "#dc2626",
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 18,
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        🔴 LIVE NOW
      </Text>

      <Text
        style={{
          color: "white",
          marginTop: 10,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {service.title}
      </Text>

      <Pressable
        onPress={() => Linking.openURL(service.youtube_url)}
        style={{
          backgroundColor: "white",
          marginTop: 20,
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#dc2626",
            fontWeight: "bold",
          }}
        >
          Watch Live
        </Text>
      </Pressable>
    </View>
  );
}
