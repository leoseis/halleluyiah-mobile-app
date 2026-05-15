import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function AnnouncementDetails() {
  const { title } = useLocalSearchParams();

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
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
}
