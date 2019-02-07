import React, { Component } from 'react';
import Order from './Order/Order';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        Axios.get('orders.json')
        .then(res => {
            const fetchOrders = [];
            for (let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchOrders})
        })
        .catch(error => {
            this.setState({loading: true})
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    ></Order>
                ))}

            </div>
        );
    }
}

export default withErrorHandler(Orders, Axios);