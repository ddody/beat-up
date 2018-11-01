import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainContainer from '../containers/MainContainer';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/" exact render={(props) => <MainContainer />} />
        <Route path="/:id" exact render={(props) => <MainContainer />} />
      </Switch>
    );
  }
}

export default App;
