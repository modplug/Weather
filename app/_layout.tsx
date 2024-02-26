import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { SettingsProvider } from "../contexts/SettingsProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SFCompact: require("../assets/fonts/SF-Compact-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SettingsProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "transparent" },
          contentStyle: { backgroundColor: "beige" },
          headerTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerTintColor: "black",
          headerRight: () => (
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={() => router.push("/settings")}
            >
              <FontAwesome name="cog" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          options={{ presentation: "modal", headerShown: false }}
          name="settings"
        />
      </Stack>
    </SettingsProvider>
  );
}
