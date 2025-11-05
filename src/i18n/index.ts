import store from '@/store';
import { languageAtom } from '@/store/language';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enResource from './locales/en.json';
import zhResource from './locales/zh.json';

const resources = {
	en: {
		translation: enResource,
	},
	zh: {
		translation: zhResource,
	},
};

store.sub(languageAtom, () => {
	i18n.changeLanguage(store.get(languageAtom));
});

i18n.use(initReactI18next).init({
	resources,
	lng: store.get(languageAtom), // 默认语言
	fallbackLng: 'en', // 兜底语言
	defaultNS: 'translation', // 默认命名空间
	interpolation: {
		escapeValue: false, // 无需转移，react已是xss安全
	},
});
