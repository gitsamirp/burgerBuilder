import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.7,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        Axios.get("https://react-my-burger-7805d.firebaseio.com/ingredients.json")
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({errorState: true})
        });
    }

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
        if (changeType === "More") {
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

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+ this.state.totalPrice); 
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cant be loaded</p>:<Spinner></Spinner>
        if (this.state.ingredients) {
            burger = (<><Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                ingredientChanged={this.changeIngredientsHandler}
                disabled={disableInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                ></BuildControls></>);

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}></OrderSummary>;
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }
        return (
        <>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
        </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, Axios);