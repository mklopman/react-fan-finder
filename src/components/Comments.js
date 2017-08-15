import React, { Component } from 'react';
import $ from 'jquery';
import Comment from './Comment'

class Comments extends Component {
	constructor(props) {
		super(props)
		this.state = {
			comments: [],
			showOneComment: ""
		};
	}

	componentDidMount(){
		if (!this.state.comments.length) {
			$.get("http://localhost:3000/api/messages")
			.done((data) => {
				this.setState(data)
	    });
		}
	}

	renderSingleCommentt(id) {
		// console.log('id :', id)
		$.get(`http://localhost:3000/api/messages/` + id)
		.done((data) => {
			return(
				<Comment {...this.props} />
		  )
		});
	}


	render() {
		const comments = this.state.comments.map((comment, i) => {
    	return (
	      <div key={i}>
        	<Comment
        		name={comment.name} 
          	message={comment.message}  
          	id={comment.id} 
         		{...this.props}
         	/>
        </div> 	
     	);
    });

		return (
			<div className="comments-list">
				<Comment {...this.props} />
			</div>
		);
	}



}

export default Comments; 