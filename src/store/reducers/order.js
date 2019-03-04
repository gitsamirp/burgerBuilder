import * as actionTypes from '../actions/actionTypes';

const inititalState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = inititalState, action) => {

    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            console.log("teest");
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true

            }
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
    
        default:
            return {
                ...state
            }
    }

};

export default reducer;