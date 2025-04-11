import { useLanguageStore } from "@/stores/LanguageStore";
import { Stack } from "expo-router";

const HomeLayout = () => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: isRTL ? "slide_from_left" : "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="search" />
    </Stack>
  );
};
export default HomeLayout;
