import React, { Component } from 'react';
import styles from './root.less';

const envVars = require('config');

import { GoogleLogin } from 'react-google-login';

class MainCommand extends Component {
  state = {
    googleAccessToken: null
  };

  initClient = () => {
    gapi.client
      .init({
        apiKey: envVars.GOOGLE_API_KEY,
        clientId: envVars.OAUTH2_CLIENT_ID,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
        ],
        scope: 'profile email https://mail.google.com/'
      })
      .then(
        function() {
          // Listen for sign-in state changes.
          console.log(gapi.auth2.getAuthInstance());
        },
        function(error) {
          appendPre(JSON.stringify(error, null, 2));
        }
      );
  };

  componentWillMount() {
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          apiKey: envVars.GOOGLE_API_KEY,
          clientId: envVars.OAUTH2_CLIENT_ID,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
          ],
          scope: 'profile email https://mail.google.com/'
        })
        .then(
          function() {
            console.log('properly initialized gapi and client and auth2');
            gapi.auth2
              .getAuthInstance()
              .signIn()
              .then(() => {
                gapi.client.gmail.users.labels
                  .list({
                    userId: 'me'
                  })
                  .then(function(response) {
                    var labels = response.result.labels;
                    console.log(labels);
                  });

                // var messageRequest = gapi.client.gmail.users.messages.get({
                //   userId: 'me',
                //   id: '16b854db03a69932',
                //   format: 'full'
                // });
                // messageRequest.execute(function(response) {
                //   console.log(response);
                // });
                gapi.client.gmail.users.messages
                  .send({
                    userId: 'me',
                    requestBody: {
                      // same response with any of these
                      raw: reallyEncodedMessage
                      // raw: encodedMessage
                      // raw: message
                    }
                  })
                  .then(function() {
                    console.log('done!');
                  });
              });
          },
          function(error) {
            appendPre(JSON.stringify(error, null, 2));
          }
        );
    });
  }

  render() {
    const responseGoogle = response => {
      console.log(response);
      this.setState({ googleAccessToken: response.accessToken }, () =>
        console.log(this.state)
      );
    };

    const { googleAccessToken } = this.state;
    return (
      <div className={styles.searchCont}>
        {googleAccessToken == null ? null : ( //   /> //     scope={'https://mail.google.com/'} //     cookiePolicy={'single_host_origin'} //     onFailure={responseGoogle} //     onSuccess={responseGoogle} //     buttonText="Login" //     clientId={envVars.OAUTH2_CLIENT_ID} //   <GoogleLogin
          <React.Fragment>
            <div className={styles.commandIcon}>
              <img className={styles.icon} src={envVars.DEFAULT_LOGO} />
            </div>
            <input
              className={styles.searchBar}
              placeholder="Do Everything You Want"
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MainCommand;
