import React, { Component} from 'react';

import HeroImage from './HeroImage';
import InputForm from './InputForm';
import LogInButton from './LogInWithButton';
import { connect } from 'react-redux';
import { startLoginWithGoogle, startLogInWithEmailPassword, fbsendPasswordResetEmail } from '../redux/actions/auth';

class LoginPage extends Component {

    state = {
      email: '',
      password: '',
      forgotEmail: '',
      forgotPassword: false
    }

  OnChangeEmail = (e) => {
    this.setState({email: e.target.value});
  }

  OnChangePassword = (e) => {
    this.setState({password: e.target.value});
  }
  OnChangeForgot = (e) => {
    this.setState({forgotEmail: e.target.value});
  }

  OnClickLogIn = () => {
      this.props.startLogInWithEmailPassword(this.state.email, this.state.password);
  }

  OnClickResetPassword = () => {
      this.props.fbsendPasswordResetEmail(this.state.forgotEmail);
  }

  OnClickForgotPassword = () => {
    this.setState({forgotPassword: !this.state.forgotPassword});
  }

  render(){
    return (
      <div className="logInPage">
        <HeroImage imageUrl="images/background-hero.jpg" title="Log In" />
        <div className="logInPage__body form__body">
          <h2>Login to start code</h2>
          <div className="form">
            {this.state.forgotPassword ? (
              <div className="logInPage__body__forgot">
                <InputForm id="forgot" type="text" name="Email Address" change={this.OnChangeForgot} value={this.state.forgotEmail} placeholder="Email Address" required={true}/>
                <div className="submit-btn">
                  <input id="forgot-btn" onClick={this.OnClickResetPassword} type="button" value="Reset your password" />
                  <p className="error">{this.props.user.authError}</p>
                  <p className="successful">{this.props.user.successful}</p>
                </div>
                <div className="text-center">
                  <span onClick={this.OnClickForgotPassword} className="logInPage__body__btn">Log In</span>
                </div>
              </div>
            ) : (
              <div className="logInPage__body__login">
                <InputForm id="email" type="text" name="Email" change={this.OnChangeEmail} value={this.state.email} placeholder="Email" required={true}/>
                <InputForm id="password" type="password" change={this.OnChangePassword} value={this.state.password} name="Password" placeholder="Passwrod" required={true} />
                <div className="submit-btn">
                  <input id="submit-btn" onClick={this.OnClickLogIn} type="button" value="Log In" />
                  <p className="error">{this.props.user.authError}</p>
                </div>
                <div className="text-center">
                  <span onClick={this.OnClickForgotPassword} className="logInPage__body__btn">I forgot my password</span>
                </div>
              </div>
            )}
          </div>
          <LogInButton startLogin={this.props.startLoginWithGoogle} color="#df4a32" icon="google-plus" name="Login with Google" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
  startLogInWithEmailPassword: (email, password) => dispatch(startLogInWithEmailPassword(email, password)),
  fbsendPasswordResetEmail: value => dispatch(fbsendPasswordResetEmail(value))
})

const mapStateToProps = (state) => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
