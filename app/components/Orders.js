import React from 'react';
import styles from '../css/App.css';
import {NewOrder} from './NewOrder';

const endpointUrl = 'http://192.168.1.15:8080';

const shopOrdersEndpoint = endpointUrl + '/shoporders';
const shopOrdersForClientEndpoint = shopOrdersEndpoint + '?clientId=';

export class Orders extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount = () => {
        this.getClientOrders(this.props.clientId);
    };

    getClientOrders = (clientId) => {
        let headers = {
            method: "GET",
            credentials: "include"
        };

        fetch(shopOrdersForClientEndpoint + clientId, headers)
            .then((client) => {
                client.json().then(json => {
                    this.setState({orders: json})
                });

            });
    };

    handleOrder = (order) => {
        const newOrder = {
            id: order.id,
            total: order.total
        };

        const orders = this.state.orders;
        orders.push(newOrder);

        this.setState({orders});
    };

    render = () => {
        let noOrders = this.state.orders.length === 0 ? <div>No orders</div> : "<strong>Client Orders</strong>";

        return (
            <div>
                {noOrders}
                {this.state.orders.map(order => {
                    return (
                        <div key={order.id}>
                            <div>Order ID: {order.id}</div>
                            <div>Total: {order.total}</div>
                        </div>
                    );
                })}
                <NewOrder clientId={this.props.clientId} handleOrder={order => this.handleOrder(order)}/>
            </div>
        );
    }
}
