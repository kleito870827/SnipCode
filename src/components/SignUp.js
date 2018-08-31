import React, { Component} from 'react';
import {connect} from 'react-redux';

import HeroImage from './HeroImage';
import InputForm from './InputForm';
import LogInButton from './LogInWithButton';
import { startSignUpWithEmailPassword } from '../redux/actions/auth';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      Rpassword: '',
      error: ''
    }
  }

  OnChangeEmail = (e) => {
    this.setState({email: e.target.value});
  }

  OnChangePassword = (e) => {
    this.setState({password: e.target.value});
  }

  OnChangeRpassword = (e) => {
    this.setState({Rpassword: e.target.value});
  }
  OnClickSignUp = () => {
    if(this.state.password === this.state.Rpassword){
      this.props.startSignUpWithEmailPassword(this.state.email, this.state.password);
      this.setState({error: ''});
    }else{
      this.setState({error: 'Password does not match the confirm password.'});
    }
  }

  OnKeyUpRpassword = (e) => {
    if(this.state.password === this.state.Rpassword){
      e.target.classList.remove('inputForm__match');
    }else{
      e.target.classList.add('inputForm__match');
    }
  }
    render(){
      return (
        <div className="signup">
          <HeroImage imageUrl="images/background-hero.jpg" title="sing up" />

          <div className="signup__body form__body">
            <h2>Create your account</h2>
            <form className="form">
              {/* <InputForm id="userName" type="text" name="User Name" required={true}/> */}
              {/* <InputForm id="lname" type="text" name="Last Name" required={true}/> */}
              <InputForm id="email" type="text" change={this.OnChangeEmail} value={this.state.email} name="Email" required={true}/>
              <InputForm id="password" type="password" change={this.OnChangePassword} value={this.state.password} name="Password" required={true} />
              <InputForm id="rpassword" type="password" keyUp={this.OnKeyUpRpassword} change={this.OnChangeRpassword} value={this.state.Rpassword} name="Repeater Password" required={true} />
              <p className="error">{this.state.error}</p>
              <div className="submit-btn">
                <input onClick={this.OnClickSignUp} id="submit-btn" type="button" value="Sign Up" />
                <p className="error">{this.props.authError}</p>
              </div>
            </form>
            <LogInButton startLogin={this.props.startLoginWithGoogle} color="#df4a32" icon="google-plus" name="Login with Google" />
          </div>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
  startSignUpWithEmailPassword: (email, password) => dispatch(startSignUpWithEmailPassword(email, password)),
});

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
