import { LanguageEnum } from '@/consts/enum';
import { atomWithStorage } from 'jotai/utils';

const getDefaultLang = () => {
	return navigator.language.substring(0, 2) === 'zh' ? LanguageEnum.ZH : LanguageEnum.EN;
};

export const langAtom = atomWithStorage<LanguageEnum>(
	'__react-demo-language',
	getDefaultLang(),
	undefined,
	{
		getOnInit: true,
	},
);
