import { useContext } from "react";

import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { AuthContext } from "../../src/context/AuthContext";

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  const settingsItems = [
    {
      title: "About Church",
      icon: "🏛",
    },
    {
      title: "Contact Us",
      icon: "📞",
    },
    {
      title: "Social Media",
      icon: "🌐",
    },
    {
      title: "App Version",
      icon: "ℹ️",
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#001f5b",
          marginBottom: 25,
        }}
      >
        Settings ⚙️
      </Text>

      {settingsItems.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "white",
            padding: 18,
            borderRadius: 16,
            marginBottom: 15,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#001f5b",
              fontWeight: "600",
            }}
          >
            {item.icon} {item.title}
          </Text>
        </View>
      ))}

      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "#dc3545",
          padding: 18,
          borderRadius: 16,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Logout
        </Text>
      </Pressable>
    </ScrollView>
  );
}
