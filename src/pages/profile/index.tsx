import React from 'react';
import avatar from 'assets/images/avatar.png';
import { ReactComponent as Clock } from 'assets/svg/clock.svg';

const Page = () => {
	return (
		<div>
			<img src={avatar} alt="" />
			<br />
			<Clock />
		</div>
	);
};

export default Page;
