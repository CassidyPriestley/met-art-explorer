import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="artwork/[id]" />
      <Stack.Screen name="department/[id]" />
    </Stack>
  );
}
