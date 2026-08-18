import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { Image, Pressable, Text, View } from "react-native";

interface HomeHeaderProps {
  greeting: string;
  userName: string;
}

export default function HomeHeader({ greeting, userName }: HomeHeaderProps) {
  return (
    <View
      style={{
        backgroundColor: "#001f5b",
        borderRadius: 26,
        paddingHorizontal: 20,
        paddingVertical: 22,
        overflow: "hidden",
      }}
    >
      {/* TOP ROW */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LOGO + GREETING */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 16,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 13,
            }}
          >
            <Image
              source={require("../../assets/images/reed.png")}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                color: "#bfdbfe",
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              {greeting}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                color: "white",
                fontSize: 23,
                fontWeight: "bold",
                marginTop: 3,
              }}
            >
              {userName}
            </Text>
          </View>
        </View>

        {/* NOTIFICATION */}
        <Pressable
          style={{
            width: 43,
            height: 43,
            borderRadius: 14,
            backgroundColor: "rgba(255,255,255,0.12)",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
          }}
        >
          <Ionicons name="notifications-outline" size={23} color="white" />

          {/* SMALL NOTIFICATION DOT */}
          <View
            style={{
              position: "absolute",
              top: 9,
              right: 10,
              width: 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: "#ef4444",
              borderWidth: 1,
              borderColor: "#001f5b",
            }}
          />
        </Pressable>
      </View>

      {/* WELCOME MESSAGE */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: "rgba(255,255,255,0.10)",
          borderRadius: 16,
          paddingHorizontal: 15,
          paddingVertical: 13,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons name="home-outline" size={20} color="#dbeafe" />

        <Text
          style={{
            color: "#dbeafe",
            fontSize: 14,
            marginLeft: 9,
            flex: 1,
          }}
        >
          Welcome to RCCG HalleluYah Parish
        </Text>
      </View>
    </View>
  );
}
