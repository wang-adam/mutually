import React, { Component } from 'react';
import VoteRequest from './VoteRequest';


export default class VoteRequestContainer extends Component {
    constructor(props) {
		super(props);
		this.state = {voteRequests: []};
	}

    componentDidMount() {
		let url = 'http://127.0.0.1:8000/requests';
		fetch(url + '?active=True').then(response => {
			if (response.status !== 404) {
                this.setState({voteRequests: response.json()});
			}
		});
    }

	render() {
		return (
            <div>
				{this.state.voteRequests.map((voteRequest) => (
					<VoteRequest amount={voteRequest["amount"]} description={voteRequest["message"]} />
				))}
			</div>
		);
	}
}