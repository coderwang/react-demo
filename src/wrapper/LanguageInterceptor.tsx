import { LanguageEnum } from '@/consts/enum';
import { languageAtom } from '@/store/language';
import { useAtom } from 'jotai';
import React, { useLayoutEffect } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

const LanguageInterceptor: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { lang } = useParams();
	const [language, setLanguage] = useAtom(languageAtom);
	const location = useLocation();

	useLayoutEffect(() => {
		if (
			lang &&
			Object.values(LanguageEnum).includes(lang as LanguageEnum) &&
			language !== (lang as LanguageEnum)
		) {
			setLanguage(lang as LanguageEnum);
		}
	}, [lang, language, setLanguage]);

	if (!lang) return <>{children}</>;

	if (Object.values(LanguageEnum).includes(lang as LanguageEnum)) {
		return <>{children}</>;
	}

	return (
		<Navigate
			to={{
				pathname: `/${language}${location.pathname}`,
				search: location.search,
				hash: location.hash,
			}}
			replace
		/>
	);
};

export default LanguageInterceptor;
