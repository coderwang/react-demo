import React, { useState } from 'react';

const About: React.FC = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
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
		</div>
	);
};

export default About;
