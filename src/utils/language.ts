import { LanguageEnum } from '@/consts/enum';
import { To } from 'react-router-dom';

export const getAdaptLangPath = (to: To, language: LanguageEnum) => {
	if (typeof to === 'string') {
		if (to === '/' || Object.values(LanguageEnum).some((item) => to.startsWith(`/${item}`))) {
			return to;
		}
		return `/${language}${to}`;
	}

	if (to.pathname) {
		if (
			to.pathname === '/' ||
			Object.values(LanguageEnum).some((item) => to.pathname?.startsWith(`/${item}`))
		) {
			return to;
		}
		return {
			...to,
			pathname: `/${language}${to.pathname}`,
		};
	}

	return to;
};
