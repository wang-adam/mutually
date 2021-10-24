import React, {Component} from 'react';
import NavBar from '../Components/NavBar';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Button, Form } from 'react-bootstrap';

export default class Requests extends Component {
	constructor(props) {
        super(props);
        let initialState = { dollarsRequested: 0, description: "" };
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(event) {
		// gapi.auth2.init({client_id: process.env.REACT_APP_OAUTH_CLIENT_ID});
		let GoogleAuth = window.gapi.auth2.getAuthInstance();
		let currentUser = GoogleAuth.currentUser;
		let id = currentUser.profileObj.googleId;
		let token = currentUser.tokenId;
		let url = '127.0.0.1:8000/requests/';
		fetch(url + id).then(response => {
			if (response.status === 404) {
				var xhr = new XMLHttpRequest();
				xhr.open('POST', url);
				xhr.setRequestHeader('Content-Type', 'application/JSON');
				xhr.send(JSON.stringify({
					auth_token: token
				}));
			}
		});
    }

	render() {
		return (
			<div style={{paddingLeft: '40px', paddingTop: '75px', paddingBottom: '100px', paddingRight: '40px' }}>
				<h1 style={{paddingBottom: '15px' }}>Request Aid</h1>
				<Form>
					<Form.Group className="mb-3" controlId="dollarsContributed">
						<Form.Label>Amount Requested</Form.Label>
						<Form.Control type="number" min="0.01" step="0.01" max="500000" placeholder="USD" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="message" style={{paddingTop: '8px', paddingBottom: '30px'}}>
						<Form.Label>Your Message</Form.Label>
						<Form.Control type="text" placeholder="Tell the community about your situation and need for funding" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit request
					</Button>
				</Form>
			</div>
		);
	}
}