import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserNamePhoto extends Component{
  constructor(){
    super();

    this.state = {
      dropdownClass: 'close'
    }
  }

  OnClickOpenDropdown = () => {
    const newClass = this.state.dropdownClass === 'close' ? 'open' : 'close';
    this.setState({dropdownClass: newClass});
  }
  render(){
    return (
      <div className="userNamePhoto">
        <div onClick={this.OnClickOpenDropdown} className={`userNamePhoto__userContent ${this.props.currentUser && 'userNamePhoto__currentUser'}`}>
          <p className="userNamePhoto__userContent__userName">{this.props.userName}</p>
          <img className="userNamePhoto__userContent__photoUrl" src={this.props.photoURL} alt={this.props.userName}/>
          {this.props.currentUser && <p className="userNamePhoto__userContent__dropdownIcon"><i className="fa fa-angle-down" aria-hidden="true"></i></p>}
        </div>
        {this.props.currentUser && (
          <div className="userNamePhoto__setting">
            <div className={`userNamePhoto__setting__dropdown userNamePhoto__setting__dropdown--${this.state.dropdownClass}`}>
              <Link className="userNamePhoto__setting__dropdown__btn userNamePhoto__setting__dropdown__btn--user-setting" to="/usersetting">Setting <i className="fa fa-cog" aria-hidden="true"></i></Link>
              <span className="userNamePhoto__setting__dropdown__btn userNamePhoto__setting__dropdown__btn--log-out" onClick={this.props.logOut}>Log Out <i className="fa fa-sign-out" aria-hidden="true"></i></span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserNamePhoto;
