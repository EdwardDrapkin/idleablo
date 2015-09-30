import BaseStore from 'stores/BaseStore.js';

export default class GameStore extends BaseStore {
    constructor() {
        super();

        this.tick = 0;
    }

    onGlobalTick() {
        this.tick++;
    }
}