import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import pt_BR from "./pt_BR.json";

const resources = {
  en,
  pt_BR,
};

export const LANGUAGE = "language";

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    detection: {
      lookupLocalStorage: LANGUAGE
    },
    compatibilityJSON: "v3",
    resources,
    lng: localStorage.getItem(LANGUAGE) ?? "pt_BR",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

  export default i18n;
