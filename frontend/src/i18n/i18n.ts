import { createInstance } from 'i18next';
import i18nextMiddleware from 'next-i18next/middleware';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import config from './next-i18next.config.js';

const initI18next = async () => {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language, namespace) =>
          import(`./public/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      ...config,
      lng: 'en',
      fallbackLng: 'en',
    });

  return i18nInstance;
};

export default initI18next;
