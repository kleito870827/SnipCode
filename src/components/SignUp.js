import React from 'react';
import HeroImage from './HeroImage';
import InputForm from './InputForm';

const SignUp = () => (
  <div className="signup">
    <HeroImage imageUrl="images/background-hero.jpg" title="A simple and elegant code snippet manager for developers." />

    <div className="signup__body form__body">
      <h2>Create your free account</h2>
      <form className="form">
        <InputForm id="fname" type="text" name="First Name" required={true}/>
        <InputForm id="lname" type="text" name="Last Name" required={true}/>
        <InputForm id="email" type="text" name="Email" required={true}/>
        <InputForm id="password" type="password" name="Password" required={true} />
        <InputForm id="rpassword" type="password" name="Repeater Password" required={true} />
        <div className="submit-btn">
          <input id="submit-btn" type="submit" value="Sign Up" />
        </div>
      </form>

      <div className="authGoogle">
        
      </div>
    </div>
  </div>
);

export default SignUp;
