import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddSnipBox from './AddSnipBox';
import * as currentActions from '../redux/actions/currentSnippet';
import { fbAddSnip } from '../redux/actions/snippets';
import { editError, clearError } from '../redux/actions/error';


class AddSnip extends Component{
  // constructor(props){
  //   super(props);
  //   this.OnChangeTitle = this.OnChangeTitle.bind(this);
  // }

  componentWillMount (){
    this.props.clearCurrentSnip();
    this.props.clearError();
  }

  OnChangeTitle = (e) => {
    this.props.editCurrentSnipTilte(e.target.value);
  };

  OnChangeCode = (e) => {
    this.props.editCurrentSnipCode(e.target.value);
  };

  OnChangePrivacy = (e) => {
    this.props.editCurrentSnipPrivacy(e.target.checked);
  }

  OnChangeCategory = (e) => {
    this.props.editCurrentSnipCategory(e.target.value);
  }

  OnKeyDownCategory = (e) => {
    e.keyCode === 13 && this.OnClickAddCategoty();
  }

  OnClickAddCategoty = () => {
    const category = this.props.currentSnippet.currentCategory;
    if(category) {
      this.props.addCurrentSnipCategory(category);
      this.props.editCurrentSnipCategory('');
    }else {
      this.props.editError('The category file can not be empty.');
    }
  }

  OnChangeLanguage = (e) => {
    this.props.editCurrentSnipLanguage(e.target.value);
  }

  OnClickRemoveCategory = (index) => {
    this.props.removeCurrentSnipCategory(index);
  }

  // OnKeyDownLanguage = (e) => {
  //   e.keyCode === 13 && this.OnClickAddLanguage();
  // }

  // OnClickAddLanguage = () => {
  //   const language = this.props.currentSnippet.currentLanguage;
  //   if(language) {
  //     this.props.addCurrentSnipLanguage(language);
  //     this.props.editCurrentSnipLanguage('');
  //   }else {
  //     console.log('language not add');
  //   }
  // }

  OnClickAddSnip = () => {
    if(this.props.currentSnippet.title && this.props.currentSnippet.code){
      this.props.fbAddSnip(this.props.currentSnippet);
      this.props.history.push('/dashboard');
    }else{
      this.props.editError('Some required fields are empty.');
    }
  }

  render(){
    // console.log(this.props.currentSnippet.title);
    return (
      <div>
        <AddSnipBox
          OnChangeTitle = {this.OnChangeTitle}
          currentTitle = {this.props.currentSnippet.title}
          OnChangeCode = {this.OnChangeCode}
          currentCode = {this.props.currentSnippet.code}
          OnChangeLanguage = {this.OnChangeLanguage}
          currentLanguage = {this.props.currentSnippet.currentLanguage}
          OnKeyDownCategory = {this.OnKeyDownCategory}
          OnChangeCategory = {this.OnChangeCategory}
          OnClickAddCategoty = {this.OnClickAddCategoty}
          OnClickRemoveCategory = {this.OnClickRemoveCategory}
          currentCategory = {this.props.currentSnippet.currentCategory}
          category = {this.props.currentSnippet.category}
          OnClickAddSnip = {this.OnClickAddSnip}
          error = {this.props.error}
         />

        {/* <InputForm id="title" name="Title" type="text" change={this.OnChangeTitle} value={this.props.currentSnippet.title} required />
        <label htmlFor="code">Code</label>
        <textarea id="code" onChange={this.OnChangeCode} value={this.props.currentSnippet.code}></textarea>
        <InputForm id="private" name="Private" change={this.OnChangePrivacy} type="checkbox" value={this.props.currentSnippet.privacy} check={this.props.currentSnippet.privacy} />
        <InputForm id="category" keyDown={this.OnKeyDownCategory} name="Category" type="text" change={this.OnChangeCategory} value={this.props.currentSnippet.currentCategory} />
        <input type="submit" onClick={this.OnClickAddCategoty} value="add category"/>
        <InputForm id="language" name="Language" type="text" change={this.OnChangeLanguage} value={this.props.currentSnippet.currentLanguage} />
        <input type="submit" onClick={this.OnClickAddLanguage} value="add language"/>
        <input type="submit" onClick={this.OnClickAddSnip} value="add New Snippet" /> */}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    currentSnippet: state.current,
    error: state.error.error
  }
}

const mapDispatchToProps = dispatch => ({
  editCurrentSnipTilte: value => dispatch(currentActions.editCurrentSnipTilte(value)),
  editCurrentSnipCode: value => dispatch(currentActions.editCurrentSnipCode(value)),
  editCurrentSnipPrivacy: value => dispatch(currentActions.editCurrentSnipPrivacy(value)),
  editCurrentSnipCategory: value => dispatch(currentActions.editCurrentSnipCategory(value)),
  addCurrentSnipCategory: value => dispatch(currentActions.addCurrentSnipCategory(value)),
  removeCurrentSnipCategory: value => dispatch(currentActions.removeCurrentSnipCategory(value)),
  editCurrentSnipLanguage: value => dispatch(currentActions.editCurrentSnipLanguage(value)),
  // addCurrentSnipLanguage: value => dispatch(currentActions.addCurrentSnipLanguage(value)),
  fbAddSnip: value => dispatch(fbAddSnip(value)),
  clearCurrentSnip: value => dispatch(currentActions.clearCurrentSnip(value)),
  editError: value => dispatch(editError(value)),
  clearError: () => dispatch(clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSnip);
