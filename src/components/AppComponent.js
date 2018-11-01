import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import MainContainer from '../containers/MainContainer';

class App extends Component {

  render() {
    return (
      <Fragment>
        <Route path="/" exact render={(props) => <MainContainer />} />
        <Route path={`${process.env.PUBLIC_URL}/:id`} exact render={(props) => <MainContainer />} />
      </Fragment>
    );
  }
}

export default App;
