import BaseStore from 'stores/BaseStore.js';

export default class PlayerStore extends BaseStore {
    constructor() {
        super();

        this.inventory = {

        }
    }

    onAddItem(item) {
        console.log("Storing " + item);
    }
}