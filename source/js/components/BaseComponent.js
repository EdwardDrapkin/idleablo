import React from 'react';
import Dispatcher from 'actions/Dispatcher.js';

export default class BaseComponent extends React.Component {
    render() {
        var context = this.context;

        return <div>123</div>
    }

    watchStore(type, event = null) {
        if(event == null) {
            this.addAllCallbacks(type);
        } else {
            this.addSpecificCallback(type, event);
        }
    }

    _getStateFromStores() {
        console.log("Store state goes here.");
        return [];
    }

    addAllCallbacks(type) {
        var _listener = this._getStateFromStores;

        for(var prop of Object.getOwnPropertyNames(type.prototype)) {
            if(prop != "constructor" && prop.startsWith('on')) {
                let eventKey = Dispatcher.getEventDoneKey(null, prop, type.name);
                this.context.actions.dispatcher.subscribe(eventKey, _listener);
            }
        }
    }

    constructor(props, context) {
        super(props, context);
    }

    addSpecificCallback(type, prop) {
        var _listener = this._getStateFromStores;

        if(prop != "constructor" && prop.startsWith('on')) {
            let eventKey = Dispatcher.getEventDoneKey(null, prop, type.name);
            this.actions.dispatcher.subscribe(eventKey, _listener);
        }
    }
}

BaseComponent.contextTypes = {
    actions: React.PropTypes.object.isRequired
};
