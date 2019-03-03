import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        Axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response.data.name);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFailed(error));
        });

    }
} 