export default class ActionProxy {

    constructor(children) {
        this.children = children;

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
            let getter = () => this.callMethod.bind(this, prop);
            Object.defineProperty(this, prop, {get: getter})
        }

        let type = this.getTypeOf(child);
        this.methods[prop][type] = child;

    }

    callMethod(name) {
        if(this.methods[name]) {
            for(let type in this.methods[name]) {
                this.methods[name][type][name]();
            }
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

    get(target, property) {
        return property in target ? target[property] :
               target.callMethod(property);
    }
};
