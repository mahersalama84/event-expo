import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import ar from "./ar.json";
import en from "./en.json";

const resources = {
  en: en,
  ar: ar,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: I18nManager.isRTL ? "ar" : "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
