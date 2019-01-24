import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey, i) => {
            return <li key={i}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: 
                {props.ingredients[igKey]}
                </li>
        }
    );
    return (
    <>
    <h3>Your Order</h3>
    <p>Delicous Burger with the following ingredients:</p>
    <ul>
        {ingredientSummary}
    </ul>
    <p><strong>Price: {props.totalPrice.toFixed(2)}</strong></p>
    <p>Continue to checkout?</p>
    <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
    <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
    </>
    );
};

export default OrderSummary;