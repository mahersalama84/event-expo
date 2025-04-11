import { BaseBottomSheetProvider } from "@/context/BaseBottomSheetContext";
import { BaseThemeProvider } from "@/context/BaseThemeContext";
import { SessionProvider } from "@/context/BaseAuthContext";
import CustomToast from "@/utilities/toast/CustomToast";
import { Slot, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { ToastProvider } from "react-native-toast-notifications";
import { useLanguageStore } from "@/stores/LanguageStore";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "tabs/home",
};

function RootLayoutNav() {
  const isRTL = useLanguageStore((state) => state.isRTL);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <BaseThemeProvider>
          <ToastProvider
            duration={1500}
            animationDuration={200}
            animationType="zoom-in"
            placement="bottom"
            swipeEnabled={true}
            renderToast={(toastOptions) => (
              <CustomToast toastOptions={toastOptions} />
            )}
          >
            <BaseBottomSheetProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  // animation: isRTL ? "slide_from_left" : "slide_from_right",
                  animation: "fade_from_bottom",
                }}
              />
            </BaseBottomSheetProvider>
          </ToastProvider>
        </BaseThemeProvider>
      </SessionProvider>
    </GestureHandlerRootView>
  );
}
const RootLayout = () => {
  return <RootLayoutNav />;
};

export default RootLayout;
