import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import FlowChart from './Components/FlowChart.jsx';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/flowchart/:id" component={FlowChart} />
    </Switch>
  </Router>
);

export default App;
