import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en/translation.json";
import translationKo from "./locales/ko/translation.json";
import translationJp from "./locales/jp/translation.json";

const resource = {
    en: {
        translation: translationEn,
    },
    ko: {
        translation: translationKo,
    },
    jp: {
        translation: translationJp,
    },
};
i18n.use(initReactI18next).init({
    resources: resource,
    lng: "ko",
    fallbackLng: "ko",
    debug: true,
    keySeparator: false,
    interpolation: { escapeValue: false },
});

export default i18n;