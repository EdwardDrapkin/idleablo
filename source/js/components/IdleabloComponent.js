import React from 'react';
import Dispatcher from 'actions/Dispatcher.js';
import BaseComponent from 'components/BaseComponent.js';
import TestStore from 'stores/TestStore.js';
import ActionProxy from 'actions/ActionProxy.js';
import GameStore from 'stores/GameStore.js';
export default class IdleabloComponent extends BaseComponent {
}

IdleabloComponent.contextTypes = {
    actions: React.PropTypes.instanceOf(ActionProxy).isRequired,
    stores: React.PropTypes.object.isRequired
};
