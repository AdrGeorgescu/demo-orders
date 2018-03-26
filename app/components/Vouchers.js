import React from 'react';
import styles from '../css/App.css';
import {NewOrder} from './NewOrder';

export class Vouchers extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
    }

    render = () => {
        const noVouchers = this.props.data.length === 0 ? <div>No vouchers</div> : <strong>Vouchers</strong>;

        return (
            <div className={styles.vouchersContainer}>
                {noVouchers}
                {this.props.data.map(voucher => {
                    return (
                        <div key={voucher.id}>
                            <div>Code: {voucher.code}</div>
                            <div>Value: {voucher.value}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
