const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sat'],
    localeDetection: false,
  },
  ns: ['common', 'categories', 'nav'],
  defaultNS: 'common',
  localePath: path.resolve('./public/locales'),
  interpolation: {
    escapeValue: false,
  },
};
