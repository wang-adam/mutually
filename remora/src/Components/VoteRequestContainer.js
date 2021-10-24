import React, { Component } from 'react';
import VoteRequest from './VoteRequest';


export default class VoteRequestContainer extends Component {
    constructor(props) {
		super(props);
		this.state = {voteRequests: []};
	}

    componentDidMount() {
        let currentComponent = this;
		let url = 'http://127.0.0.1:8000/requests';
        let userurl = 'http://127.0.0.1:8000/users/';

		fetch(url + '?active=True').then(response => {
			if (response.status !== 404) {
                response.json().then((data) => {
                    for (var i = 0; i < data.length; i++) {
                        let eachdata = data[i];
                        fetch(userurl + eachdata["user"]).then(response => {
                            response.json().then((data2) => {
                                console.log(data2);
                                console.log(eachdata);
                                eachdata["realname"] = data2["name"];
                            });
                        });
                        data[i] = eachdata;
                        console.log(data[i]);
                    }
                    this.setState({voteRequests: data});
                });
            }
        });
    }

	render() {
		return (
            <div>
				{this.state.voteRequests.map((voteRequest) => (
					<VoteRequest key={voteRequest["user"]} realname={voteRequest["realname"]} amount={voteRequest["amount"]} description={voteRequest["message"]} />
				))}
			</div>
		);
	}
}