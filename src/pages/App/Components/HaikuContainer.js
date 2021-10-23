import React, { Component } from 'react';
import Haiku from './Haiku';


export default class Me extends Component {
    constructor(props) {
		super(props);
		this.state = {haikus: []};
	}

    componentDidMount() {
		let currentComponent = this;
        const requestOptions = {
            method: "GET",
            headers: {
              'content-type': "application/json",
              'token': localStorage.getItem("access_token"),
              'username': localStorage.getItem("username")
            }
        }
		fetch('/api/me', requestOptions)
			.then(
				function(response) {
				if (response.status !== 200) {
					console.log(`Looks like there was a problem. Status Code: ${response.status}`);
					return;
				}

				response.json().then(function(data) {
					currentComponent.setState({haikus: data});
				});
			}
		)
		.catch(function(err) {
			console.log('Fetch Error :-S', err);
		});
		console.log('Fetch to get users has been attempted.');
    }

	render() {
		return (
            <div>
				{this.state.haikus.map((haiku) => (
					<Haiku key={haiku._id} haiku={haiku.haiku} createdAt={haiku.createdAt} />
				))}
			</div>
		);
	}
}