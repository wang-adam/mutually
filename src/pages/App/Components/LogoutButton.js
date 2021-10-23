import React, {Component} from 'react';

export default class LogoutButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        localStorage.clear();
        location.replace('/');
    }

    render() {
        return(
            <button onClick={this.onClick}>Log Out</button>
        );
    }
}