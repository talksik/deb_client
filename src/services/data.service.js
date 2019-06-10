import axios from 'axios';
const config = require('config');
import { authHeader, history } from '../helpers';
import { authConstants } from '../constants';

// Main data service for api calls
export const dataService = (
  dispatch,
  method,
  endpoint,
  data_params = {},
  data_or_params = true,
  need_auth = false,
  headers = {}
) => {
  const requestOptions = {
    method,
    url: config.server_url + endpoint,
    headers
  };
  data_or_params
    ? (requestOptions.data = data_params)
    : (requestOptions.params = data_params);
  need_auth ? (requestOptions.headers = authHeader()) : {};

  return axios(requestOptions)
    .then(handleResponse)
    .catch(handleError(dispatch));
};

const handleResponse = response => {
  return response.data;
};

const handleError = dispatch => error => {
  // logout user if jwt token expired by clearing storage
  if (error.response.status == 403) {
    localStorage.removeItem('auth');

    //setting have_token to false, and rest = INITIAL_STATE
    dispatch({
      type: authConstants.LOGOUT,
      payload: {
        message: 'Auth unsuccessful for call...logging out'
      }
    });

    history.push('/login');
  }
  throw error.response;
};
