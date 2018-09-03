import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../redux/actions/auth';
import UserNamePhoto from './UserNamePhoto';

class Header extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <header>
        <div className="header-height"></div>
        <div className="header">
          <div className="header__logo">
            <Link to="/dashboard">
              <img src="/images/SnipCode-logo.png" alt="SnipCode Logo" />
            </Link>
          </div>
            { !!this.props.auth.uid ? (
              <div className="header__authentication">
                {/* <Link to="/addsnip" className="header__authentication__button header__authentication__button--login">Create Snip</Link> */}
                {/* <button onClick={this.props.startLogout} className="header__authentication__button header__authentication__button--login">Log Out</button> */}
                {/* <Link to="/usersetting"> */}
                  <UserNamePhoto
                    userName={this.props.auth.userName}
                    photoURL={this.props.auth.photoURL}
                    currentUser={true}
                    logOut={this.props.startLogout}
                  />
                {/* </Link> */}
              </div>
            ) : (
              <div className="header__authentication">
                <Link to="/" className="header__authentication__button header__authentication__button--login">Log In</Link>
                <Link to="/signup" className="header__authentication__button header__authentication__button--signup">Sign Up</Link>
              </div>
            )}
        </div>
      </header>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
