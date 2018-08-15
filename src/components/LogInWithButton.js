import React from 'react';

const LogInWithButton = (props) => (
  <div className="logInWithButton">
    <button onClick={props.startLogin} style={{background: props.color}}>
      <span className="logInWithButton__icon">
        <i className={`fa fa-${props.icon}`} aria-hidden="true"></i>
      </span>
      <span>{props.name}</span>
    </button>
  </div>
);

export default LogInWithButton;
