import ActionCreator from 'actions/ActionCreator.js';

export default class GameActions extends ActionCreator {
    globalTick(dispatch, tick) {
        dispatch(tick);
    }
}