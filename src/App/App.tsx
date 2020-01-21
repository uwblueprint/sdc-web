import React from 'react';
import styles from './App.module.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const App: React.FC = () => (
    <Router>
        <Switch>
            <Route path="/home">
                <p>Hello test</p>
            </Route>
            <Route path="/">
                <p>First test</p>
            </Route>
        </Switch>
    </Router>

);



export default App;
