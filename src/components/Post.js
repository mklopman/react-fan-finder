import React, { Component } from 'react';
import CommentForm from './CommentForm';
// import Comments from './Comments';
import Comment from './Comment';
import $ from 'jquery';


class Post extends Component {

	constructor(props) {
		super(props);
		this.state = {
			commentMode : false,
			// commentsToShow: props.commentsToShow || false,
			messages: [],
			commentNameValue: "",
			commentMessageValue: "",
			data: props.data || {}
		}
	}

	componentDidMount() {
		$.get("http://localhost:3000/api/messages")
  		.done((data) => {
  			console.log("in componentDidMount for Post");
  			console.log("this.state.id:", this.state.id);
  			console.log("data:", data);
	        	this.setState({
	        		messages: data.messages.filter(message => message.post_id === this.props.id)
	        	})
	    	});
		}





	

	handleCommentNameChange(name){
		this.setState({ commentNameValue: name });
	}

	handleCommentMessageChange(message){
		this.setState({commentMessageValue: message});
	}

	commentFormResponse(data){
		console.log('data coming back from api', data)
		this.setState({data: data})
	}

	commentFormSubmit(event){
		event.preventDefault();
		// console.log('this is the user', this.props.user)
		$.ajax({
		    url: "http://localhost:3000/api/messages",
  			method: 'POST',
		    data: { 
		    	name: this.state.commentNameValue,
	    		message: this.state.commentMessageValue,
	    		user_id: this.props.user.id,
	    		post_id: this.props.id
		    }
		}).done((data) => {
		    this.setState({ 
		    	commentsToShow: true
		    });
		    this.commentFormResponse({
		    	name: this.state.commentNameValue,
	    		message: this.state.commentMessageValue,
	    		user_id: this.props.user.id,
	    		post_id: this.props.id
		    });
		});
	}

	render() {

		return (
			<div className="post-wrap">
				<a target="_blank" className="sports-bar-link" href="https://sports-bar-app.herokuapp.com/">Find A Sports Bar</a>
					<div className="user-info">
						<span className="post-name">{this.props.name},</span>
						<span className="post-team">{this.props.team}: </span>
						<span className="post-event">{this.props.event}, </span>
						<span className="post-location">{this.props.location}, </span>
						<span className="post-date">{this.props.date}: </span>
					</div>
				<div className="user-post">{this.props.content}</div>
				<div className="comments-section">
				<button className="comment-button" onClick={()=>{this.setState({commentMode: true})}}>Comment</button>
				{ this.state.commentMode ? <CommentForm {...this.props} user={this.props.user} commentFormSubmit={this.commentFormSubmit.bind(this)} handleCommentNameChange={this.handleCommentNameChange.bind(this)} handleCommentMessageChange={this.handleCommentMessageChange.bind(this)}/> : null }
				<Comment messages={this.state.messages} {...this.props} data={this.state.data} />
				</div>
			</div>
		)
	}



}

export default Post; 

