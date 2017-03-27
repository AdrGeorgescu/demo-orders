import React from 'react';
import styles from '../css/App.css';

let endpointUrl = "http://192.168.1.15:8080"; 

let clientsEnpoint = endpointUrl + "/clients";
let clientByPhoneEnpoint = clientsEnpoint + "?phone=";

let shopOrdersEndpoint = endpointUrl + "/shoporders";
let shopOrdersForClientEndpoint = shopOrdersEndpoint + "?clientId=";
let shopOrdersForClientByPhoneEndpoint = shopOrdersEndpoint + "?clientPhone=";

let vouchersEnpoint = endpointUrl + "/voucers";
let vouchersForClientEnpoint = vouchersEnpoint + "?clientId=";

export class Orders extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            cOrders: []
        };
    }

    componentDidMount() {
        this.getClientOrders(this.props.id);        
    }

    getClientOrders(clientId) {
        let headers = {
            method: "GET",
            credentials: "include"
        };
        fetch(shopOrdersForClientEndpoint + clientId, headers)
           .then((client) => {
              client.json().then(json => {
                    this.setState({cOrders: json})
                });
                
           });
    }

    render() {
        if (this.state.cOrders.length === 0) return <div>No orders</div>;
        
        return (
            <div>
               {this.state.cOrders.map(order => {
                    return (
                        <div key={order.id}>     
                            <div>Order ID: {order.id}</div>
                            <div>Total: {order.total}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
