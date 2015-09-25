require('babel/polyfill');
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import IdleabloComponent from 'components/IdleabloComponent.js';
import IdleabloGame from 'components/IdleabloGame.js';
import Dispatcher from 'dispatcher.js';
import ActionProxy from 'actions.js';

import TestActions from 'action_creators/TestActions.js';

/*
routing
 */
var game = new IdleabloGame();
var actionProxy = new ActionProxy(new Dispatcher(), [
    new TestActions()
]);
console.log(actionProxy.notReal(123));

var router = <Router>
    <Route name="index" component={IdleabloGame} path="/" />
</Router>;


ReactDOM.render(router, document.getElementById('idleablo-game'));