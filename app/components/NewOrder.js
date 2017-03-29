import React from 'react';
import styles from '../css/App.css';

const endpointUrl = 'http://192.168.1.15:8080';

const clientsEnpoint = endpointUrl + '/clients';
const clientByPhoneEnpoint = clientsEnpoint + '?phone=';

const shopOrdersEndpoint = endpointUrl + '/shoporders';
const shopOrdersForClientEndpoint = shopOrdersEndpoint + '?clientId=';
const shopOrdersForClientByPhoneEndpoint = shopOrdersEndpoint + '?clientPhone=';

const vouchersEnpoint = endpointUrl + '/voucers';
const vouchersForClientEnpoint = vouchersEnpoint + '?clientId=';

export class NewOrder extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
    }

    createNewOrder = () => {
        const total = this.refs.total.value;

        const newOrderDetails = {
            total,
            clientId: this.props.clientId
        };

        const newOrderHeaders = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(newOrderDetails)
        };

        fetch(shopOrdersEndpoint, newOrderHeaders)
            .then((response) => {
                response.json().then((order) => {
                    console.log("new order created", order);
                    this.props.handleOrder(order);
                    this.resetForm();
                });
            });
    };

    resetForm = () => {
        this.refs.total.value = "";
    };

    render = () => {
        return (
            <div className={styles.newOrder}>
                <input type="text" className="form-control" ref="total" placeholder="Total"/>
                <button className="btn btn-primary" onClick={this.createNewOrder}>Save</button>
            </div>
        );
    }
}
