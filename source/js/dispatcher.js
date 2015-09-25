export default class Dispatcher {    constructor() {        this.subscribers = {};        this.subscriptionId = 0;        this.idPrefix = '____dispatch____';        this.actions = {};        this.queue = [];        this.isBusy = false;    }    addAction(action) {        this.subscribers[action] = {};        this.actions[action] = action;    }    deleteAction(action) {        delete this.subscribers[action];        delete this.actions[action];    }    dispatch(action, payload) {        this._verify(action);        if(this.isBusy) {            throw "Can't dispatch while dispatching, use enqueue instead.";        }        this._dispatch(action, payload);        if(this.queue.length > 0) {            var oldQueue = this.queue;            this.queue = [];            for(var i = 0; i < this.queue.length; i++) {                var action = queue[i].action;                var payload = queue[i].payload;                this._dispatch(action, payload);                oldQueue = oldQueue.concat(this.queue);                this.queue = [];            }        }    }    _dispatch(action, payload) {        this.isBusy = true;        for(var id in this.subscribers[action]) {            this.subscribers[action][id](payload);        }        this.isBusy = false;    }    enqueue(action, payload) {        this._verify(action);        this.queue.push({action, payload});    }    subscribe(action, listener, id = this.idPrefix + this.subscriptionId++) {        this._verify(action);        this.subscribers[action][id] = listener;        return id;    }    unsubscribe(action, id) {        this._verify(action);        delete this.subscribers[action][id];    }    _verify(action) {        if(!this.actions[action]) {            throw "No such action: " + action;        }    }}