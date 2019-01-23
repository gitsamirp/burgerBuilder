import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.7,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

            this.setState({purchasable: sum > 0})
    }

    changeIngredientsHandler = (ingredientType, changeType) => {
        let ingredientTypeCount = this.state.ingredients[ingredientType];
        const ingredientPrice = INGREDIENT_PRICES[ingredientType];
        let price = this.state.totalPrice;
        if (changeType == "More") {
            ingredientTypeCount += 1;
            price += ingredientPrice;
        } else {
            if (ingredientTypeCount <= 0) {
                return;
            }
            ingredientTypeCount -= 1;
            price -= ingredientPrice;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[ingredientType] = ingredientTypeCount;

        this.setState({totalPrice: price, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
        <>
            <Burger ingredients={this.state.ingredients}></Burger>
            <div><BuildControls 
                ingredientChanged={this.changeIngredientsHandler}
                disabled={disableInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ></BuildControls></div>
        </>
        );
    }
}

export default BurgerBuilder;