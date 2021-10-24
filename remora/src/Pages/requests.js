import React, {Component} from 'react';
import NavBar from '../Components/NavBar';

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
		// TO DO: fix allllll of this
        let dataBody = {
            'name': this.state.name,
            'desc': this.state.description
        };
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(dataBody),
            headers: { 'Content-Type': 'application/json' }
        };
        this.setState(() => this.initialState);
        return fetch('/api/users/', requestOptions)
            .then(response => response.json())
            .then(data => console.log(`Data: ${data}`))
            // .then(location.replace('/')); reloads the page
    }

	render() {
		return (
			<div>
				<NavBar></NavBar>
				<h1>Make an Aid Request</h1>
				<div className = "requestForm">
					<form onSubmit={this.handleSubmit}>
						<div class="form-group">
							<label htmlFor="dollarsRequested">Aid Requested</label>
							<input name = "dollarsRequested" type="number" min="0.01" step="0.01" max="500000"
							id="dollarsRequested" placeholder="USD" value={this.state.dollarsRequested} onChange={this.handleInputChange} required />
						</div>
						<div class="form-group">
							<label htmlFor="requestDescription">Description</label>
							<textarea name = "description" rows="3" placeholder="Tell the community about your situation and need for funding" value={this.state.description} onChange={this.handleInputChange} required />
						</div>
						<input type="submit" value="Submit"/>
					</form>
				</div>
			</div>
		);
	}
}