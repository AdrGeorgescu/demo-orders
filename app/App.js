import React from 'react';
import styles from './css/App.css';
import {ClientDetails} from './components/ClientDetails';
import {Orders} from './components/Orders';
import {NewClient} from './components/NewClient';
import {Vouchers} from './components/Vouchers';
import config from '../config';

const clientsEnpoint = config.baseUrl + '/clients';
const clientByPhoneEnpoint = clientsEnpoint + "?phone=";

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

    componentDidMount = () => {
        this.getClients();
    };

    getClients = () => {
        const headers = {
            method: "GET",
            credentials: "include"
        };
        fetch(clientsEnpoint, headers)
            .then((clients) => {
                clients.json().then(clients => {
                    this.setState({clients});
                });
            });
    };

    handleClient = (client) => {
        const newClient = {
            id: client.id,
            name: client.firstName
        };
        const clients = this.state.clients;
        clients.push(newClient);

        this.setState({clients});
    };

    filterById = () => {
        const headers = {
            method: "GET",
            credentials: "include"
        };
        const clientId = this.refs.filter.value;
        
        if (!clientId) {
            this.getClients();
            return;
        }
        
        fetch(clientsEnpoint + "/" + clientId, headers)
            .then((clients) => {
                clients.json().then(client => {
                    this.setState({
                        clients: [{
                            id: client.id,
                            name: client.firstName
                        }]
                    });
                });

            });
    };

    filterByPhone = () => {
        const headers = {
            method: "GET",
            credentials: "include"
        };

        const clientPhone = this.refs.filter.value;
        
        if (!clientPhone) {
            this.getClients();
            return;
        }

        fetch(clientByPhoneEnpoint + clientPhone, headers)
            .then((clients) => {
                clients.json().then(client => {
                    this.setState({
                        clients: [{
                            id: client.id,
                            name: client.firstName
                        }]
                    });
                });

            });
    };

    render = () => {
        return (
            <div>
                
                <div className={styles.filter + " input-group"}>
                    <span className="input-group-btn">
                        <button className="btn btn-default"
                                type="button"
                                onClick={this.filterById}>
                            Filter by Id
                        </button>
                    </span>
                    <input type="text"
                           className="form-control"
                           ref="filter"
                           placeholder="Name or Id"/>
                    <span className="input-group-btn">
                        <button className="btn btn-default"
                                type="button"
                                onClick={this.filterByPhone}>
                            Filter by Phone
                        </button>
                    </span>
                </div>

                <table className="table table-condensed"
                       style={{borderCollapse: "collapse"}}>
                    <thead>
                    <tr>
                        <th className={styles.idCol}>ID</th>
                        <th>First Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.clients.map((client) => {
                        return [
                            <tr data-toggle="collapse"
                                data-target={"#demo" + client.id}
                                className="accordion-toggle">
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                            </tr>,
                            <tr>
                                <td colSpan="6"
                                    className={styles.hiddenRow}>
                                    <div className={styles.clientDetails + " accordian-body collapse"}
                                         id={"demo" + client.id}>
                                        <strong>Client Details</strong>
                                        <ClientDetails clientId={client.id}/>
                                        <Orders clientId={client.id}/>
                                    </div>
                                </td>
                            </tr>
                        ];
                    })}
                    </tbody>
                </table>
                <NewClient handleClient={client => this.handleClient(client)}/>
            </div>
        );
    }
}
