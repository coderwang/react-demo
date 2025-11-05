import { languageAtom } from '@/store/language';
import { getAdaptLangPath } from '@/utils/language';
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { NavigateOptions, To, useNavigate } from 'react-router-dom';

const useNavigateAdaptLang = () => {
	const navigate = useNavigate();
	const language = useAtomValue(languageAtom);

	return useCallback(
		(to: To, options?: NavigateOptions) => {
			navigate(getAdaptLangPath(to, language), options);
		},
		[language, navigate],
	);
};

export default useNavigateAdaptLang;
