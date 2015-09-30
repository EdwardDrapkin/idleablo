import BaseStore from 'stores/BaseStore.js';

export default class TestStore extends BaseStore {
    //listens for *_NOTREAL
    //fires TESTSTORE_NOTREAL_DONE
    onNotReal(arg0, arg1, arg2) {
        console.log("on notReal");
    }

    //listens for TESTACTIONS_NOTREAL
    //fires TESTSTORE_TESTACTIONSNOTREAL_DONE
    onTestActionsNotReal(arg0, arg1, arg2) {
        console.log("on TAnotReal");
    }
}