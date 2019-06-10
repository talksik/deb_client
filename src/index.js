import React from 'react';
import ReactDOM from 'react-dom';
const envVars = require('config');
import Root from './components/Root';

import { storePersistorConfig, history } from './helpers';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#009688' }, // classic teal
		submit: { main: '#4caf50' },
		secondary: { main: '#9E9E9E' }, // greyish text color
		error: { main: '#F44336' } // red
	},
	typography: { useNextVariants: true }
});

var config = storePersistorConfig();

// TODO: adding back in redux-persist? <PersistGate loading={null} persistor={config.persistor}>
// after Provider, before StripeProvider

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Provider store={config.store}>
			<PersistGate loading={null} persistor={config.persistor}>
				<Router history={history}>
					<Root />
				</Router>
			</PersistGate>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('app')
);

module.hot.accept();
