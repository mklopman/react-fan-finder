import React, { Component } from 'react';

class Comment extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.renderMessages();
	}
		// <span>{this.props.data.name}: </span>
		// 		</div>
		// 		<div className="user-comment">{this.props.data.message}</div>

	renderMessages(){
		return this.props.messages.map((message, index) => {
			return(
				<div key={index}>
						<p>{message.name}: {message.message}</p>
				</div>
				)
		})
	}

	render() {
		console.log(this.props)
		return (
			<div className="comment-wrap">
				<div className="user-info">
				{this.renderMessages()}
				</div>
			</div>
		)
	}
}

export default Comment; 

