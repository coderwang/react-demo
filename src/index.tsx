import './i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AliveScope } from 'react-activation';
import { Provider as JotaiProvider } from 'jotai';
import store from './store';

if (process.env.PACKAGE_ENV !== 'prod') {
	import('eruda').then((eruda) => eruda.default.init());
}

const BigSpinner: React.FC = () => <div>Loading...</div>;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	// <React.StrictMode> // 严格模式下，某些生命周期钩子会执行两次
	<JotaiProvider store={store}>
		<AliveScope>
			<RouterProvider router={router} fallbackElement={<BigSpinner />} />
		</AliveScope>
	</JotaiProvider>,
	// </React.StrictMode>,
);
