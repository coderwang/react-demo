import React, { useState } from 'react';
import { useActivate, useUnactivate } from 'react-activation';
import { useNavigate } from 'react-router-dom';
import styles from './index.less';

const About: React.FC = () => {
	const navigate = useNavigate();
	const [count, setCount] = useState(0);

	useActivate(() => {
		console.log('🚀🚀🚀 缓存的路由被激活~~');
	});

	useUnactivate(() => {
		console.log('🚀🚀🚀 离开时，路由被缓存~~');
	});

	return (
		<div className={styles.page}>
			<h2>关于我们</h2>
			<p>这是一个使用React + TypeScript + Less + Webpack构建的项目。</p>
			<div>count: {count}</div>
			<button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				count++
			</button>
			<div className="whiteBox" />
			<button
				onClick={() => {
					navigate('/');
				}}
			>
				jump to home
			</button>
		</div>
	);
};

export default About;
