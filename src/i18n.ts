import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import enStrings from "@/constants/translations/en.json";

// the translations
const resources = {
  en: { translation: enStrings },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { i18n };
