import React from 'react';
import styles from './root.less';

const envVars = require('config');

import { Tooltip } from '@material-ui/core';

const AvailableCommandsIcons = props => {
  return (
    <div className={styles.availableCommandsIconsCont}>
      {/* Google Search */}
      <Tooltip title="default search on google">
        <img className={styles.icon} src={envVars.DEFAULT_LOGO} />
      </Tooltip>

      {/* Gmail */}
      <Tooltip title="gmail">
        <img
          className={styles.icon}
          src={'https://image.flaticon.com/icons/png/512/281/281769.png'}
        />
      </Tooltip>

      {/* Reddit */}
      <Tooltip title="red">
        <img
          className={styles.icon}
          src={
            'https://cdn0.iconfinder.com/data/icons/social-media-2092/100/social-36-512.png'
          }
        />
      </Tooltip>

      {/* Youtube */}
      <Tooltip title="utube">
        <img
          className={styles.icon}
          src={
            'https://cdn2.iconfinder.com/data/icons/micon-social-pack/512/youtube-512.png'
          }
        />
      </Tooltip>

      {/* Slack */}
      {/* <img
        className={styles.icon}
        src={
          'https://a.slack-edge.com/4a5c4/marketing/img/meta/slack_hash_256.png'
        }
      /> */}

      {/* Google Maps */}
      {/* <img
        className={styles.icon}
        src={
          'https://travelhoney.com/wp-content/uploads/2017/03/google-maps-for-ios-8-1.png'
        }
      /> */}

      {/* Android Messages */}
      {/* <img
        className={styles.icon}
        src={
          'https://electronjs.org/app-img/android-messages/android-messages-icon-128.png'
        }
      /> */}
    </div>
  );
};

export default AvailableCommandsIcons;
