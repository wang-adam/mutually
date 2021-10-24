import React, {Component} from 'react';
import NavBar from '../Components/NavBar';
import VoteRequestContainer from '../Components/VoteRequestContainer';
import VoteRequest from '../Components/VoteRequest';

export default class Vote extends Component {
	render() {
		return (
			<div>
				{/* <NavBar></NavBar> */}
				<h1>Vote on Aid Requests</h1>
				<VoteRequestContainer/>
			</div>
		);
	}
}
