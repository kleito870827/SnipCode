import React from 'react';

import HeroImage from './HeroImage';
import InputForm from './InputForm';
import LogInButton from './LogInWithButton';
import { connect } from 'react-redux';
import { startLogin } from '../redux/actions/auth';

const LoginPage = ({ startLogin }) => (
  <div className="logInPage">
    <HeroImage imageUrl="images/background-hero.jpg" title="A simple and elegant code snippet manager for developers." />
    <div className="logInPage__body form__body">
      <h2>Login to start code</h2>
      <form className="form">
        <InputForm id="email" type="text" name="Email" placeholder="Email" required={true}/>
        <InputForm id="password" type="password" name="Password" placeholder="Passwrod" required={true} />
        <div className="submit-btn">
          <input id="submit-btn" type="submit" value="Log In" />
        </div>
      </form>
      <LogInButton startLogin={startLogin} color="#df4a32" icon="google-plus" name="Login with Google" />
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage);
