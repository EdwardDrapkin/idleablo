import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import IdleabloComponent from 'components/IdleabloComponent.js';
import IdleabloGame from 'components/IdleabloGame.js';
import Dispatcher from 'actions/Dispatcher.js';
import ActionProxy from 'actions/ActionProxy.js';
import TestStore from 'stores/TestStore.js';
import GameActions from 'actions/GameActions.js';
import InventoryActions from 'actions/player/InventoryActions.js';

import PlayerStore from 'stores/PlayerStore.js';
import GameStore from 'stores/GameStore.js';

/*
routing
 */
var dispatcher = new Dispatcher();
var actionCreators = [
    new GameActions(),
    new InventoryActions()
];

var stores = {
    [GameStore]: new GameStore(),
    [PlayerStore]: new PlayerStore()
};

var actionProxy = new ActionProxy(dispatcher, actionCreators, stores);


window.game = {};
window.game.tickRate = 50;
window.game.ticksPerSec = 1000 / window.game.tickRate;
window.game.timer = window.setInterval(() => {
    actionProxy.globalTick(stores[GameStore].tick + 1);
    actionProxy.dispatcher.dispatch();
}, window.game.tickRate);

ReactDOM.render(<IdleabloGame actions={actionProxy} />, document.getElementById('idleablo-game'));