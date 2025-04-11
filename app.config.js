import "dotenv/config";

export default {
  expo: {
    name: "Eveky",
    userInterfaceStyle: "automatic",
    scheme: "Eveky",
    slug: "Eveky",
    privacy: "unlisted",
    version: "0.0.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    assetBundlePatterns: ["**/*"],
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/ff676656-662f-4905-b59f-3c42712cc7f6",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "ios.com.itik.eveky",
      buildNumber: "1",
    },
    android: {
      package: "android.com.itik.eveky",
      googleServicesFile: "./google-services.json",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        "VIBRATION",
        "NOTIFICATIONS",
        "USER_FACING_NOTIFICATIONS",
        "RECEIVE_BOOT_COMPLETED",
      ],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      [
        "expo-build-properties",
        {
          android: {
            minSdkVersion: 23,
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            buildToolsVersion: "34.0.0",
          },
          ios: {
            deploymentTarget: "13.4",
          },
        },
      ],
      [
        "expo-notifications",
        {
          icon: "./assets/images/notification.png",
          color: "#ffffff",
          mode: "production",
          sounds: [],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "ff676656-662f-4905-b59f-3c42712cc7f6",
        supportsRTL: true,
      },
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
  },
};
