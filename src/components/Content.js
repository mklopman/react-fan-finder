import React, { Component } from 'react';
import PostForm from './PostForm';
import Posts from './Posts';
// import Post from './Post';

class Content extends Component {
	constructor(props){
		super(props);
	}

  render() {
	  if (this.props.mode === 'content') {
		  return (
		    <div>
	      	<PostForm user={this.props.user} />
	      	<Posts user={this.props.user} />
	      </div>
		   );
		} else {
			return null
		}
	}
}

export default Content;