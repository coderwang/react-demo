import store from '@/store';
import avatar from 'assets/images/avatar.png';
import { ReactComponent as Clock } from 'assets/svg/clock.svg';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { messageAtom } from '../home/store';
import styles from './index.module.less';

const Page = () => {
	const navigate = useNavigate();
	const message = useAtomValue(messageAtom);

	return (
		<div className={styles.page}>
			<h2>个人页</h2>
			<p>收到的message: {message}</p>
			<button onClick={() => store.set(messageAtom, '')}>重置message</button>
			<img className="avatar" src={avatar} alt="" />
			<Clock width={75} height={75} />
			<div>
				<button onClick={() => navigate('/404')}>跳转到404</button>
			</div>
		</div>
	);
};

export default Page;
