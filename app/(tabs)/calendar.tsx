import { useCallback, useMemo, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { useFocusEffect } from "expo-router";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function CalendarScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      console.log("CALENDAR: starting API request");

      setLoading(true);
      setError("");

      const response = await api.get("/events/");

      console.log("CALENDAR EVENTS:", response.data);

      setEvents(response.data);
    } catch (error: any) {
      console.log("CALENDAR API FAILED");
      console.log("CALENDAR ERROR MESSAGE:", error.message);
      console.log("CALENDAR ERROR STATUS:", error.response?.status);

      setEvents([]);

      setError(
        "Unable to load church events. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Fetch whenever Calendar screen
   * comes back into focus.
   */
  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, []),
  );

  /*
   * Convert:
   * 2026-06-10T12:00:00Z
   * to:
   * 2026-06-10
   */
  const getEventDate = (eventDate: string) => {
    if (!eventDate) return "";

    return eventDate.split("T")[0];
  };

  /*
   * Mark all event dates.
   */
  const markedDates = useMemo(() => {
    const dates: Record<string, any> = {};

    events.forEach((event) => {
      if (!event.event_date) return;

      const date = getEventDate(event.event_date);

      dates[date] = {
        marked: true,
        dotColor: isDark ? "#60a5fa" : "#001f5b",
      };
    });

    /*
     * Highlight selected date.
     */
    if (selectedDate) {
      dates[selectedDate] = {
        ...dates[selectedDate],
        selected: true,
        selectedColor: isDark ? "#2563eb" : "#001f5b",
        selectedTextColor: "#ffffff",
      };
    }

    return dates;
  }, [events, selectedDate, isDark]);

  /*
   * Future events only.
   */
  const upcomingEvents = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return [...events]
      .filter((event) => {
        if (!event.event_date) return false;

        const date = getEventDate(event.event_date);

        const eventDate = new Date(`${date}T00:00:00`);

        return eventDate >= today;
      })
      .sort((a, b) => {
        const firstDate = new Date(
          `${getEventDate(a.event_date)}T00:00:00`,
        ).getTime();

        const secondDate = new Date(
          `${getEventDate(b.event_date)}T00:00:00`,
        ).getTime();

        return firstDate - secondDate;
      });
  }, [events]);

  /*
   * Calendar opens at:
   * 1. Closest upcoming event
   * 2. First existing event
   * 3. Today
   */
  const initialCalendarDate = useMemo(() => {
    if (upcomingEvents.length > 0) {
      return getEventDate(upcomingEvents[0].event_date);
    }

    if (events.length > 0 && events[0].event_date) {
      return getEventDate(events[0].event_date);
    }

    return new Date().toISOString().split("T")[0];
  }, [events, upcomingEvents]);

  /*
   * Events on selected date.
   */
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];

    return events.filter(
      (event) => getEventDate(event.event_date) === selectedDate,
    );
  }, [events, selectedDate]);

  // LOADING STATE
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={{
            marginTop: 12,
            color: theme.secondaryText,
            fontSize: 15,
          }}
        >
          Loading church events...
        </Text>
      </View>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            fontSize: 48,
            marginBottom: 16,
          }}
        >
          📡
        </Text>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: theme.text,
            textAlign: "center",
          }}
        >
          Unable to Load Calendar
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            textAlign: "center",
            marginTop: 10,
            lineHeight: 22,
            fontSize: 15,
          }}
        >
          {error}
        </Text>

        <Pressable
          onPress={fetchEvents}
          style={({ pressed }) => ({
            backgroundColor: isDark ? "#2563eb" : "#001f5b",
            paddingHorizontal: 30,
            paddingVertical: 14,
            borderRadius: 12,
            marginTop: 24,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Try Again
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <FlatList
        data={selectedDate ? selectedDateEvents : upcomingEvents}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <>
            {/* PAGE TITLE */}
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: theme.text,
                marginBottom: 20,
              }}
            >
              Church Events 📅
            </Text>

            {/* CALENDAR */}
            <View
              style={{
                backgroundColor: theme.card,
                borderRadius: 18,
                overflow: "hidden",
                elevation: 3,
                borderWidth: isDark ? 1 : 0,
                borderColor: theme.border,
              }}
            >
              <Calendar
                current={initialCalendarDate}
                markedDates={markedDates}
                onDayPress={(day) => {
                  if (selectedDate === day.dateString) {
                    setSelectedDate(null);
                  } else {
                    setSelectedDate(day.dateString);
                  }
                }}
                theme={{
                  calendarBackground: theme.card,

                  textSectionTitleColor: theme.secondaryText,

                  dayTextColor: theme.text,

                  monthTextColor: theme.text,

                  textDisabledColor: isDark ? "#475569" : "#d1d5db",

                  todayTextColor: isDark ? "#60a5fa" : "#001f5b",

                  arrowColor: isDark ? "#60a5fa" : "#001f5b",

                  dotColor: isDark ? "#60a5fa" : "#001f5b",

                  selectedDayBackgroundColor: isDark ? "#2563eb" : "#001f5b",

                  selectedDayTextColor: "#ffffff",

                  textDayFontWeight: "500",

                  textMonthFontWeight: "700",

                  textDayHeaderFontWeight: "600",
                }}
              />
            </View>

            {/* SECTION TITLE */}
            <View
              style={{
                marginTop: 30,
                marginBottom: 14,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: theme.text,
                }}
              >
                {selectedDate ? "Events On Selected Date" : "Upcoming Events"}
              </Text>

              {selectedDate && (
                <Text
                  style={{
                    color: theme.secondaryText,
                    marginTop: 5,
                  }}
                >
                  {new Date(`${selectedDate}T00:00:00`).toLocaleDateString()}
                </Text>
              )}
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
              padding: 16,
              borderRadius: 14,
              marginBottom: 12,
              elevation: 2,
              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border,
            }}
          >
            {/* EVENT TITLE */}
            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                color: theme.text,
              }}
            >
              {item.title}
            </Text>

            {/* DATE */}
            <Text
              style={{
                marginTop: 6,
                color: theme.secondaryText,
              }}
            >
              📅{" "}
              {new Date(
                `${getEventDate(item.event_date)}T00:00:00`,
              ).toLocaleDateString()}
            </Text>

            {/* TIME */}
            {item.event_time && (
              <Text
                style={{
                  marginTop: 4,
                  color: theme.secondaryText,
                }}
              >
                🕒 {item.event_time}
              </Text>
            )}

            {/* VENUE */}
            {item.venue && (
              <Text
                style={{
                  marginTop: 4,
                  color: theme.secondaryText,
                }}
              >
                📍 {item.venue}
              </Text>
            )}

            {/* DESCRIPTION */}
            {item.description && (
              <Text
                numberOfLines={3}
                style={{
                  marginTop: 10,
                  color: theme.secondaryText,
                  lineHeight: 21,
                }}
              >
                {item.description}
              </Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              backgroundColor: theme.card,
              padding: 24,
              borderRadius: 14,
              alignItems: "center",
              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border,
            }}
          >
            <Text
              style={{
                fontSize: 36,
                marginBottom: 10,
              }}
            >
              📅
            </Text>

            <Text
              style={{
                color: theme.text,
                fontWeight: "bold",
                fontSize: 17,
                textAlign: "center",
              }}
            >
              {selectedDate ? "No Event On This Date" : "No Upcoming Events"}
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                textAlign: "center",
                marginTop: 7,
                lineHeight: 21,
              }}
            >
              {selectedDate
                ? "There is currently no church event scheduled for this date."
                : "There are currently no upcoming church events available."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
