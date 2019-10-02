import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './root.less';

// import backgroundImage from '../assets/images/mainbg.jpg';

import TipCard from './TipCard';
import MainCommand from './MainCommand';
import AvailableCommandsIcons from './AvailableCommandsIcons';

import { Typography, Card, CardContent } from '@material-ui/core';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Root = props => {
  //dynamically getting particular bg
  var bgNum = getRandomInt(5);
  const images = require.context('../assets/images', true);
  // TODO: make it cycle through background images again
  // let bgImg = images('./mainbg' + bgNum + '.jpg');
  let bgImg = images('./mainbg' + 3 + '.jpg');

  return (
    <React.Fragment>
      {/* Toast for notifications */}

      <div className={styles.mainCont}>
        <MainCommand />

        <AvailableCommandsIcons />

        <Card className={styles.directionsCard}>
          <Typography
            variant="overline"
            align="left"
            component="h1"
            color="primary"
          >
            Hover on icons above for commands
          </Typography>
        </Card>

        <img className={styles.backgroundImage} src={bgImg} />
      </div>

      <Switch />
    </React.Fragment>
  );
};

export default Root;
