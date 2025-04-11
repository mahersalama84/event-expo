import { Tabs } from "expo-router";

const OccasionsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen name="index" />
    </Tabs>
  );
};

export default OccasionsLayout;
