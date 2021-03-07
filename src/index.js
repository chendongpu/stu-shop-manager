import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import './index.css';
import reportWebVitals from './reportWebVitals';
import {mainRoutes} from './routes/index'
import  App from "./App";
import 'antd/dist/antd.css';

ReactDOM.render(<Router>
        <Switch>
            <Route path="/admin" render={routeProps=><App {...routeProps} />} />
            {mainRoutes.map(route=>{
                return <Route key={route.path} {...route} />
            })}
            <Redirect to="/admin" from="/" />
            <Redirect to="/404" />

        </Switch>

    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
