import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './root.less';

import PrivateRoute from './PrivateRoute';

import backgroundImage from '../assets/images/mainbg.jpg';

const Root = props => {
	return (
		<React.Fragment>
			{/* Toast for notifications */}

			<div className={styles.mainCont}>
				<input
					className={styles.searchBar}
					placeholder="Do Everything You Want"
				/>

				<img className={styles.backgroundImage} src={backgroundImage} />
			</div>

			<Switch />
		</React.Fragment>
	);
};

export default Root;
