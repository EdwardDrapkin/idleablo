import Dispatcher from 'actions/Dispatcher.js';

export default class ActionProxy {
    constructor(dispatcher, actionCreators, stores) {
        this.children = actionCreators;
        this.stores = stores;
        this.dispatcher = dispatcher;
        this.subscribers = {};
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

        for(let storeName in  this.stores) {
            let store = this.stores[storeName];

            for(let methodName in this.methods) {
                let expectedListenerName = "on" + methodName.charAt(0).toUpperCase() + methodName.slice(1);
                //they are listening for everyone's event
                //e.g. onNotReal
                if(store[expectedListenerName] &&
                        store[expectedListenerName].constructor &&
                        store[expectedListenerName].apply &&
                        store[expectedListenerName].call) {
                    for(let type in this.methods[methodName]) {
                        let eventKey = Dispatcher.getEventKey(type, methodName);
                        let doneKey = Dispatcher.getEventDoneKey(null, methodName, store.constructor.name);
                        this.dispatcher.addAction(doneKey);
                        this.addSubscriber(eventKey, (a1,a2,a3,a4,a5,a6,a7,a8,a9,a0,aa,ab,ac,ad,ae,af) => {
                            store[expectedListenerName](a1,a2,a3,a4,a5,a6,a7,a8,a9,a0,aa,ab,ac,ad,ae,af);
                            this.dispatcher.enqueue(doneKey);
                        });
                    }
                }

                //they are looking for a specific type
                //e.g. onTestActionsNotReal
                for(let type in this.methods[methodName]) {
                    let eventKey = Dispatcher.getEventKey(type, methodName);
                    let doneKey = Dispatcher.getEventDoneKey(type, methodName, store.constructor.name);
                    let expectedListenerName = "on" +
                                                type +
                                                methodName.charAt(0).toUpperCase() + methodName.slice(1);

                    this.dispatcher.addAction(doneKey);

                    if(store[expectedListenerName] &&
                            store[expectedListenerName].constructor &&
                            store[expectedListenerName].apply &&
                            store[expectedListenerName].call) {
                        this.addSubscriber(eventKey, (a1,a2,a3,a4,a5,a6,a7,a8,a9,a0,aa,ab,ac,ad,ae,af) => {
                            store[expectedListenerName](a1,a2,a3,a4,a5,a6,a7,a8,a9,a0,aa,ab,ac,ad,ae,af);
                            this.dispatcher.enqueue(doneKey);
                        });
                    }
                }
            }
        }
    }

    addSubscriber(eventKey, callback) {
        this.dispatcher.subscribe(eventKey, callback);
        this.subscribers[eventKey][this.getTypeOf(callback)]=callback;
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
        let eventKey = Dispatcher.getEventKey(type,prop);
        this.dispatcher.addAction(eventKey);
        this.methods[prop][type] = child;
        this.subscribers[eventKey] = {};
    }

    callMethod(name, a1,a2,a3,a4,a5,a6,a7,a8,a9,a0,aa,ab,ac,ad,ae,af) {
        let dispatch = ((eventKey, payload) => {
            this.dispatcher.enqueue(eventKey, payload);
        }).bind(this);

        if(this.methods[name]) {
            let returns = [];

            for(let type in this.methods[name]) {
                let eventKey = Dispatcher.getEventKey(type, name);
                let _dispatch = dispatch.bind(this,eventKey);
                returns.push(
                    this.methods[name][type][name](_dispatch, a1,a2,a3,a4,a5,a6,a7,a8,a9,a0,aa,ab,ac,ad,ae,af)
                );
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
