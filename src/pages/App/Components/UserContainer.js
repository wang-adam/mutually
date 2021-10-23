import React, {Component} from 'react';
import '../style.css'
import User from './User'

export default class UserContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {users: []};
	}

	componentDidMount() {
		let currentComponent = this;
		fetch('/api/users/')
			.then(
				function(response) {
				if (response.status !== 200) {
					console.log(`Looks like there was a problem. Status Code: ${response.status}`);
					return;
				}

				response.json().then(function(data) {
					console.log(data);
					currentComponent.setState({users: data});
				});
			}
		)
		.catch(function(err) {
			console.log('Fetch Error :-S', err);
		});
	}

	render() {
		let content;
		if (this.state.users.length > 0) {
			content = 
				<p className="App-intro">
					Here is a list of people:
				</p>;
		} else {
			content = 
				<p className="App-intro">
					There are no people to show yet. Post someone using the form above!
				</p>;
		}
		return (
			<div>
				{content}
				{this.state.users.map((user) => (
					<User key={user._id} name={user.name} desc={user.desc} />
				))}
			</div>
		);
	}
}
