import React from 'react';
import styles from '../css/App.css';
import config from '../../config';

const clientsEnpoint = config.baseUrl + '/clients';

export class NewClient extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
    }

    createNewClient = () => {
        const firstName = this.refs.fname.value;
        const lastName = this.refs.lname.value;
        const email = this.refs.email.value;
        const phone = this.refs.phone.value;
        const newClientDetails = {
            phone,
            email,
            firstName,
            lastName
        };

        const newClientHeaders = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(newClientDetails)
        };

        fetch(clientsEnpoint, newClientHeaders)
            .then((response) => {
                response.json().then((client) => {
                    console.log("new client created", client);
                    this.props.handleClient(client);
                    this.resetForm();
                });
            });
    };

    resetForm = () => {
        this.refs.fname.value = "";
        this.refs.lname.value = "";
        this.refs.email.value = "";
        this.refs.phone.value = "";
    };

    render = () => {
        return (
            <div>
                <button type="button" className={styles.newClient + " btn btn-info"} data-toggle="collapse" data-target="#addclient">Add new client</button>
                <div className={styles.newClient + " collapse"} id="addclient">
                    <input type="text" className="form-control" ref="fname" placeholder="First name" />
                    <input type="text" className="form-control" ref="lname" placeholder="Last name" />
                    <input type="text" className="form-control" ref="email" placeholder="Email" />
                    <input type="text" className="form-control" ref="phone" placeholder="Phone" />
                    <button className="btn btn-primary" onClick={this.createNewClient}>Save</button>
                </div>
            </div>
        );
    }
}
