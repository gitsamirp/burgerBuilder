import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((igKey, i) => {
                return <li key={i}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: 
                    {this.props.ingredients[igKey]}
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
                <p><strong>Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </>
        );
    }
};

export default OrderSummary;