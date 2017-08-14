import React, { Component } from 'react';

import Login from './Login';
import Signup from './Signup';

class UserAuth extends Component {
  constructor(props){
    super(props);
    //console.log(this.props)
    this.state = {
      mode: 'login' 
    }
  }

  toggleMode(e){ 
    e.preventDefault();
    this.setState(prev => { 
      prev.mode = prev.mode === "login" ? 'signup' : 'login';
      return prev
    })
  }

  render(){
    return this.state.mode === "login" ? (
      <Login setUser={this.props.setUser} {...this.props} toggleMode={this.toggleMode.bind(this)} />
    ) : (
      <Signup {...this.props} toggleMode={this.toggleMode.bind(this)} />
    )
  }
}
export default UserAuth;