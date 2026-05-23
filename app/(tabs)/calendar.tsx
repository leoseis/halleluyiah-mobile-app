import { Calendar } from "react-native-calendars";

import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "react-native";

export default function CalendarScreen() {
  const markedDates = {
    "2026-05-25": {
      marked: true,
      dotColor: "#001f5b",
    },

    "2026-05-28": {
      marked: true,
      dotColor: "green",
    },

    "2026-06-01": {
      marked: true,
      dotColor: "red",
    },
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
    >
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
            marginBottom: 20,
          }}
        >
          Church Events 📅
        </Text>

        <Calendar
          markedDates={markedDates}
          theme={{
            todayTextColor: "#001f5b",
            arrowColor: "#001f5b",
            dotColor: "#001f5b",
            selectedDayBackgroundColor: "#001f5b",
          }}
        />

        <View
          style={{
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Upcoming Events
          </Text>

          <Text>🎉 Youth Vigil — May 25</Text>

          <Text
            style={{
              marginTop: 8,
            }}
          >
            💍 Wedding Ceremony — May 28
          </Text>

          <Text
            style={{
              marginTop: 8,
            }}
          >
            🙏 Sunday Thanksgiving — June 1
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
