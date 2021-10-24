import React, {Component} from 'react';
import NavBar from '../Components/NavBar';

export default class Vote extends Component {
	render() {
		return (
			<div>
				<NavBar></NavBar>
				<h1>Vote on Aid Requests</h1>
			</div>
		);
	}
}
