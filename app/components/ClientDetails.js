import React from 'react';
import styles from '../css/App.css';
import config from '../../config';

let clientsEnpoint = config.baseUrl + "/clients";

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

    componentDidMount = () => {
        this.getClientDetails(this.props.clientId);
    };

    getClientDetails = (clientId) => {
        const headers = {
            method: "GET",
            credentials: "include"
        };

        fetch(clientsEnpoint + "/" + clientId, headers)
           .then((client) => {
              client.json().then(json => {
                    this.setState({cDetails: json})
                });
                
           });
    };

    render = () => {
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
