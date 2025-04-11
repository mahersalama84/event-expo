import { useLanguageStore } from "@/stores/LanguageStore";
import { Stack } from "expo-router";

const FriendsLayout = () => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: isRTL ? "slide_from_left" : "slide_from_right",
      }}
    >
      <Stack.Screen name="followers" />
      <Stack.Screen name="followings" />
      <Stack.Screen name="search" />
      <Stack.Screen name="followings_occasions" />
      <Stack.Screen name="search_occasions" />
    </Stack>
  );
};
export default FriendsLayout;
