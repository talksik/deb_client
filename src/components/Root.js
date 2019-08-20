import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './root.less';

import backgroundImage from '../assets/images/mainbg.jpg';

import TipCard from './TipCard';
import MainCommand from './MainCommand';
import AvailableCommandsIcons from './AvailableCommandsIcons';

const Root = props => {
  return (
    <React.Fragment>
      {/* Toast for notifications */}

      <div className={styles.mainCont}>
        <TipCard />

        <MainCommand />

        <AvailableCommandsIcons />

        <img className={styles.backgroundImage} src={backgroundImage} />
      </div>

      <Switch />
    </React.Fragment>
  );
};

export default Root;
