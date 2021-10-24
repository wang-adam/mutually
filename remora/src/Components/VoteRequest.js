import React, {Component} from 'react';
import { Button, Card } from 'react-bootstrap';

export default class VoteRequest extends Component {


	render() {
		return (
			<div className="voteRequest">
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <p className="realname">Name: {this.props.realname}</p>
                    <p className="amt">Amount: ${this.props.amount}</p>
                    <p className="desc">Description: {this.props.description}</p>
                    <div>
                        <Button variant="primary" size="sm">
                        Approve
                        </Button>{' '}
                        <Button variant="secondary" size="sm">
                        Deny
                        </Button>
                    </div>
                </Card.Body>
                </Card>
			</div>
		);
	}
}
