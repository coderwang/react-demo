import React from 'react';
import avatar from 'assets/images/avatar.png';
import { ReactComponent as Clock } from 'assets/svg/clock.svg';
import styles from './index.less';
import { useAtomValue } from 'jotai';
import { messageAtom } from '../home/store';
import store from '@/store';

const Page = () => {
	const message = useAtomValue(messageAtom);

	return (
		<div className={styles.page}>
			<p>收到的message: {message}</p>
			<button onClick={() => store.set(messageAtom, '')}>重置message</button>
			<br />
			<img className="avatar" src={avatar} alt="" />
			<br />
			<Clock className="clock" />
		</div>
	);
};

export default Page;
