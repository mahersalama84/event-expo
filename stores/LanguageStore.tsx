import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { I18nManager } from "react-native";
import { create } from "zustand";

type LanguageStore = {
  language: string;
  isRTL: boolean;
  changeLanguage: (value: string) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "en",
  isRTL: false,
  changeLanguage: (value) => {
    const languageIsRTL = value === "ar" ? true : false;

    const saveData = async () => {
      try {
        i18next.changeLanguage(value);
        await AsyncStorage.setItem("LANGUAGE", value);
        I18nManager.allowRTL(languageIsRTL);
        I18nManager.forceRTL(languageIsRTL);
        I18nManager.isRTL = languageIsRTL;
      } catch (error) {
        console.log("err in saving data", error);
      }
    };
    saveData();
    set({ language: value, isRTL: languageIsRTL });
  },
}));
