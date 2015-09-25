require('babel/polyfill');
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import IdleabloComponent from 'components/IdleabloComponent.js';
import IdleabloGame from 'components/IdleabloGame.js';
import Dispatcher from 'dispatcher.js';


/*
routing
 */
var game = new IdleabloGame();
var router = <Router>
    <Route name="index" component={IdleabloGame} path="/" />
</Router>;


ReactDOM.render(router, document.getElementById('idleablo-game'));