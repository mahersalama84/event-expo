import { useLanguageStore } from "@/stores/LanguageStore";
import { Stack } from "expo-router";

const CustomerDetailsScreenDetails = () => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: isRTL ? "slide_from_left" : "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};
export default CustomerDetailsScreenDetails;
