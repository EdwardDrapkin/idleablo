import React from 'react';
import ActionProxy from 'actions/ActionProxy.js';
import TestStore from 'stores/TestStore.js';
import IdleabloComponent from 'components/IdleabloComponent.js';

class IdleabloGame extends React.Component {
    getChildContext() {
        return {
            actions: this.props.actions
        };
    }


    render() {
        return <div>Hello world!
            <IdleabloComponent />
        </div>
    }
};

export default IdleabloGame;

IdleabloGame.childContextTypes = { actions: React.PropTypes.instanceOf(ActionProxy).isRequired };