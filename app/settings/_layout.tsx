import { Stack } from "expo-router";

export const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen options={{ presentation: "modal" }} name="modal" />
    </Stack>
  );
};
