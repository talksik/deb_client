import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return JSON.parse(localStorage.getItem('auth')).userType ==
          rest.userType ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: rest.rejectPath, state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    authentication: state.authentication
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(authActions.login(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
