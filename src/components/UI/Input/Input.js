import React from 'react';
import classes from './Input.module.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input {...props.elementConfig} 
                                className={inputClasses.join(' ')} 
                                value={props.value} 
                                onChange={props.changed}
                            ></input>;
            break;
        case ('textarea' ):
            inputElement = <textarea {...props.elementConfig}  
                                className={inputClasses.join(' ')} 
                                value={props.value} 
                                onChange={props.changed}
                            ></textarea>;
            break;
        case ( 'select' ):
            inputElement = (
            <select 
                className={inputClasses.join(' ')} 
                value={props.value} 
                onChange={props.changed}
                >
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