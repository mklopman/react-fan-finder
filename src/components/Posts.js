import React, { Component } from 'react';
import $ from 'jquery';
import Post from './Post'

class Posts extends Component {
	constructor(props) {
		super(props)
		//console.log(props);
		this.state = {
			posts: [],
			showOnePost: ""
		};
	}

	componentDidMount(){
		//console.log("HI FROM COMPONENT DID MOUNT")
		if (!this.state.posts.length) {
			$.get("http://localhost:3000/api/posts")
			.done((data) => {
	        	this.setState(data)
	    	});
		}
	}

	renderSinglePost(id){
		console.log('id :', id)
		$.get(`http://localhost:3000/api/posts/` + id)
		.done((data) => {
			return(
				<Post/>
		    )
		});
	}

	// deletePost(id) {
	// 	$.ajax({
	// 	    url:(`http://localhost:3000/api/posts/` + id),
 //  			method: 'DELETE',
	// }


	render() {
		const posts = this.state.posts.map((post, i) => {
    	return(
	      <div key={i}>
        	<Post
        		name={post.name} 
	          	team={post.team}
	          	content={post.content}  
	          	event={post.event} 
	          	date={post.date} 
	          	title={post.title} 
	          	id={post.id} 
	          	location={post.location}
         		{...this.props}
         	/>
	        
	    	</div>
     	);
    });

		return (
			<div>
			{this.state.showOnePost ? this.renderSinglePost(this.state.showOnePost) : []}
			{this.state.showOnePost ? [] : posts}
			</div>
		);
	}



}

export default Posts; 