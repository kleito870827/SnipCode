import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputForm from './InputForm';

class AddSnip extends Component{
  constructor(props){
    super(props)
  }

  render(){
    console.log(this.props.currentSnippet);
    return (
      <div>
        <InputForm id="title" name="Title" type="text" value="" required />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    currentSnippet: state.current.currentSnippet
  }
}

export default connect(mapStateToProps)(AddSnip);
