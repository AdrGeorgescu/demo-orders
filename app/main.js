import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import App from './App.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render((
        <Router>
            <Switch>
                <Route path="/" exact={true} component={App} />
            </Switch>
        </Router>)
    , document.getElementById('root'));
