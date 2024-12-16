import React, { lazy, Suspense } from 'react';
import KeepAlive from 'react-activation';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../App';

const Home = lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home'));
const About = lazy(() => import(/* webpackChunkName: "about" */ '@/pages/about'));
const Profile = lazy(() => import(/* webpackChunkName: "profile" */ '@/pages/profile'));
const List = lazy(() => import(/* webpackChunkName: "list" */ '@/pages/list'));

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
