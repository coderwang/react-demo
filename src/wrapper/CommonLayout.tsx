import React from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import styles from './CommonLayout.module.less';

interface CommonLayoutProps {
	hiddenHeader?: boolean;
	hiddenFooter?: boolean;
}

interface LayoutContext {
	// 可以在这里定义需要传递给子组件的上下文
}

const CommonLayout: React.FC<CommonLayoutProps> = ({
	hiddenHeader = false,
	hiddenFooter = false,
}) => {
	return (
		<div className={styles.layout}>
			{!hiddenHeader && (
				<header className={styles.header}>
					<ul className={styles.navList}>
						<li className={styles.navItem}>
							<Link to="/" className={styles.navLink}>
								首页
							</Link>
						</li>
						<li className={styles.navItem}>
							<Link to="/list" className={styles.navLink}>
								列表
							</Link>
						</li>
						<li className={styles.navItem}>
							<Link to="/about" className={styles.navLink}>
								关于
							</Link>
						</li>
						<li className={styles.navItem}>
							<Link to="/profile" className={styles.navLink}>
								个人
							</Link>
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

export default CommonLayout;

// 导出类型供子组件使用
export type { CommonLayoutProps, LayoutContext };

// 导出 hook 供子组件获取布局上下文
export const useLayout = () => {
	return useOutletContext<LayoutContext>();
};
