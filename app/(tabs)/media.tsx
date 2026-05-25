import {
    Image,
    Linking,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function MediaScreen() {
  const sermons = [
    {
      id: 1,
      title: "Walking In Divine Purpose",
      pastor: "Pastor E.A Adeboye",
      image: "https://images.unsplash.com/photo-1515169067868-5387ec356754",

      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },

    {
      id: 2,
      title: "The Power Of Prayer",
      pastor: "Pastor Kumuyi",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65",

      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },

    {
      id: 3,
      title: "Faith That Moves Mountains",
      pastor: "Pastor Paul Enenche",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3",

      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#0d1b4c",
            marginBottom: 24,
          }}
        >
          Sermons & Media 🎥
        </Text>

        {sermons.map((sermon) => (
          <Pressable
            key={sermon.id}
            onPress={() => Linking.openURL(sermon.link)}
            style={{
              backgroundColor: "#fff",
              borderRadius: 22,
              overflow: "hidden",
              marginBottom: 24,

              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: {
                width: 0,
                height: 4,
              },

              elevation: 4,
            }}
          >
            <Image
              source={{
                uri: sermon.image,
              }}
              style={{
                width: "100%",
                height: 220,
              }}
            />

            <View
              style={{
                padding: 18,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#0d1b4c",
                }}
              >
                {sermon.title}
              </Text>

              <Text
                style={{
                  color: "#666",
                  marginTop: 8,
                  fontSize: 15,
                }}
              >
                {sermon.pastor}
              </Text>

              <View
                style={{
                  marginTop: 18,
                  backgroundColor: "#001f5b",
                  paddingVertical: 12,
                  borderRadius: 14,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  ▶ Watch Sermon
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
