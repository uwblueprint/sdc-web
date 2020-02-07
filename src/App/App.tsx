import React from 'react';
//import styles from './App.module.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Flowchart from './Components/Flowchart';
import View from './Components/View';
import FlowChartNodeComponent from './components/FlowChartNodeComponent';


const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/view" component={View} />
      <Route path="/flowchart" component={Flowchart} />
      <Route path="/flowchartnodes">
        <p>Hi</p>
      </Route>
      {/* <Route path="/">
        <p>First test</p>
      </Route> */}
      <Route path="/flowchartnode" component={FlowChartNodeComponent}></Route>
    </Switch>
  </Router>
);

export default App;
