import { ActivityIndicator, View } from "react-native";

export default function LoaderSpinner() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#0d1b4c" />
    </View>
  );
}
