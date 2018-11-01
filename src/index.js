import React from 'react';
import { render } from 'react-dom';
import { HashRouter, BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history'
import reducer from './reducers';
import logger from 'redux-logger'
import AppComponent from './components/AppComponent';

const history = createHashHistory();

const store = createStore(
  connectRouter(history)(reducer),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      logger
    )
  )
);

render(

  <Provider store={store}>
    <ConnectedRouter history={history} >
      <AppComponent history={history} />
    </ConnectedRouter>
  </Provider>,

  document.getElementById('root')
);

window.onerror = (err) => {
  console.log(err);
};
