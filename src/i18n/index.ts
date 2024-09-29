import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './en/common.json';
import zhCommon from './zh/common.json';

const resources = {
	en: {
		common: enCommon,
	},
	zh: {
		common: zhCommon,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: navigator.language.substring(0, 2) === 'zh' ? 'zh' : 'en', // 默认语言
	fallbackLng: 'en', // 兜底语言
	defaultNS: 'common', // 默认命名空间
	interpolation: {
		escapeValue: false, // 无需转移，react已是xss安全
	},
});
