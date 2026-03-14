import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import { messagesEn as en, messagesFr as fr } from "@leafready/core";

export type Locale = "en" | "fr";

const i18n = new I18n({ en, fr });
i18n.enableFallback = true;
i18n.defaultLocale = "en";

const deviceLocale = getLocales()[0]?.languageCode ?? "en";
i18n.locale = deviceLocale === "fr" ? "fr" : "en";

export function setLocale(locale: Locale) {
  i18n.locale = locale;
}

export function getLocale(): Locale {
  return i18n.locale as Locale;
}

export function t(scope: string, options?: Record<string, unknown>): string {
  return i18n.t(scope, options);
}

export default i18n;
