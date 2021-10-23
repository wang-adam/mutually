import React, {Component} from 'react';
import '../style.css';

export default class AddPersonForm extends Component {
    constructor(props) {
        super(props);
        let initialState = { haiku: "" };
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({haiku: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        var username = localStorage.getItem('username');
        if (username === null) username = 'anonymous';
        let dataBody = {
            'username': username,
            'haiku': this.state.haiku
        };
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(dataBody),
            headers: {'Content-Type': 'application/json'}
        };
        this.setState(() => this.initialState);
        return fetch('/api/haiku/', requestOptions)
            .then(response => response.json())
            .then(data => console.log(`Data: ${data}`))
            .then(location.reload()); // reloads the page
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea name="haikuText" rows="3" cols="90" wrap="hard" maxLength="270" onChange={this.handleInputChange} required></textarea>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}