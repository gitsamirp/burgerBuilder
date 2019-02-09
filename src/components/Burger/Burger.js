import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    console.log(props.ingredients);
    console.log(props.ingredients.length);
    let transformedIngredients = null;
    if (props.ingredients.length == 0) {
        transformedIngredients = "Please add Ingredients";
    } else {
        transformedIngredients = Object.keys(props.ingredients).map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey+i} type={igKey}></BurgerIngredient>
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        });
    }
    
    return (
    <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"></BurgerIngredient>
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
    );
};

export default burger;