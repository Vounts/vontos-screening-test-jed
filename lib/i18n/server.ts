import i18next from "i18next";
import Backend from "i18next-fs-backend";
import path from "path";

let instance: typeof i18next | null = null;

export async function getI18n(locale: string) {
  if (!instance) {
    instance = i18next.createInstance();
    await instance.use(Backend).init({
      lng: locale,
      fallbackLng: "en",
      ns: ["common"],
      defaultNS: "common",
      interpolation: { escapeValue: false },
      backend: {
        loadPath: path.resolve("./public/locales/{{lng}}/{{ns}}.json"),
      },
    });
  } else {
    await instance.changeLanguage(locale);
  }

  return instance.t.bind(instance);
}
