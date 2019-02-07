import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        alert("You Continue");
        this.setState({loading: true});
        const order = {
            ingredients: {...this.props.ingredients},
            price: this.props.price,
            customer: {
                name: "Sam Plat",
                address: {
                    street: "Flop",
                    zipcode: "43545",
                    country: "Duuus"
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        console.log(order);

        Axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {this.setState({loading: false});
        });
    }

    render() {
        let form = (
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="text" name="email" placeholder="Your Name" />
            <input className={classes.Input} type="text" name="street" placeholder="Your Name" />
            <input className={classes.Input} type="text" name="postCode" placeholder="Your Name" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner></Spinner>
        }
        return (
            <div className={classes.ContactData}>
                <h4>EnterContact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;