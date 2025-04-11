import { useLanguageStore } from "@/stores/LanguageStore";
import { Stack } from "expo-router";

const AuthLayout = () => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: isRTL ? "slide_from_left" : "slide_from_right",
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="tcs" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="signup" />
    </Stack>
  );
};
export default AuthLayout;
