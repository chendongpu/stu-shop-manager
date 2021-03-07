import logo from './logo.svg';
import './App.css';
import {HashRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import {adminRoutes} from './routes/index'
import React from "react";
import Frame from './components/Frame/Index'


function App() {
  return (
    <Frame>
        <h1> app component</h1>
        <Switch>
            {adminRoutes.map(route=>{
                return <Route key={route.path} path={route.path} exact={route.exact} render={routeProps=>{
                    return <route.component {...routeProps} />;
                }} />
            })}
            <Redirect to={adminRoutes[0].path} from="/admin" />
            <Redirect to="/404" />
        </Switch>
    </Frame>
  );
}

export default App;
