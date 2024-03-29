import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    let transformedIngredients = null;
    if (Object.keys(props.ingredients).length === 0) {
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