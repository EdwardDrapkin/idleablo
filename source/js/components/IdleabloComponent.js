import React from 'react';
import Dispatcher from 'actions/Dispatcher.js';
import BaseComponent from 'components/BaseComponent.js';
import TestStore from 'stores/TestStore.js';
import ActionProxy from 'actions/ActionProxy.js';
import GameStore from 'stores/GameStore.js';
export default class IdleabloComponent extends BaseComponent {
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            tick: 0
        };
        this.watchStore(GameStore);
    }
    render() {
        return <div>{this.state.tick}</div>
    }
    getStateFromStores() {
        return {
            tick: this.context.stores['GameStore'].tick
        };
    }
}

IdleabloComponent.contextTypes = {
    actions: React.PropTypes.instanceOf(ActionProxy).isRequired,
    stores: React.PropTypes.object.isRequired
};
