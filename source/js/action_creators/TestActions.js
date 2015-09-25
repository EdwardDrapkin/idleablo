import ActionCreator from 'action_creators/ActionCreator.js';

export default class TestActions extends ActionCreator {
    notReal() {
        console.log("Magic inheritence!");
    }
}