import React from 'react';
import ActionProxy from 'actions/ActionProxy.js';
import TestStore from 'stores/TestStore.js';
import IdleabloComponent from 'components/IdleabloComponent.js';
import BaseComponent from 'components/BaseComponent.js';
import GameStore from 'stores/GameStore.js';
import GridDungeon from 'components/dungeon/GridDungeon.js';

class IdleabloGame extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    getChildContext() {
        return {
            actions: this.props.actions,
            stores: this.props.actions.stores,
        };
    }

    render() {
        return <div>Hello world!
            <GridDungeon
                roomXMax={10}
                roomYMax={10}
                mapX={100}
                mapY={100}
            />
        </div>
    }
};

export default IdleabloGame;

IdleabloGame.propTypes = {
    actions: React.PropTypes.instanceOf(ActionProxy).isRequired
};

IdleabloGame.childContextTypes = {
    actions: React.PropTypes.instanceOf(ActionProxy).isRequired,
    stores: React.PropTypes.object.isRequired
};