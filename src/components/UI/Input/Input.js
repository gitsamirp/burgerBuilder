import React from 'react';
import classes from './Input.module.css';

const input = ( props ) => {
    let inputElement = null;

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input {...props.elementConfig} className={classes.InputElement} value={props.value} onChange={props.changed}></input>;
            break;
        case ('textarea' ):
            inputElement = <textarea {...props.elementConfig}  className={classes.InputElement} value={props.value} onChange={props.changed}></textarea>;
            break;
        case ( 'select' ):
            inputElement = (
            <select className={classes.InputElement} value={props.value} onChange={props.changed}>
                {
                    props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.display}</option>
                ))}
            </select>);

            break
        default:
            inputElement = <input {...props.elementConfig}  className={classes.InputElement} value={props.value}></input>
            break;
    }

    return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
    );
};


export default input;