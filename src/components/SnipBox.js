import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Highlight from 'react-highlight';

import UserNamePhoto from './UserNamePhoto';


class SnipBox extends Component {
  // console.log(props.category.length);
  OnClickExpand = (e) => {
    // console.log(e.target.previousSibling);
    const elemHeight = window.getComputedStyle(e.target.previousSibling).getPropertyValue("height");
    if(!e.target.parentNode.style.height || e.target.parentNode.style.height === '250px') {
       e.target.parentNode.style.height = elemHeight;
       // console.log(e.target.getElementsByClassName('fa')[0]);
       e.target.getElementsByClassName('fa')[0].classList.remove('fa-plus');
       e.target.getElementsByClassName('fa')[0].classList.add('fa-minus');
    } else{
      e.target.parentNode.style.height = '250px';
      e.target.getElementsByClassName('fa')[0].classList.remove('fa-minus');
      e.target.getElementsByClassName('fa')[0].classList.add('fa-plus');
    }
    // parentNode
  }

  render(){
    return (
      <div className="snip-box">
        <div className="snip-box__header">
          <div className="snip-box__header__title">
            <p><span className="snip-box__strong">Title:</span> {this.props.title}
            {this.props.privacy ? (
              // <p><i className="fa fa-lock" aria-hidden="true"></i></p>
              <span className={`snip-box__header__private snip-box__header__private--private ${!this.props.userEdit ? 'hidden' : ''}`}>Private</span>
            ): (
              <span className={`snip-box__header__private snip-box__header__private--public ${!this.props.userEdit ? 'hidden' : ''}`}>Public</span>
            )}
            </p>
          </div>
          <div className="snip-box__header__edit">
            {this.props.userEdit ? (
              <p><Link to={`edit/${this.props.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link></p>
            ) : (
              <UserNamePhoto userName={this.props.userName} photoURL={this.props.photoURL} currentUser = {false} />
            )}
        </div>
      </div>
        <div className="snip-box__body">
          <div className="snip-box__body__code">
            <Highlight>{this.props.code}</Highlight>
          </div>

          <span onClick={this.OnClickExpand} className="snip-box__body__expand">Expand <i className="fa fa-plus" aria-hidden="true"></i></span>
        </div>
        <div className="snip-box__footer">
          <div className="snip-box__footer__date">
            <p><span className="snip-box__strong">Date:</span> {this.props.date}</p>
          </div>
          <div className="snip-box__footer__language">
            <p><span className="snip-box__strong">Language:</span> {this.props.language}</p>
          </div>
          <div className="snip-box__footer__category">
            <p><span className="snip-box__strong">Categories:</span>
            {this.props.category && this.props.category.map((cat, i) => <span key={i}> {cat}{this.props.category.length - 1 === i ? '' : ','}</span>)}
          </p>
        </div>
      </div>
    </div>
  );
  }
}
export default SnipBox;
