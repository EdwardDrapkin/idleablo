export default class ActionProxy {

    constructor(dispatcher, children) {
        this.children = children;
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
