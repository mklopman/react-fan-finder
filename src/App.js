import React, { Component } from 'react';
import axios from 'axios';
import Cookies from './helpers/Cookies';
import UserAuth from './components/UserAuth';
import Content from './components/Content';
import Home from './components/Home';
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
// import logo from './logo.svg';
// import './App.css';
// import Posts from './components/Posts';
// import PostForm from './components/PostForm'

//import Login from './components/Login';
//import Signup from './components/Signup';

class App extends Component {
	constructor(props){
    super(props);
    // set up our state.
    this.state = {
      user: null, // default user is no user
      // the app needs to do a request, so there will be a loading time
      // we want to display something else while it does that
      mode: 'loading',
      
      url: 'http://localhost:3000/api',
    }

    this.logout = this.logout.bind(this);
    this.setUser = this.setUser.bind(this);
    this.initUser = this.initUser.bind(this);
    this.UserAuth = this.UserAuth.bind(this);
    this.ContentComponent = this.ContentComponent.bind(this);
  }

  componentDidMount(){
    this.initUser();
  }

 initUser = () => {
    // get the token from the cookie
    const token = Cookies.get('token');

    // if there is a token
    if(token && token !== ''){
      // send a request to our API to validate the user
      axios.get(`${this.state.url}/users/validate`, {
        // include the token as a parameter
        params: {auth_token: token}})
        .then(res => { // the response will be the user
          // set the user in the state, and change the mode to content
          this.setState({user: res.data, mode: 'content'});
        })
        .catch(err => { // if there is an error
          Cookies.set('token', '') // take away the cookie
          // change the state so that there is no user and render the auth
          this.setState({user: false, mode: 'auth'});
        })
    } else { // if there is no token
      // we should render the auth forms
      this.setState({mode: 'auth'});
    }
  }

  // method to set a user
  setUser = (user) => {
    // set a cookie with the user's token
    Cookies.set('token', user.token);
    //console.log(user);
    // set state to have the user and the mode to content
    this.setState({ user, mode: 'content' });

    //console.log(this.state.user)
  }

  // method to log out
  logout = () => {
    // take away the cookie
    Cookies.set('token', '');
    // remove the user and set the mode to auth
    this.setState({ user: null, mode: 'auth' });
  }

  // method that renders the view based on the mode in the state
  renderView(){
    if(this.state.mode === 'loading'){
      return(
        <div className="loading">
          <img src="https://s-media-cache-ak0.pinimg.com/originals/8b/a8/ce/8ba8ce24910d7b2f4c147359a82d50ef.gif"
            alt="loading" />
        </div>
      )
    } else if(this.state.mode === 'auth') {
      return (
        <UserAuth
          setUser={this.setUser.bind(this)}
          url={this.state.url}
        />
      );
    } else {
    	return  ( 
    		<div>
	    		<h1 className="user-name-header">Hi, {this.state.user.name}!</h1>
	    		<button className="logout-button" onClick={this.logout}>Logout</button>
	    		<br/>
	    		<br/>
    		</div>
    	);
    }
  }

  UserAuth = () => {
  	return (
  		<UserAuth 
  			setUser={this.setUser.bind(this)}
  		/>
  	);
  }

  ContentComponent = () => {
  	//console.log(this.state.user);
  	return (
  		<Content
  			mode={this.state.mode}
  			user={this.state.user}
  		/>
  	);
  }

  render() {
    return (
    	<Router>	
      <div className="App">
        { this.renderView() }
        <Navbar mode={this.state.mode} />

      <Route exact path="/" component={Home}/>
      <Route path="/home" render={() => this.ContentComponent()}/>
      <Route path="/login" render={() => this.UserAuth()} />
      <Route path="/signup" component={UserAuth}/>
      </div>
      </Router>
    );
  }
}

export default App;
