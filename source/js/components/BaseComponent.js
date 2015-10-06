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
        var _listener = this._getStateFromStores.bind(this);
        var actions = this.getActions();

        for(var prop of Object.getOwnPropertyNames(type.prototype)) {
            if(prop != "constructor" && prop.startsWith('on')) {
                let eventKey = Dispatcher.getEventDoneKey(null, prop, type.name);
                actions.dispatcher.subscribe(eventKey, _listener);
            }
        }
    }

    addSpecificCallback(type, prop) {
        var _listener = this._getStateFromStores.bind(this);
        var actions = this.getActions();

        if(prop.call && prop.apply) {
            prop = prop.name;
        }

        if(prop != "constructor" && prop.toString().startsWith('on')) {
            let eventKey = Dispatcher.getEventDoneKey(null, prop, type.name);
            actions.dispatcher.subscribe(eventKey, _listener);
        }
    }

    getActions() {
        if(!(this.context.actions || this.props.actions)) {
            throw "No actions provided for a BaseComponent instance."
        } else {
            return this.props.actions ? this.props.actions : this.context.actions;
        }
    }
}