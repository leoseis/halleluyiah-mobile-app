import { useLocalSearchParams } from "expo-router";

import {
    Image,
    Linking,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

export default function SermonDetails() {
  const params = useLocalSearchParams();

  const sermon = JSON.parse(params.sermon as string);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      {/* THUMBNAIL */}
      <Image
        source={{
          uri: sermon.thumbnail,
        }}
        style={{
          width: "100%",
          height: 250,
        }}
        resizeMode="cover"
      />

      {/* CONTENT */}
      <View
        style={{
          padding: 20,
        }}
      >
        {/* TITLE */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#0d1b4c",
            marginBottom: 10,
          }}
        >
          {sermon.title}
        </Text>

        {/* PASTOR */}
        <Text
          style={{
            fontSize: 18,
            color: "#555",
            marginBottom: 6,
          }}
        >
          🎤 {sermon.pastor}
        </Text>

        {/* DATE */}
        <Text
          style={{
            fontSize: 15,
            color: "#777",
            marginBottom: 30,
          }}
        >
          {new Date(sermon.created_at).toDateString()}
        </Text>

        {/* BUTTON */}
        <Pressable
          onPress={() => Linking.openURL(sermon.youtube_link)}
          style={{
            backgroundColor: "#001f5b",
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            ▶ Watch Sermon
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
