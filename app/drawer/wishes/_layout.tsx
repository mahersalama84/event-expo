import { Tabs } from "expo-router";

const WishesDrawerLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
    </Tabs>
  );
};
export default WishesDrawerLayout;
