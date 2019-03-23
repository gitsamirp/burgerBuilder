import React, {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop'
import Transition from 'react-transition-group/Transition';

class Modal extends Component {
    
    // we do this to not unnessarily update the model and order summary, can test with componentwillupdate
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children;
    }

    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}></Backdrop>

                <Transition
                    in={this.props.show}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit     
                >
                {state => ( <div style={
                        {
                            transition: "all 0.3s ease-out",
                            opacity: state === 'exiting' ? 0 : 1,
                            transform: state === 'exiting' ? "translateY(-100vh)" : state === 'entering' ? "translateY(-100vh" : null
                        }
                    } className={classes.Modal}>{this.props.children}</div>)}
                </Transition>
                {/* <div 
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
                className={classes.Modal}>
                    {this.props.children}
                </div> */}
            </>
        );
    }
}

export default Modal;