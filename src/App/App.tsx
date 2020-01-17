import React from 'react';
import { useRoutes, A } from 'hookrouter';
import routes from "./router";
import styles from './App.module.scss';

import FlowChartNodeComponent from "./components/FlowChartNodeComponent";
import FlowChartComponent from "./components/FlowChartComponent";

//const App: React.FC = () => <h1 className={styles.helloworld}>Hello SDC</h1>;

function App() {
    const routeResult = useRoutes(routes);

    return (
        <div className="App">
            <A href="/flowchart_node">Flowchart Node</A>
            <A href="/flowchart">Flowchart</A>
            {routeResult}
        </div>
    )
}

export default App;
