import { Stack } from "expo-router";
import "@/global.css";
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Bu yerda header’ni butun ilova uchun o‘chiradi
      }}
    />
  );
}
