import CommonLayout from '@/wrapper/CommonLayout';
import React, { lazy, Suspense } from 'react';
import KeepAlive from 'react-activation';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

const Home = lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home'));
const About = lazy(() => import(/* webpackChunkName: "about" */ '@/pages/about'));
const Profile = lazy(() => import(/* webpackChunkName: "profile" */ '@/pages/profile'));
const List = lazy(() => import(/* webpackChunkName: "list" */ '@/pages/list'));

const NotFound = lazy(() => import(/* webpackChunkName: "notFound" */ './404'));

const Loading = () => <div>加载中...</div>;

const routes: RouteObject[] = [
	{
		path: '/',
		element: <CommonLayout />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<Loading />}>
						<Home />
					</Suspense>
				),
			},
		],
	},
	{
		path: '/:lang',
		element: <CommonLayout />,
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
	{
		path: '/:lang',
		element: <CommonLayout hiddenHeader hiddenFooter />,
		children: [
			{
				path: '404',
				element: (
					<Suspense fallback={<Loading />}>
						<NotFound />
					</Suspense>
				),
			},
		],
	},
	{
		path: '/:lang',
		element: <CommonLayout hiddenHeader hiddenFooter />,
		children: [
			{
				path: '*',
				element: (
					<Suspense fallback={<Loading />}>
						<NotFound />
					</Suspense>
				),
			},
		],
	},
];

const router = createBrowserRouter(routes);

export default router;
