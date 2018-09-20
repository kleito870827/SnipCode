import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditSnipBox from './EditSnipBox';
import * as currentActions from '../redux/actions/currentSnippet';
import { fbAddSnip } from '../redux/actions/snippets';
import { editError, clearError } from '../redux/actions/error';
import LinkGetTo from './LinkGetTo';
import Snip from './Spin';


class AddSnip extends Component{

  state = {
    loading: false
  }

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

  OnClickAddSnip = () => {
    if(this.props.currentSnippet.title && this.props.currentSnippet.code){
      this.props.fbAddSnip(this.props.currentSnippet);
      this.props.history.push('/dashboard');
    }else{
      this.props.editError('Some required fields are empty.');
    }
  }

  componentWillMount() {
    this.setState({loading: false});
  }

  componentWillUnmount() {
    this.setState({loading: true});
  }

  render(){
    // console.log(this.props.currentSnippet.title);
    return (
      <div>
        {this.state.loading ? <Snip /> : (
          <EditSnipBox
            OnChangeTitle = {this.OnChangeTitle}
            currentTitle = {this.props.currentSnippet.title}
            OnChangePrivacy = {this.OnChangePrivacy}
            currentPrivacy = {this.props.currentSnippet.privacy}
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
        )}

        <LinkGetTo to="/dashboard" icon="fa-arrow-left" />
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
