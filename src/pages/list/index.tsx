import { LanguageEnum } from '@/consts/enum';
import { languageAtom } from '@/store/language';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Page: React.FC = () => {
	const { t } = useTranslation();
	const language = useAtomValue(languageAtom);
	const navigate = useNavigate();

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
					navigate(`/${language === LanguageEnum.EN ? LanguageEnum.ZH : LanguageEnum.EN}/list`);
				}}
			>
				switch lang
			</button>
			<p>{t('i18n_text')}</p>
		</div>
	);
};

export default Page;
