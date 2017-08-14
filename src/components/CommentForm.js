import React, { Component } from 'react';
import $ from 'jquery';


class CommentForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			nameValue: "",
			messageValue: "",
			// data: []
		};
	}

	handleNameChange(event){
		this.setState({ nameValue: event.target.value });
		this.props.handleCommentNameChange(event.target.value);
	}

	handleMessageChange(event){
		this.setState({messageValue: event.target.value});
		this.props.handleCommentMessageChange(event.target.value);
	}

	formResponse(data){
		console.log('in formResponse on form');
		this.setState({data: data})
		this.props.commentFormResponse(data)
	}



	// formSubmit(event){
	// 	event.preventDefault();
	// 	console.log('this is the user', this.props.user)
	// 	// console.log(this.state)
	// 	$.ajax({
	// 	    url: "http://localhost:3000/api/messages",
 //  			method: 'POST',
	// 	    data: { 
	// 	    	name: this.state.nameValue,
	//     		message: this.state.messageValue,
	//     		user_id: this.props.user.id
	// 	    		 }
	// 	}).done((data) => {
	// 	    this.formResponse(data);
	// 	    this.setState({ commentsToShow: true })
	// 	});
	// }

	render() {
		return (
			<div>
				<form id="comment-form" onSubmit={this.props.commentFormSubmit}>
					<label className="comment-labels">
							Name: 
						<input id="comment-name" type="text" name="name" value={ this.state.nameValue } onChange={ this.handleNameChange.bind(this) }/>
							Say What?  
						<input id="comment-comment" type="field" name="message" value={ this.state.messageValue } onChange={ this.handleMessageChange.bind(this) }/>
					</label>
					<input id="comment-submit" type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}



export default CommentForm;