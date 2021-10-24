import React, {Component} from 'react';

export default class VoteRequest extends Component {
	render() {
		return (
			<div className="voteRequest">
				<p className="content">{this.props.amount} {this.props.message}</p>
                
			</div>
		);
	}
}
