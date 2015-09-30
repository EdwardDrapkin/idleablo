import React from 'react';
import Dispatcher from 'actions/Dispatcher.js';
import ActionProxy from 'actions/ActionProxy.js';
export default class BaseComponent extends React.Component {
    watchStore(type, event = null) {
        if(event == null) {
            this.addAllCallbacks(type);
        } else {
            this.addSpecificCallback(type, event);
        }
    }

    _getStateFromStores() {
        this.setState(this.getStateFromStores());
    }

    addAllCallbacks(type) {
        var _listener = this._getStateFromStores;
        console.log(this);

        var actions = (this.context && this.context.actions) || this.props.actions;
        for(var prop of Object.getOwnPropertyNames(type.prototype)) {
            if(prop != "constructor" && prop.startsWith('on')) {
                let eventKey = Dispatcher.getEventDoneKey(null, prop, type.name);
                actions.dispatcher.subscribe(eventKey, _listener);
            }
        }
    }

    addSpecificCallback(type, prop) {
        var _listener = this._getStateFromStores;
        var actions = (this.context && this.context.actions) || this.props.actions;

        if(prop != "constructor" && prop.startsWith('on')) {
            let eventKey = Dispatcher.getEventDoneKey(null, prop, type.name);
            actions.dispatcher.subscribe(eventKey, _listener);
        }
    }
}
