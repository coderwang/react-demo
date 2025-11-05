import { LanguageEnum } from '@/consts/enum';
import { langAtom } from '@/store/lang';
import { useAtom } from 'jotai';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
	const { t } = useTranslation();
	const [lang, setLang] = useAtom(langAtom);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				padding: '20px',
			}}
		>
			<h2>列表页</h2>
			<button
				onClick={() => {
					setLang(lang === LanguageEnum.EN ? LanguageEnum.ZH : LanguageEnum.EN);
				}}
			>
				switch lang
			</button>
			<p>{t('i18n_text')}</p>
		</div>
	);
};

export default Page;
