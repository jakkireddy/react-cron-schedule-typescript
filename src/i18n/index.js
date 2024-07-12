import i18n from "i18next";
import {initReactI18next} from "react-i18next";
// import HttpBackend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "./locales/en/translations.json";
import ruTranslations from "./locales/ru/translations.json";

export const LANGUAGES = [
    {label: "Русский", code: "ru"},
    {label: "English", code: "en"},
];

i18n.use(initReactI18next)
    // .use(HttpBackend)
    // .use(LanguageDetector)
    .init({
        lng: "ru",
        fallbackLng: "en",
        // debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {translation: enTranslations},
            ru: {translation: ruTranslations},
        },
    });

export default i18n;
