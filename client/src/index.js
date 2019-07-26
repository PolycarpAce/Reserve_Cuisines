import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {createBrowserHistory} from "history";
import App from "./App.js";

import * as serviceWorker from './serviceWorker';

const hst = createBrowserHistory();

ReactDOM.render(
<Router history={hst} basename={"/"}> 
    <Switch>
        <Route path ="/" component={App} exact/>
        
    </Switch> 
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
