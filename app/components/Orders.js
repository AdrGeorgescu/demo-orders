import React from 'react';
import styles from '../css/App.css';
import {NewOrder} from './NewOrder';
import {Vouchers} from './Vouchers';
import config from '../../config';

const shopOrdersEndpoint = config.baseUrl + '/shoporders';
const shopOrdersForClientEndpoint = shopOrdersEndpoint + '?clientId=';

const vouchersEnpoint = config.baseUrl + '/vouchers';
const vouchersForClientEnpoint = vouchersEnpoint + '?clientId=';

export class Orders extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            vouchers: []
        };
    }

    componentDidMount = () => {
        this.getClientOrders(this.props.clientId);
        this.getClientVouchers(this.props.clientId);
    };

    getClientOrders = (clientId) => {
        let headers = {
            method: "GET",
            credentials: "include"
        };

        fetch(shopOrdersForClientEndpoint + clientId, headers)
            .then((client) => {
                client.json().then(json => {
                    this.setState({orders: json});
                });

            });
    };
    
    getClientVouchers = (clientId) => {
        const headers = {
            method: "GET",
            credentials: "include"
        };

        fetch(vouchersForClientEnpoint + clientId, headers)
            .then((vouchers) => {
                vouchers.json().then(json => {
                    this.setState({vouchers: json});
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
        this.getClientVouchers(this.props.clientId);
    };

    handleVouchers = (voucher) => {
        const newVoucher = {
            id: voucher.id,
            value: voucher.value,
            code: voucher.code
        };

        const vouchers = this.state.vouchers;
        vouchers.push(newVoucher);

        this.setState({vouchers});
    };

    render = () => {
        let noOrders = this.state.orders.length === 0 ? <div>No orders</div> : <strong>Client Orders</strong>;

        return (
            <div className={styles.ordersContainer}>
                {noOrders}
                {this.state.orders.map(order => {
                    return (
                        <div key={order.id} className={styles.order}>
                            <div>Order ID: {order.id}</div>
                            <div>Total: {order.total}</div>
                        </div>
                    );
                })}
                <NewOrder clientId={this.props.clientId} handleOrder={order => this.handleOrder(order)}/>
                <div className={styles.vouchersContainer}>
                    {this.state.vouchers.map(voucher => {
                        return (
                            <div key={voucher.id} className={styles.order}>
                                <div>Code: {voucher.code}</div>
                                <div>Value: {voucher.value}</div>
                            </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}
