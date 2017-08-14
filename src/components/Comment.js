import React, { Component } from 'react';

class Comment extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props)
		return (
			<div className="comment-wrap">
				<div className="user-info">
					<span>{this.props.data.name}</span>
				</div>
				<div className="user-comment">The message should appear just here: {this.props.data.message}</div>
			</div>
		)
	}
}

export default Comment; 

