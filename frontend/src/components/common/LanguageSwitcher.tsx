'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n, t } = useTranslation('nav');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      code: 'en',
      name: 'English',
      flag: '🇬🇧',
    },
    {
      code: 'sat',
      name: 'ᱥᱟᱱᱛᱟᱞᱤ',
      flag: '🇮🇳',
      note: '(Ol Chiki)',
    },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    // Store preference
    localStorage.setItem('preferredLanguage', langCode);
  };

  const currentLang = languages.find((lang) => lang.code === i18n.language);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={t('language', 'Language')}
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {currentLang?.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              {t('language', 'Language')}
            </p>
          </div>
          <div className="py-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                  i18n.language === lang.code
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <p className="font-medium">{lang.name}</p>
                  {lang.note && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {lang.note}
                    </p>
                  )}
                </div>
                {i18n.language === lang.code && (
                  <svg
                    className="w-5 h-5 ml-auto text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Language Info */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-blue-50 dark:bg-blue-900/20">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              🎯 Santhali (ᱥᱟᱱᱛᱟᱞᱤ) support helps preserve and promote Santhal language and culture.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
