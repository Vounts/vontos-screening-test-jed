import i18next from "i18next";
import HttpBackend from "i18next-http-backend";

let instance: typeof i18next | null = null;

export async function getI18n(locale: string) {
  if (!instance) {
    instance = i18next.createInstance();
    await instance.use(HttpBackend).init({
      lng: locale,
      fallbackLng: "en",
      ns: ["common"],
      defaultNS: "common",
      interpolation: { escapeValue: false },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json", // served from /public
      },
    });
  } else {
    await instance.changeLanguage(locale);
  }

  return instance.t.bind(instance);
}
