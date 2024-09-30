import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../App';
import KeepAlive from 'react-activation';

const Home = lazy(() => import('@/pages/home'));
const About = lazy(() => import('@/pages/about'));
const Profile = lazy(() => import('@/pages/profile'));
const List = lazy(() => import('@/pages/list'));

const Loading = () => <div>加载中...</div>;

const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<Loading />}>
						<Home />
					</Suspense>
				),
			},
			{
				path: 'list',
				element: (
					<Suspense fallback={<Loading />}>
						<List />
					</Suspense>
				),
			},
			{
				path: 'about',
				element: (
					<KeepAlive saveScrollPosition="screen">
						<Suspense fallback={<Loading />}>
							<About />
						</Suspense>
					</KeepAlive>
				),
			},
			{
				path: 'profile',
				element: (
					<Suspense fallback={<Loading />}>
						<Profile />
					</Suspense>
				),
			},
		],
	},
];

const router = createBrowserRouter(routes);

export default router;
