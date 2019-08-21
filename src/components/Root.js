import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './root.less';

// import backgroundImage from '../assets/images/mainbg.jpg';

import TipCard from './TipCard';
import MainCommand from './MainCommand';
import AvailableCommandsIcons from './AvailableCommandsIcons';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Root = props => {
  //dynamically getting particular bg
  var bgNum = getRandomInt(5);
  const images = require.context('../assets/images', true);
  let bgImg = images('./mainbg' + bgNum + '.jpg');

  return (
    <React.Fragment>
      {/* Toast for notifications */}

      <div className={styles.mainCont}>
        <TipCard />

        <MainCommand />

        <AvailableCommandsIcons />

        <img className={styles.backgroundImage} src={bgImg} />
      </div>

      <Switch />
    </React.Fragment>
  );
};

export default Root;
