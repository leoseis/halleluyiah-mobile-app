import { useContext } from "react";

import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { AuthContext } from "../../src/context/AuthContext";

export default function ProfileScreen() {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();

    router.replace("/login");
  };

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
        {/* PROFILE CARD */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 24,
            padding: 24,
            alignItems: "center",
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
          {/* AVATAR */}
          <Image
            source={{
              uri: "https://i.pravatar.cc/300",
            }}
            style={{
              width: 110,
              height: 110,
              borderRadius: 100,
              marginBottom: 16,
            }}
          />

          {/* NAME */}
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: "#0d1b4c",
            }}
          >
            {user?.username || "Church Member"}
          </Text>

          {/* EMAIL */}
          <Text
            style={{
              fontSize: 15,
              color: "#666",
              marginTop: 6,
            }}
          >
            {user?.email || "member@hallelujah.com"}
          </Text>

          {/* ROLE */}
          <View
            style={{
              backgroundColor: "#e8f0ff",
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 30,
              marginTop: 16,
            }}
          >
            <Text
              style={{
                color: "#001f5b",
                fontWeight: "bold",
              }}
            >
              Redeemed Member ✨
            </Text>
          </View>
        </View>

        {/* STATS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 18,
              marginRight: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#001f5b",
              }}
            >
              24
            </Text>

            <Text
              style={{
                marginTop: 6,
                color: "#666",
              }}
            >
              Likes
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 18,
              marginLeft: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#001f5b",
              }}
            >
              12
            </Text>

            <Text
              style={{
                marginTop: 6,
                color: "#666",
              }}
            >
              Comments
            </Text>
          </View>
        </View>

        {/* SETTINGS */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 24,
            padding: 20,
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#0d1b4c",
              marginBottom: 20,
            }}
          >
            Account Settings
          </Text>

          <Pressable
            onPress={() => router.push("../edit-profile")}
            style={{
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#333",
              }}
            >
              Edit Profile
            </Text>
          </Pressable>

          <Pressable
            style={{
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#333",
              }}
            >
              Change Password
            </Text>
          </Pressable>

          <Pressable
            style={{
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#333",
              }}
            >
              Notifications
            </Text>
          </Pressable>
        </View>

        {/* LOGOUT */}
        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: "#001f5b",
            paddingVertical: 16,
            borderRadius: 18,
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
            Logout
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
