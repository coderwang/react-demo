import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home';
import About from '../pages/about';
import Profile from '../pages/profile';
import KeepAlive from 'react-activation';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'about',
				element: (
					<KeepAlive saveScrollPosition="screen">
						<About />
					</KeepAlive>
				),
			},
			{
				path: 'profile',
				element: <Profile />,
			},
		],
	},
];

const router = createBrowserRouter(routes);

export default router;
