import React, { Component } from 'react';
import $ from 'jquery';


class PostForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			nameValue: "",
		  titleValue: "", 
		  teamValue: "",
		  eventValue: "",
		  dateValue: "",
		  locationValue: "",
		  contentValue: "",
		  data: []
		};
	}

	handleNameChange(event){
		this.setState({ nameValue: event.target.value });
	}

	handleTitleChange(event){
		this.setState(
			{titleValue: event.target.value}
			);
	}

	handleTeamChange(event){
	this.setState(
			{teamValue: event.target.value}
		);
	}

	handleEventChange(event){
		this.setState(
			{eventValue: event.target.value}
			);
	}

	handleDateChange(event){
		this.setState(
			{dateValue: event.target.value}
			);
	}

	handleLocationChange(event){
		this.setState(
			{locationValue: event.target.value}
			);
	}

	handleContentChange(event){
		this.setState(
			{contentValue: event.target.value}
			);
	}

	formResponse(data){
		this.setState({data: data})
	}

	formSubmit(event){
		event.preventDefault();
		console.log('this is the user', this.props.user)
		// console.log(this.state)
		$.ajax({
		    url: "http://localhost:3000/api/posts",
  			method: 'POST',
		    data: { name: this.state.nameValue,
		    		title: this.state.titleValue,
		    		team: this.state.teamValue,
		    		event: this.state.eventValue,
		    		date: this.state.dateValue,
		    		location: this.state.locationValue,
		    		content: this.state.contentValue,
		    		user_id: this.props.user.id
		    		 }
		}).done((data) => {
		    this.formResponse(data);
		});
	}

	render() {
		return (
			<div className="post-form-wrapper">
				<form onSubmit={this.formSubmit.bind(this)}>
					<label className="label">
						<li className="post-form-list-item">Name:  
						<input id="post-field" type="text" name="name" value={ this.state.nameValue } onChange={ this.handleNameChange.bind(this) }/></li>
								
						<li className="post-form-list-item">Title: 
						<input id="post-field" type="text" name="title" value={ this.state.titleValue } onChange={ this.handleTitleChange.bind(this) }/></li>
								
						<li className="post-form-list-item">Team: 
						<input id="post-field" type="text" name="team" value={ this.state.teamValue } onChange={ this.handleTeamChange.bind(this) }/></li>
								
						<li className="post-form-list-item">Event: 
						<input id="post-field" type="text" name="event" value={ this.state.eventValue } onChange={ this.handleEventChange.bind(this) }/></li>
								
						<li className="post-form-list-item">When: 
						<input placeholder="mm/dd/yyy" id="post-field" type="text" name="date" value={ this.state.dateValue } onChange={ this.handleDateChange.bind(this) }/></li>
								
						<li className="post-form-list-item">Location: 
						<input id="post-field" type="text" name="location" value={ this.state.locationValue } onChange={ this.handleLocationChange.bind(this) }/></li>

						<li className="post-form-list-item">Go On:
						<input id="post-field-description" rows="5" columns="10" type="text" name="content" value={ this.state.contentValue } onChange={ this.handleContentChange.bind(this) }/></li>
					</label>
					<input id="post-form-btn" type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}

export default PostForm;