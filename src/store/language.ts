import { LanguageEnum } from '@/consts/enum';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const getDefaultLang = () => {
	return navigator.language.substring(0, 2) === 'zh' ? LanguageEnum.ZH : LanguageEnum.EN;
};

// 根据 单一真相来源（Single Source of Truth）原则，localStorage 只记录语言偏好，不作为标签页间的同步机制
// 创建一个不监听 storage 事件的自定义 storage
const createNoSyncStorage = () => {
	const storage = createJSONStorage<LanguageEnum>(() => localStorage);

	return {
		...storage,
		// 重写 subscribe 方法，返回一个空的取消订阅函数
		subscribe: (
			_key: string,
			_callback: (value: LanguageEnum) => void,
			_initialValue: LanguageEnum,
		) => {
			// 不监听 storage 事件，避免跨标签页同步
			return () => {}; // 返回空的取消订阅函数
		},
	};
};

export const languageAtom = atomWithStorage<LanguageEnum>(
	'__react-demo-language',
	getDefaultLang(),
	createNoSyncStorage(),
	{
		getOnInit: true,
	},
);
