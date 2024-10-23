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

i18n.use(initReactI18next).init({
	resources,
	lng: navigator.language.substring(0, 2) === 'zh' ? 'zh' : 'en', // 默认语言
	fallbackLng: 'en', // 兜底语言
	defaultNS: 'translation', // 默认命名空间
	interpolation: {
		escapeValue: false, // 无需转移，react已是xss安全
	},
});
