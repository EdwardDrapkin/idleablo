require('babel/polyfill');
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import IdleabloComponent from 'components/IdleabloComponent.js';
import IdleabloGame from 'components/IdleabloGame.js';
import Dispatcher from 'actions/Dispatcher.js';
import ActionProxy from 'actions/ActionProxy.js';
import TestStore from 'stores/TestStore.js';
import GameActions from 'actions/GameActions.js';
import TestActions from 'actions/TestActions.js';
import GameStore from 'stores/GameStore.js';

/*
routing
 */
var dispatcher = new Dispatcher();
var actionCreators = [
    new GameActions(),
    new TestActions()
];

var stores = {
    GameStore: new GameStore(),
};

var actionProxy = new ActionProxy(dispatcher, actionCreators, stores);

ReactDOM.render(<IdleabloGame actions={actionProxy} />, document.getElementById('idleablo-game'));