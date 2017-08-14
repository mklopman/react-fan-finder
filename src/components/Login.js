import React, { Component } from 'react';
import axios from 'axios';

// login component
// this will render when the user auth mode is set to login
class Login extends Component {
  constructor(props){
    super(props);
    //console.log(props)
    this.state = {
      // we have 2 inputs that we will be changing
      inputs: {
        email: '',
        password: ''
      }
    }
  }

  // method to log in
  login(e){
    e.preventDefault(); // prevent default form action
    // send request to make sure the email and password are correct
    axios.post(`http://localhost:3000/api/login`, this.state.inputs)
      .then(res => { // set the user based off of the response
        //console.log(res.data)
        this.props.setUser(res.data);
      })

  }

  // method to change an input
  changeInput(e, input){
    const val = e.target.value;
    this.setState(prev => { // sets the state for that input to the value
      prev.inputs[input] = val;
      return prev;
    });
  }

  render(){
    return(
      <div>
      <h1 className="fan-finder-header">FAN FINDER</h1>
      <div className="login-form">
        <h2 className="login-header">Log In</h2>
        <form className="official-login" onSubmit={this.login.bind(this)}>

          <label className="login-labels" htmlFor='email'>Email</label>
          <input value={this.state.inputs.email}
            id='login-email' name='email' type='email'
            onChange={e => this.changeInput(e, 'email')}
          />

          <label className="login-labels" htmlFor='password'>Password</label>
          <input value={this.state.inputs.password}
            id='login-password' name='password' type='password'
            onChange={e => this.changeInput(e, 'password')}
          />

          <div className="form-buttons">
            <button type="submit" className="login-form-buttons">Login</button>
            <button onClick={this.props.toggleMode} className="login-form-buttons">Sign Up</button>
          </div>

        </form>
      </div>
      </div>
    )
  }
}
export default Login;