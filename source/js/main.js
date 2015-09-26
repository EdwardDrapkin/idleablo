require('babel/polyfill');
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import IdleabloComponent from 'components/IdleabloComponent.js';
import IdleabloGame from 'components/IdleabloGame.js';
import Dispatcher from 'dispatcher.js';
import ActionProxy from 'actions/ActionProxy.js';
import TestStore from 'stores/TestStore.js';
import TestActions from 'actions/TestActions.js';

/*
routing
 */
var game = new IdleabloGame();
var dispatcher = new Dispatcher();
var actionCreators = [
    new TestActions()
];

var stores = [
    new TestStore()
];

var actionProxy = new ActionProxy(dispatcher, actionCreators, stores);

console.log("0");
console.log(actionProxy.notReal(123));

dispatcher.dispatch();
console.log("100");
var router = <Router>
    <Route name="index" component={IdleabloGame} path="/" />
</Router>;


ReactDOM.render(router, document.getElementById('idleablo-game'));