import React, {Component} from 'react';
import NavBar from '../Components/NavBar';
import VoteRequestContainer from '../Components/VoteRequestContainer';
import VoteRequest from '../Components/VoteRequest';

export default class Vote extends Component {
	render() {
		return (
			<div style={{ paddingTop: '75px', paddingLeft: '40px', paddingBottom: '100px', margin: 'auto'}}>
				{/* <NavBar></NavBar> */}
				<h1 style={{paddingBottom: '25px'}}>Vote on Aid Requests</h1>
				<VoteRequestContainer/>
			</div>
		);
	}
}