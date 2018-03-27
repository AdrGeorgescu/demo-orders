import React from 'react';
import styles from '../css/App.css';
import config from '../../config';

const shopOrdersEndpoint = config.baseUrl + '/shoporders';

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
            .then((order) => order.json())
            .then((order) => {
                this.props.handleOrder(order);
                this.resetForm();
            });
    };

    resetForm = () => {
        this.refs.total.value = "";
    };

    render = () => {
        return (
            <div className="input-group">
                <input type="text"
                       className="form-control"
                       ref="total"
                       placeholder="Total"/>
                <span className="input-group-btn">
                    <button className="btn btn-default"
                            type="button"
                            onClick={this.createNewOrder}>
                        Add Order
                    </button>
                </span>
            </div>
        );
    }
}
