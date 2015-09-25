import React from 'react';
import Dispatcher from 'dispatcher.js';

export default class IdleabloComponent extends React.Component {
    render() {
        var context = this.context;
        console.log(context);
        return <div>123</div>
    }

}

IdleabloComponent.contextTypes = { dispatcher: React.PropTypes.object.isRequired };
