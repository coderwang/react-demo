import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// 可选：记录404错误到分析工具
	useEffect(() => {
		console.warn('404 Page Not Found:', location.pathname);
		// 如果使用分析工具，可以在这里上报
		// analytics.track('404_error', { path: location.pathname });
	}, [location.pathname]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '16px',
				minHeight: '100vh',
				padding: '20px',
				textAlign: 'center',
			}}
		>
			<h1 style={{ fontSize: '72px', margin: 0 }}>404</h1>
			<p style={{ fontSize: '20px', color: '#666' }}>页面未找到</p>
			<p style={{ fontSize: '14px', color: '#999' }}>
				您访问的页面 <code>{location.pathname}</code> 不存在
			</p>
			<div style={{ display: 'flex', gap: '12px' }}>
				<button onClick={() => navigate('/')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
					返回首页
				</button>
				<button onClick={() => navigate(-1)} style={{ padding: '10px 20px', cursor: 'pointer' }}>
					返回上一页
				</button>
			</div>
		</div>
	);
};

export default NotFound;
