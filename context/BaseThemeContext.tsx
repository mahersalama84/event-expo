import Colors from "@/constants/Colors";
import { getThemeColorType } from "@/types/general";
import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { useToast } from "react-native-toast-notifications";

export const BaseThemeContext = createContext<{
  theme: string;
  toggleTheme: (newTheme: string) => void;
  useSystemTheme: () => void;
  getThemeColor: getThemeColorType;
}>({
  theme: "light",
  toggleTheme: (newTheme: string) => null,
  useSystemTheme: () => null,
  getThemeColor: (color: string) => "transparent",
});

export function useBaseTheme() {
  const theme = useContext(BaseThemeContext);
  return theme;
}

export const BaseThemeProvider = (props: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<string>(colorScheme || "light");
  const toast = useToast();

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await SecureStore.getItemAsync("theme");
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error: any) {
        toast.show(error, { type: "danger" });
      }
    };
    getTheme();
  }, []);

  useEffect(() => {
    if (colorScheme) {
      setTheme(colorScheme);
    }
  }, [colorScheme]);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    SecureStore.setItemAsync("theme", newTheme);
  };

  const getThemeColor = (color: string) => {
    return Colors[theme ?? "light"][color];
  };

  const useSystemTheme = () => {
    if (colorScheme) {
      setTheme(colorScheme);
      SecureStore.setItemAsync("theme", colorScheme);
    }
  };

  return (
    <BaseThemeContext.Provider
      value={{ theme, toggleTheme, useSystemTheme, getThemeColor }}
    >
      {props.children}
    </BaseThemeContext.Provider>
  );
};
