import React from 'react';
import styles from '../css/App.css';
import {NewOrder} from './NewOrder';

const endpointUrl = 'http://192.168.1.15:8080';
const vouchersEnpoint = endpointUrl + '/vouchers';
const vouchersForClientEnpoint = vouchersEnpoint + '?clientId=';

export class Vouchers extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            vouchers: []
        };
    }

    componentDidMount = () => {
        this.getClientVouchers(this.props.clientId);
    };

    getClientVouchers = (clientId) => {
        const headers = {
            method: "GET",
            credentials: "include"
        };

        fetch(vouchersForClientEnpoint + clientId, headers)
            .then((vouchers) => {
                vouchers.json().then(json => {
                    this.setState({vouchers: json})
                });

            });
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
        let noVouchers = this.state.vouchers.length === 0 ? <div>No vouchers</div> : "";

        return (
            <div>
                {noVouchers}
                {this.state.vouchers.map(voucher => {
                    return (
                        <div key={voucher.id}>
                            <div>Code: {voucher.code}</div>
                            <div>Value: {voucher.value}</div>
                        </div>
                    );
                })}
                <NewOrder clientId={this.props.clientId} handleOrder={order => this.handleOrder(order)}/>
            </div>
        );
    }
}
