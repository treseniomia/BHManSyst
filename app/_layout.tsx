import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    // Ito ang kailangang wrapper para sa Portal at Modal
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="room-details" />
      </Stack>
    </PaperProvider>
  );
}
