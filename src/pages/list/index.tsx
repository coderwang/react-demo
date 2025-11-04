import React from 'react';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
	const { t, i18n } = useTranslation();

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
			<button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}>
				switch lang
			</button>
			<p>{t('i18n_text')}</p>
		</div>
	);
};

export default Page;
