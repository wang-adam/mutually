import React, {Component} from 'react';
import NavBar from '../Components/NavBar';
import { Button, Form } from 'react-bootstrap';

export default class Contribute extends Component {
	render() {
		return (
			<div style={{paddingLeft: '40px', paddingTop: '75px', paddingBottom: '100px', paddingRight: '40px' }}>
				<h1 style={{paddingBottom: '15px' }}>Contribute to a Fund</h1>
				<Form>
					<Form.Group className="mb-3" controlId="dollarsContributed">
						<Form.Label>Amount to Contribute</Form.Label>
						<Form.Control type="number" min="0.01" step="0.01" max="500000" placeholder="USD" />
						<Form.Text className="text-muted">
						$1 = 1 vote, $10 = 2 votes, $100 = 3 votes, $1000 = 4 votes, etc.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="message" style={{paddingBottom: '25px'}}>
						<Form.Label>Message</Form.Label>
						<Form.Control type="text" placeholder="Optional" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Proceed to payment
					</Button>
				</Form>
			</div>
		);
	}
}