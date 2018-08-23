import React from 'react';


const InputForm = (props) => (
  <div className="inputForm">
    <label htmlFor={props.id}>{props.name} {props.required ? <span>*</span> : ''}</label>
    <input id={props.id} type={props.type} onKeyDown={props.keyDown} onChange={props.change} name={props.id} value={props.value} required={props.required} checked={props.value} />
  </div>
)

export default InputForm;
