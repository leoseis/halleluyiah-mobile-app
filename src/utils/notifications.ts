// import * as Device from "expo-device";
// // import * as Notifications from "expo-notifications"

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowBanner: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     shouldShowList: true,
//   }),
// });

// // export async function registerForPushNotificationsAsync() {
//   if (!Device.isDevice) {
//     console.log("Must use physical device");
//     return;
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();

//   let finalStatus = existingStatus;

//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();

//     finalStatus = status;
//   }

//   if (finalStatus !== "granted") {
//     console.log("Notification permission denied");
//     return;
//   }

//   const token = await Notifications.getExpoPushTokenAsync();

//   return token.data;
// }

export async function registerForPushNotificationsAsync() {
  console.log("Push notifications disabled for now");
  return null;
}
