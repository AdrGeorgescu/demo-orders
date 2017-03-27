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

export class ClientDetails extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            cDetails: {}
        };
    }

    componentDidMount() {
        this.getClientDetails(this.props.id);        
    }

    getClientDetails(clientId) {
        let headers = {
            method: "GET",
            credentials: "include"
        };
        fetch(clientsEnpoint + "/" + clientId, headers)
           .then((client) => {
              client.json().then(json => {
                    this.setState({cDetails: json})
                });
                
           });
    }

    render() {
        return(
            <div>     
                <div>Email: {this.state.cDetails.email}</div>
                <div>Phone: {this.state.cDetails.phone}</div>
                <div>Full Name: {this.state.cDetails.firstName + " " + this.state.cDetails.lastName}</div>
                <div>Phone: {this.state.cDetails.joinDate}</div>
            </div>
        );
    }
}
