import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import styles from './css/App.css';
import {ClientDetails} from './components/ClientDetails';
import {Orders} from './components/Orders';

let endpointUrl = "http://192.168.1.15:8080"; 

let clientsEnpoint = endpointUrl + "/clients";
let clientByPhoneEnpoint = clientsEnpoint + "?phone=";

let shopOrdersEndpoint = endpointUrl + "/shoporders";
let shopOrdersForClientEndpoint = shopOrdersEndpoint + "?clientId=";
let shopOrdersForClientByPhoneEndpoint = shopOrdersEndpoint + "?clientPhone=";

let vouchersEnpoint = endpointUrl + "/voucers";
let vouchersForClientEnpoint = vouchersEnpoint + "?clientId=";

export default class App extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            clientDetails: {}
        };
    }

    componentDidMount() {
        this.getClients();        
    }

    getClients() {
        let headers = {
            method: "GET",
            credentials: "include"
        };
        fetch(clientsEnpoint, headers)
           .then((clients) => {
              clients.json().then(json => {
                    this.setState({clients: json});
                });
                
           });

    }

    render() {
        let tableStyle = {
            borderCollapse: "collapse"
        }
        return (
            <div>
                <table className="table table-condensed" style={tableStyle}>
                    <thead>
                        <tr>
                            <th className={styles.idCol}>ID</th>
                            <th>First Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.clients.map((client) => {
                            return [
                                <tr data-toggle="collapse" data-target={"#demo" + client.id} className="accordion-toggle">
                                    <td>{client.id}</td>
                                    <td>{client.name}</td>
                                </tr>,
                                <tr>
                                    <td colSpan="6" className={styles.hiddenRow}>
                                        <div className="accordian-body collapse" id={"demo" + client.id}> 
                                            <strong>Client Details</strong>
                                            <ClientDetails {...client} />
                                            <strong>Client Orders</strong>
                                            <Orders {...client} />
                                        </div> 
                                    </td>
                                </tr>
                            ];
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
