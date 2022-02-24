import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-get-random-values";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import * as LambdaClient from "./utils/LambdaClient";
import { ExpoPushToken } from "expo-notifications/src/Tokens.types";
import NameSelectScreen from "./screens/NameSelectScreen";

const CHANNEL_DEFAULT = "default";
const STATUS_GRANTED = "granted";
const PLATFORM_ANDROID = "android";
const INVALID_TOKEN = "invalid";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [userName, setUserName] = useState<string | undefined>();
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();

  useEffect(() => {
    if (userName !== undefined) {
      if (expoPushToken === undefined) {
        registerForPushNotificationsAsync(userName, (token) => {
          console.log(`token: ${token}`);
          setExpoPushToken(token);
        }).then((r) => console.log(r));
      }
    }
  });

  if (!isLoadingComplete) {
    return null;
  } else if (userName === undefined) {
    return <NameSelectScreen setUserName={setUserName} />;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation
          colorScheme={colorScheme}
          userName={userName}
          expoPushToken={expoPushToken}
        />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

const registerForPushNotificationsAsync = async (
  userName: string,
  setExpoPushToken: (a: string) => void
) => {
  console.log(`REGISTERING NEW USER: ${userName}`);
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== STATUS_GRANTED) {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== STATUS_GRANTED) {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token: string = (await Notifications.getExpoPushTokenAsync()).data;
    setExpoPushToken(token);
    LambdaClient.registerUserToken(userName, token);
  } else {
    setExpoPushToken(INVALID_TOKEN);
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === PLATFORM_ANDROID) {
    Notifications.setNotificationChannelAsync(CHANNEL_DEFAULT, {
      name: CHANNEL_DEFAULT,
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};
