'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return;

    i18next
      .use(initReactI18next)
      .use(
        resourcesToBackend(
          (language: string, namespace: string) =>
            import(`/public/locales/${language}/${namespace}.json`)
        )
      )
      .init({
        fallbackLng: 'en',
        defaultNS: 'common',
        ns: ['common', 'categories', 'nav'],
        interpolation: { escapeValue: false },
        react: {
          useSuspense: false,
        },
      })
      .then(() => {
        // Get saved preference or use browser language
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && (savedLang === 'en' || savedLang === 'sat')) {
          i18next.changeLanguage(savedLang);
        }
        setIsReady(true);
      });
  }, [isReady]);

  if (!isReady) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

export default I18nProvider;
