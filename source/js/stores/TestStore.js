import BaseStore from 'stores/BaseStore.js';

export default class TestStore extends BaseStore {
    onNotReal(arg0, arg1, arg2) {
        console.log("on notReal");
        console.log(arg0);
    }

    onTestActionsNotReal(arg0, arg1, arg2) {
        console.log("on TAnotReal");
        console.log(arg0);
    }
}