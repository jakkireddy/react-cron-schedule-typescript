import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(HttpBackend)
    // .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;



// import i18n from "i18next";
// import {initReactI18next} from "react-i18next";
//
//
// export const LANGUAGES = [
//     {label: "Русский", code: "ru"},
//     {label: "English", code: "en"},
// ];
//
// i18n.use(initReactI18next).init({
//     fallbackLng: "ru",
//     lng: "ru",
//     interpolation: {
//         escapeValue: false,
//     },
//
//     resources: {
//         ru: {
//             translation: {
//                 additionalOptions: "Additional Options2222",
//             },
//         },
//         en: {
//             translation: {
//                 additionalOptions: "Additional Options3333",
//             },
//         },
//     },
// });
//
// export default i18n;
