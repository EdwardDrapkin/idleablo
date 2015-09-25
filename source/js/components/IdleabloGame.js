import React from 'react';
import IdleabloComponent from 'components/IdleabloComponent.js';
import Dispatcher from 'dispatcher.js';

class IdleabloGame extends React.Component{
    constructor(props) {
        super(props);

        var actions = {
            FOO: 'FOO',
            BAR: "BAR"
        };


        this.dispatcher = new Dispatcher(actions);
    }

    getChildContext() {
        return {dispatcher: this.dispatcher};
    }

    render() {
        return <div>Hello world!
            <IdleabloComponent />
        </div>
    }
};

IdleabloGame.childContextTypes = { dispatcher: React.PropTypes.instanceOf(Dispatcher).isRequired };

export default IdleabloGame;
