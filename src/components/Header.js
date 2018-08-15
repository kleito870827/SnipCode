import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../redux/actions/auth';

class Header extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <header>
        <div className="header">
          <div className="header__logo">
            <Link to="/dashboard">
              <img src="images/SnipCode-logo.png" alt="SnipCode Logo" />
            </Link>
          </div>
            { this.props.isAuthenticated ? (
              <div className="header__authentication">
                <Link to="/addsnip" className="header__authentication__button header__authentication__button--login">Create Snip</Link>
                <button onClick={this.props.startLogout} className="header__authentication__button header__authentication__button--login">Log Out</button>
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
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
