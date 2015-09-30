import React from 'react';
import ActionProxy from 'actions/ActionProxy.js';
import TestStore from 'stores/TestStore.js';
import IdleabloComponent from 'components/IdleabloComponent.js';
import BaseComponent from 'components/BaseComponent.js';
import GameStore from 'stores/GameStore.js';

class IdleabloGame extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {};
        this.state.tick = window.tick = 0;

        this.timer = window.setInterval((() => {
            this.props.actions.globalTick(this.props.actions.stores['GameStore'].tick+1);
            this.props.actions.dispatcher.dispatch();
            this.setState({tick: this.props.actions.stores['GameStore'].tick});
        }).bind(this), 16);
    }

    getChildContext() {
        return {
            actions: this.props.actions,
            stores: this.props.actions.stores,
            tick: window.tick
        };
    }

    render() {
        return <div>Hello world!
            <IdleabloComponent />
        </div>
    }
};

export default IdleabloGame;

IdleabloGame.propTypes = {
    actions: React.PropTypes.instanceOf(ActionProxy).isRequired
};

IdleabloGame.childContextTypes = {
    actions: React.PropTypes.instanceOf(ActionProxy).isRequired,
    stores: React.PropTypes.object.isRequired,
    tick: React.PropTypes.number.isRequired
};