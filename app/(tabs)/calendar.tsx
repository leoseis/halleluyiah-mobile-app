import { useEffect, useMemo, useState } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events/");

      console.log("CALENDAR EVENTS:", response.data);

      setEvents(response.data);
    } catch (error) {
      console.log("Calendar event fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Convert Django datetime:
   *
   * 2026-06-10T12:00:00Z
   *
   * into:
   *
   * 2026-06-10
   */
  const getEventDate = (eventDate: string) => {
    if (!eventDate) return "";

    return eventDate.split("T")[0];
  };

  /*
   * MARK ALL EVENT DATES
   *
   * Past and future events can both appear
   * as dots on the calendar.
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
     * Highlight date selected by user.
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
   * FUTURE EVENTS ONLY
   *
   * These appear under "Upcoming Events".
   */
  const upcomingEvents = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return [...events]
      .filter((event) => {
        if (!event.event_date) return false;

        const date = getEventDate(event.event_date);

        /*
         * Adding T00:00:00 prevents timezone problems.
         */
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
   * Decide which month should open first.
   *
   * 1. Nearest upcoming event
   * 2. First available event
   * 3. Today's date
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
   * Events belonging to currently selected date.
   */
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];

    return events.filter(
      (event) => getEventDate(event.event_date) === selectedDate,
    );
  }, [events, selectedDate]);

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
            marginTop: 10,
            color: theme.secondaryText,
          }}
        >
          Loading church events...
        </Text>
      </View>
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
              }}
            >
              <Calendar
                current={initialCalendarDate}
                markedDates={markedDates}
                onDayPress={(day) => {
                  /*
                   * Tap selected date again to clear it.
                   */
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
              padding: 20,
              borderRadius: 14,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme.secondaryText,
                textAlign: "center",
              }}
            >
              {selectedDate
                ? "No church event scheduled for this date."
                : "No upcoming events available."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
