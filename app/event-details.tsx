import { useLocalSearchParams, router } from "expo-router";

import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function EventDetailsScreen() {
  const { event } = useLocalSearchParams();

  if (!event) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Event not found.</Text>
      </SafeAreaView>
    );
  }

  const eventData = JSON.parse(event as string);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {eventData.banner ? (
          <Image
            source={{
              uri: eventData.banner,
            }}
            style={{
              width: "100%",
              height: 260,
            }}
            resizeMode="cover"
          />
        ) : null}

        <View
          style={{
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#0d1b4c",
            }}
          >
            {eventData.title}
          </Text>

          <Text
            style={{
              marginTop: 10,
              color: "#666",
              fontSize: 16,
            }}
          >
            📅{" "}
            {new Date(eventData.event_date).toLocaleDateString()}
          </Text>

          <Text
            style={{
              marginTop: 8,
              color: "#666",
              fontSize: 16,
            }}
          >
            📍 {eventData.venue}
          </Text>

          <Text
            style={{
              marginTop: 20,
              lineHeight: 24,
              color: "#333",
              fontSize: 16,
            }}
          >
            {eventData.description}
          </Text>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/event-register",
                params: {
                  eventId: eventData.id.toString(),
                  title: eventData.title,
                },
              })
            }
            style={{
              backgroundColor: "#001f5b",
              padding: 16,
              borderRadius: 12,
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Register For Event
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}