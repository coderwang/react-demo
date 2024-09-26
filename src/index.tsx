import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/App.less';

const BigSpinner: React.FC = () => <div>Loading...</div>;

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} fallbackElement={<BigSpinner />} />
	</React.StrictMode>
);
