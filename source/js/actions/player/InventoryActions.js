import ActionCreator from 'actions/ActionCreator.js';

export default class InventoryActions extends ActionCreator {
    purchaseItem(dispatch, item) {
        console.log("Adding item " + item);
        dispatch(item);
    }
}