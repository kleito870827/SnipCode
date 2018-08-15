import React from 'react';


const InputForm = (props) => (
  <div className="inputForm">
    <label htmlFor={props.id}>{props.name} {props.required ? <span>*</span> : ''}</label>
    <input id={props.id} type={props.type} name={props.id} value={props.value} required={props.required}/>
  </div>
)

export default InputForm;
