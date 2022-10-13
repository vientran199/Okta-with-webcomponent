import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { EventContext, Styled } from 'direflow-component';
import { BrowserRouter as Router, withRouter, Route } from 'react-router-dom'
import { LoginCallback, Security } from '@okta/okta-react';
import {
  toRelativeUrl,
} from '@okta/okta-auth-js';
import main from './oktaConfig';
import Home from './Home';

const App = (props) => {
  console.log('test')
  const { clientId, issuer, redirectUri, history } = props
  const authClient = useMemo(()=> main(clientId, issuer, redirectUri),[])
  
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='app'>
      <Security oktaAuth={authClient} restoreOriginalUri={restoreOriginalUri}>
        <Home />
        <Route path="/login/callback" component={LoginCallback} />
      </Security>
    </div>

  );
};


const AppWithRouterAccess = withRouter(App);

const RouterApp = (props) => {
  return (<Router><AppWithRouterAccess {...props} /></Router>);
}

RouterApp.defaultProps = {
  clientId: '12123',
  issuer: '',
  redirectUri: ''
}

RouterApp.propTypes = {
  clientId: PropTypes.string,
  issuer: PropTypes.string,
  redirectUri: PropTypes.string
};
export default RouterApp;
