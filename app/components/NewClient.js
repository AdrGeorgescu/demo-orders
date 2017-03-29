import React from 'react';
import styles from '../css/App.css';

const endpointUrl = 'http://192.168.1.15:8080';

const clientsEnpoint = endpointUrl + '/clients';
const clientByPhoneEnpoint = clientsEnpoint + '?phone=';

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
            <div className={styles.newClient}>
                <input type="text" className="form-control" ref="fname" placeholder="First name" />
                <input type="text" className="form-control" ref="lname" placeholder="Last name" />
                <input type="text" className="form-control" ref="email" placeholder="Email" />
                <input type="text" className="form-control" ref="phone" placeholder="Phone" />
                <button className="btn btn-primary" onClick={this.createNewClient}>Save</button>
            </div>
        );
    }
}
