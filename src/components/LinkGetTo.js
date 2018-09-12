import React from 'react';
import { Link } from 'react-router-dom';

const LinkGetTo = (props) => (
  <div className="linkGetTo">
    <Link to={props.to} className="linkGetTo__btn"><i className={`fa ${props.icon}`}  aria-hidden="true"></i></Link>
  </div>
);

export default LinkGetTo;
