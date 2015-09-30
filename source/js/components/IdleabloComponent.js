import React from 'react';
import Dispatcher from 'actions/Dispatcher.js';
import BaseComponent from 'components/BaseComponent.js';
import TestStore from 'stores/TestStore.js';

export default class IdleabloComponent extends BaseComponent {
    render() {
        return <div>123</div>
    }
    constructor(props, context) {
        super(props, context);
        this.watchStore(TestStore);
        this.watchStore(TestStore.prototype.onTestActionsNotReal);
    }
    getStateFromStores() {
        return {};
    }
}
