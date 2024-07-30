import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './src/locales/en.json';
import bn from './src/locales/bn.json';


i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            bn: { translation: bn },
            en: { translation: en }
        },
        lng: 'bn',
        fallbackLng: 'bn',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
