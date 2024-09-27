import React from 'react';
import avatar from 'assets/images/avatar.png';
import { ReactComponent as Clock } from 'assets/svg/clock.svg';
import styles from './index.less';

const Page = () => {
	return (
		<div className={styles.page}>
			<img className="avatar" src={avatar} alt="" />
			<br />
			<Clock className="clock" />
		</div>
	);
};

export default Page;
