import React, { Component} from 'react';

import HeroImage from './HeroImage';
import InputForm from './InputForm';
import LogInButton from './LogInWithButton';
import { connect } from 'react-redux';
import { startLoginWithGoogle, startLogInWithEmailPassword } from '../redux/actions/auth';

class LoginPage extends Component {
  constructor () {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  OnChangeEmail = (e) => {
    this.setState({email: e.target.value});
  }

  OnChangePassword = (e) => {
    this.setState({password: e.target.value});
  }

  OnClickLogIn = () => {
      this.props.startLogInWithEmailPassword(this.state.email, this.state.password);
  }

  render(){
    return (
      <div className="logInPage">
        <HeroImage imageUrl="images/background-hero.jpg" title="Log In" />
        <div className="logInPage__body form__body">
          <h2>Login to start code</h2>
          <form className="form">
            <InputForm id="email" type="text" name="Email" change={this.OnChangeEmail} value={this.state.email} placeholder="Email" required={true}/>
            <InputForm id="password" type="password" change={this.OnChangePassword} value={this.state.password} name="Password" placeholder="Passwrod" required={true} />
            <div className="submit-btn">
              <input id="submit-btn" onClick={this.OnClickLogIn} type="button" value="Log In" />
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
  startLogInWithEmailPassword: (email, password) => dispatch(startLogInWithEmailPassword(email, password))
})

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
