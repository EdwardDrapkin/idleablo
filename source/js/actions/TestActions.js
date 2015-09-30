import ActionCreator from 'actions/ActionCreator.js';

export default class TestActions extends ActionCreator {
    notReal(dispatch, arg1) {
        dispatch(arg1);
    }
}