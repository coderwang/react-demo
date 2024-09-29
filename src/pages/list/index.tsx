import React from 'react';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
	const { t, i18n } = useTranslation();

	return (
		<div>
			<button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}>
				switch lang
			</button>
			<p>{t('i18n_text')}</p>
		</div>
	);
};

export default Page;
