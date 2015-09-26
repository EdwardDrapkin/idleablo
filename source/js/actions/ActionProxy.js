export default class ActionProxy {

    constructor(dispatcher, actionCreators, stores) {
        this.children = actionCreators;
        this.stores = stores;
        this.dispatcher = dispatcher;

        this.methods = {};

        for(let child of this.children) {
            for(let propName of Object.getOwnPropertyNames(child.constructor.prototype)) {
                if(propName == 'constructor') {
                    continue;
                }

                let prop = child[propName];

                if(prop.constructor && prop.call && prop.apply) {
                    this.addMethod(propName, child);
                }
            }
        }

        for(let store of stores) {
            for(let methodName in this.methods) {
                let expectedListenerName = "on" + methodName.charAt(0).toUpperCase() + methodName.slice(1);

                //they are listening for everyone's event
                //e.g. onNotReal
                if(store[expectedListenerName] &&
                        store[expectedListenerName].constructor &&
                        store[expectedListenerName].apply &&
                        store[expectedListenerName].call) {
                    for(let type in this.methods[methodName]) {
                        let eventKey = this.getEventKey(type, methodName);
                        this.dispatcher.subscribe(eventKey, store[expectedListenerName]);
                    }
                }

                //they are looking for a specific type
                //e.g. onTestActionsNotReal
                for(let type in this.methods[methodName]) {
                    let eventKey = this.getEventKey(type, methodName);
                    let expectedListenerName = "on" +
                                                type +
                                                methodName.charAt(0).toUpperCase() + methodName.slice(1);

                    if(store[expectedListenerName] &&
                            store[expectedListenerName].constructor &&
                            store[expectedListenerName].apply &&
                            store[expectedListenerName].call) {
                        this.dispatcher.subscribe(eventKey, store[expectedListenerName]);
                    }
                }
            }
        }
    }

    addMethod(prop, child) {
        if(!this.methods) {
            this.methods = {};
        }

        if(!this.methods[prop]) {
            this.methods[prop] = {};
            let getter = () => {
                return this.callMethod.bind(this, prop);
            };
            Object.defineProperty(this, prop, {get: getter})
        }

        let type = this.getTypeOf(child);
        this.methods[prop][type] = child;
        this.dispatcher.addAction(this.getEventKey(type,prop));
    }

    getEventKey(type, name) {
        var eventKey = (type + "_" + name).toUpperCase();
        return eventKey;
    }

    callMethod(name, a1,a2,a3,a4,a5,a6,a7,a8,a9,a0,aa,ab,ac,ad,ae,af) {
        let dispatch = ((eventKey, payload) => {
            this.dispatcher.enqueue(eventKey, payload);
        }).bind(this);

        if(this.methods[name]) {
            let returns = [];

            for(let type in this.methods[name]) {
                let _dispatch = dispatch.bind(this,this.getEventKey(type, name));
                returns.push(this.methods[name][type][name](_dispatch, a1,a2,a3,a4,a5,a6,a7,a8,a9,a0,aa,ab,ac,ad,ae,af));
            }

            return returns;
        }
    }

    getTypeOf(obj) {
        if(obj.constructor.name) {
            return obj.constructor.name;
        } else if (obj.constructor) {
            return obj.constructor.toString();
        } else {
            return typeof obj;
        }
    }
};
