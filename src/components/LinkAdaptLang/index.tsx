import { languageAtom } from '@/store/language';
import { getAdaptLangPath } from '@/utils/language';
import { useAtomValue } from 'jotai';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const LinkAdaptLang: React.FC<React.PropsWithChildren<LinkProps>> = (props) => {
	const { children, to, ...rest } = props;
	const language = useAtomValue(languageAtom);
	let newTo = getAdaptLangPath(to, language);

	return (
		<Link to={newTo} {...rest}>
			{children}
		</Link>
	);
};

export default LinkAdaptLang;
