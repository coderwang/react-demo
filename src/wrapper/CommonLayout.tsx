import LinkAdaptLang from '@/components/LinkAdaptLang';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './CommonLayout.module.less';
import LanguageInterceptor from './LanguageInterceptor';

interface CommonLayoutProps {
	hiddenHeader?: boolean;
	hiddenFooter?: boolean;
}

const CommonLayoutInner: React.FC<CommonLayoutProps> = ({
	hiddenHeader = false,
	hiddenFooter = false,
}) => {
	return (
		<div className={styles.layout}>
			{!hiddenHeader && (
				<header className={styles.header}>
					<ul className={styles.navList}>
						<li className={styles.navItem}>
							<LinkAdaptLang to="/" className={styles.navLink}>
								首页
							</LinkAdaptLang>
						</li>
						<li className={styles.navItem}>
							<LinkAdaptLang to="/list" className={styles.navLink}>
								列表
							</LinkAdaptLang>
						</li>
						<li className={styles.navItem}>
							<LinkAdaptLang to="/about" className={styles.navLink}>
								关于
							</LinkAdaptLang>
						</li>
						<li className={styles.navItem}>
							<LinkAdaptLang to="/profile" className={styles.navLink}>
								个人
							</LinkAdaptLang>
						</li>
					</ul>
				</header>
			)}

			<main className={styles.main}>
				<Outlet />
			</main>

			{!hiddenFooter && (
				<footer className={styles.footer}>© 2025 Your App. All rights reserved.</footer>
			)}
		</div>
	);
};

const CommonLayout: React.FC<CommonLayoutProps> = (props) => {
	return (
		<LanguageInterceptor>
			<CommonLayoutInner {...props} />
		</LanguageInterceptor>
	);
};

export default CommonLayout;
