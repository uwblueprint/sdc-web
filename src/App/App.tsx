import React from 'react';
//import styles from './App.module.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Flowchart from './Components/Flowchart';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/flowchart" component={Flowchart} />

      <Route path="/flowchartnodes">
        <p>Hi</p>
      </Route>
      <Route path="/">
        <p>First test</p>
      </Route>
    </Switch>
  </Router>
);

export default App;
