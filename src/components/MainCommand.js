import React, { Component } from 'react';
import styles from './root.less';

const envVars = require('config');

import { GoogleLogin } from 'react-google-login';

import { Button, Card, Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';

import { ToastsContainer, ToastsStore } from 'react-toasts';

// Old notification elem for manual use
// const notification = (
//   <Card id="notification" className={styles.notificationCont}>
//     <Typography variant="overline" color="inherit">
//       Successfully executed command!
//     </Typography>
//   </Card>
// );

const INITIAL_COMMAND_STATE = {
  command: 'google',
  commandInput: '',
  commandIcon:
    envVars.DEFAULT_LOGO != null
      ? envVars.DEFAULT_LOGO
      : 'https://s3-us-west-1.amazonaws.com/charify-assets/defaultLogo.png',
  commandInputPlaceholder: 'Do Everything You Want',
  commandComplete: false,
  commandProcessedData: null,

  needGoogleAuth: false
};

class MainCommand extends Component {
  state = {
    googleAccessToken: null,
    googleAuthUser: null,
    ...INITIAL_COMMAND_STATE
  };

  componentWillMount() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: envVars.GOOGLE_API_KEY,
        clientId: envVars.OAUTH2_CLIENT_ID,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
        ],
        scope: 'profile email https://mail.google.com/'
      });
      // .then(
      //   function() {
      //     console.log('properly initialized gapi and client and auth2');
      //     gapi.auth2
      //       .getAuthInstance()
      //       .signIn()
      //       .then(() => {
      //         // getting all messages example
      //         // var messageRequest = gapi.client.gmail.users.messages.get({
      //         //   userId: 'me',
      //         //   id: '16b854db03a69932',
      //         //   format: 'full'
      //         // });
      //         // messageRequest.execute(function(response) {
      //         //   console.log(response);
      //         // });

      //       });
      //   },
      //   function(error) {
      //     appendPre(JSON.stringify(error, null, 2));
      //   }
      // );
    });
  }

  componentDidMount() {
    this.mainBar.focus();
  }

  googleSignIn = async e => {
    await console.log('Going through sign in flow');
    const signInResponse = await gapi.auth2.getAuthInstance().signIn();

    await console.log('Sign in response', signInResponse);

    this.setState({
      googleAccessToken: signInResponse.Zi.access_token,
      googleAuthUser: signInResponse.w3,
      commandComplete: true
    });
  };

  handleInputKeyDown = e => {
    var input = e.target.value;

    if (e.key === 'Enter' && this.state.commandComplete)
      this.handleSubmitCommand(e);
    else if ((e.key === 'Backspace' || e.key === 'Delete') && input == '') {
      console.log('Clearing out command');
      this.setState(INITIAL_COMMAND_STATE);
    }
  };

  handleInputChange = e => {
    var newInput = e.target.value;
    var newCommand = this.state.command;
    var newCommandIcon = this.state.commandIcon;
    var newCommandInputPlaceholder = this.state.commandInputPlaceholder;
    var newCommandComplete = this.state.commandComplete;
    var newCommandProcessedData = this.state.commandProcessedData;
    var newNeedGoogleAuth = this.state.needGoogleAuth;

    // initial finding that command was entered
    // TODO: helper function to properly change properties
    if (newInput.includes('gmail') && newCommandIcon == envVars.DEFAULT_LOGO) {
      newCommand = 'gmail';
      newCommandIcon =
        'https://image.flaticon.com/icons/png/512/281/281769.png';
      newInput = newInput.replace('gmail', '');
      newCommandInputPlaceholder = 'to | subject | message';
      newNeedGoogleAuth = true;
    } else if (
      newInput.includes('utube') &&
      newCommandIcon == envVars.DEFAULT_LOGO
    ) {
      newCommand = 'utube';
      newCommandIcon =
        'https://cdn2.iconfinder.com/data/icons/micon-social-pack/512/youtube-512.png';
      newInput = newInput.replace('utube', '');
      newCommandComplete = true;
      newCommandInputPlaceholder = 'search for any video';
    } else if (
      newInput.includes('red') &&
      newCommandIcon == envVars.DEFAULT_LOGO
    ) {
      newCommand = 'reddit';
      newCommandIcon =
        'https://cdn0.iconfinder.com/data/icons/social-media-2092/100/social-36-512.png';
      newInput = newInput.replace('red', '');
      newCommandComplete = true;
      newCommandInputPlaceholder = 'search for any subreddit';
    } else if (newCommand == 'google') {
      newCommand = 'google';
      newCommandComplete = true;
      newCommandInputPlaceholder = 'search for anything';
    }

    if (newCommand == 'gmail') {
      // TODO: helper function to check if input complete for current command and show submit button
      const gmailSendParts = newInput.split('|');
      if (gmailSendParts.length == 3) {
        newCommandComplete = true;
        newCommandProcessedData = gmailSendParts;
      }
    }

    if (newNeedGoogleAuth) {
      // Make the user go through google sign in
      this.googleSignIn();
    }

    this.setState({
      command: newCommand,
      commandInput: newInput,
      commandIcon: newCommandIcon,
      commandInputPlaceholder: newCommandInputPlaceholder,
      commandComplete: newCommandComplete,
      commandProcessedData: newCommandProcessedData
    });
  };

  handleSubmitCommand = e => {
    // TODO: make executing api calls modular with helpers/services
    const processedData = this.state.commandProcessedData;

    console.log(this.state.command);
    if (this.state.command == 'gmail') {
      const message =
        `From: ${this.state.googleAuthUser.U3}\r\n` +
        `To: ${processedData[0]}\r\n` +
        `Subject: ${processedData[1]}\r\n\r\n` +
        `${processedData[2]}`;
      // The body needs to be base64url encoded.
      const encodedMessage = btoa(message);
      const reallyEncodedMessage = encodedMessage
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      var sendEmail = gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: {
          // same response with any of these
          raw: reallyEncodedMessage
          // raw: encodedMessage
          // raw: message
        }
      });
      sendEmail.execute(function(response) {
        console.log('Sent the Email!', response);
      });
    } else if (this.state.command == 'google') {
      window.open(
        'https://www.google.com/search?q=' + this.state.commandInput,
        '_blank'
      );
    } else if (this.state.command == 'utube') {
      window.open(
        'https://www.youtube.com/results?search_query=' +
          this.state.commandInput,
        '_blank'
      );
    } else if (this.state.command == 'reddit') {
      window.open(
        'https://www.reddit.com/r/' + this.state.commandInput,
        '_blank'
      );
    }

    this.setState(INITIAL_COMMAND_STATE, () => {
      console.log(this.state);
      ToastsStore.success('Successfully executed command!');
    });
  };

  render() {
    const {
      googleAccessToken,
      commandInput,
      commandInputPlaceholder,
      commandIcon,
      commandComplete
    } = this.state;

    return (
      <div className={styles.searchCont}>
        {/* Google Sign In button */}
        {/* <div
            className={[styles.googleButton, styles.hidden].join(' ')}
            onClick={this.googleSignIn}
          >
            <img
              className={styles.googleLogo}
              width="20px"
              alt='Google "G" Logo'
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            Login with Google
          </div> */}

        <React.Fragment>
          <img className={styles.commandIcon} src={commandIcon} />
          <input
            ref={input => {
              this.mainBar = input;
            }}
            value={commandInput}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
            className={styles.searchBar}
            placeholder={commandInputPlaceholder}
          />
        </React.Fragment>

        {commandComplete && (
          <Button
            variant="contained"
            color="primary"
            className={styles.submitButton}
            onClick={this.handleSubmitCommand}
          >
            Send
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <Send />
          </Button>
        )}

        <ToastsContainer
          store={ToastsStore}
          position={'TOP_RIGHT'}
          className={styles.notificationCont}
        />
      </div>
    );
  }
}

export default MainCommand;
