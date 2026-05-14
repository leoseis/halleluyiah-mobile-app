import { useContext } from "react";
import { Pressable, Text, View } from "react-native";

import { AuthContext } from "../../src/context/AuthContext";

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Welcome to RCCG Hallelujah
      </Text>

      <Text
        style={{
          marginBottom: 30,
        }}
      >
        Mobile Church App
      </Text>

      <Pressable
        onPress={async () => {
          await logout();
        }}
        style={{
          backgroundColor: "#0d1b4c",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
