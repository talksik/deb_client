import React from 'react';
import styles from './root.less';

const envVars = require('config');

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';

const TipCard = props => {
  const bull = <span>•</span>;

  return (
    <Card className={styles.tipCard}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Commands
        </Typography>

        <Typography variant="h6" component="h2">
          Google
        </Typography>
        <Typography variant="body2" component="p">
          By default, any search + enter button will search on Google.
        </Typography>

        <Typography variant="h6" component="h2">
          Gmail
        </Typography>
        <Typography variant="body2" component="p">
          Type in the command 'gmail' and follow instructions to send a quick
          email.
        </Typography>

        <Typography variant="h6" component="h2">
          Youtube
        </Typography>
        <Typography variant="body2" component="p">
          Type in 'ubute' and it will go straight to the search
        </Typography>

        <br />

        <Typography variant="body2" component="i">
          Backspace to get rid of activated command.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TipCard;
