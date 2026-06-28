import React from "react";
import { Pressable, Share, Text, View } from "react-native";

export default function VerseCard() {
  const verse =
    "Trust in the Lord with all your heart and lean not on your own understanding.";

  const reference = "Proverbs 3:5";

  const shareVerse = async () => {
    try {
      await Share.share({
        message: `${verse}\n\n${reference}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 20,
        marginTop: -20,
        borderRadius: 18,
        padding: 20,
        elevation: 5,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#001f5b",
        }}
      >
        📖 Verse of the Day
      </Text>

      <Text
        style={{
          marginTop: 15,
          fontSize: 16,
          lineHeight: 26,
          color: "#555",
          fontStyle: "italic",
        }}
      >
        "{verse}"
      </Text>

      <Text
        style={{
          marginTop: 15,
          fontWeight: "bold",
          color: "#001f5b",
        }}
      >
        {reference}
      </Text>

      <Pressable
        onPress={shareVerse}
        style={{
          marginTop: 35,
          backgroundColor: "#001f5b",
          paddingVertical: 12,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Share Verse
        </Text>
      </Pressable>
    </View>
  );
}
