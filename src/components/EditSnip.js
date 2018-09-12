import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as currentActions from '../redux/actions/currentSnippet';
import { fbRemoveSnip, fbEditSnip } from '../redux/actions/snippets';
import Modal from 'react-modal';

import InputForm from './InputForm';
import EditSnipBox from './EditSnipBox';
import LinkGetTo from './LinkGetTo';

Modal.setAppElement('#app');

class EditSnip extends Component {
  constructor () {
    super();

    this.state = {
      modalIsOpen: false
    }
  }

  componentDidMount() {
    this.props.clearCurrentSnip();
    const currentSnip = this.props.snippets.filter(({id}) => {
      return id === this.props.match.params.id
    });
    // console.log(currentSnip[0]);
    this.props.setCurrentSnip(currentSnip[0]);
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
      console.log('category not add');
    }
  }
  OnClickRemoveCategory = (index) => {
    this.props.removeCurrentSnipCategory(index);
  }

  OnChangeLanguage = (e) => {
    this.props.editCurrentSnipLanguage(e.target.value);
  }


  OnClickRemoveSnip = () => {
    // console.log(this.props.match.params.id);
    this.props.fbRemoveSnip(this.props.match.params.id);
    this.props.history.push('/dashboard');
  }
  OnClickOpenModalRemove = () => {
    this.setState({modalIsOpen: true});
  }

  OnClickCloseModalRemove = () => {
    this.setState({modalIsOpen: false});
  }

  OnClickEditSnip = () => {
    this.props.fbEditSnip(this.props.match.params.id, this.props.currentSnippet);
    this.props.history.push('/dashboard');
  }


  render(){
    // console.log(this.props.currentSnippet.language.length);
    return (
        <div>
          <EditSnipBox
            type = 'edit'
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
            OnClickEditSnip = {this.OnClickEditSnip}
            // OnClickRemoveSnip = {this.OnClickRemoveSnip}
            OnClickOpenModalRemove = {this.OnClickOpenModalRemove}
            error = {this.props.error}
          />
          <Modal
            isOpen = {this.state.modalIsOpen}
            onRequestClose = {this.OnClickCloseModalRemove}
            className="Modal"
            overlayClassName="Overlay"
            aria={{
              labelledby: "Remove",
              describedby: "Remove Current Snippet"
            }}>
            <div className="Modal__content">
              <h2>{this.props.currentSnippet.title}</h2>
              <p>Are you sure you want to permanently remove this item?</p>
              <button className="Modal__content--no" onClick={this.OnClickCloseModalRemove}>No</button>
              <button className="Modal__content--yes" onClick={this.OnClickRemoveSnip}>Yes</button>
            </div>
          </Modal>

          <LinkGetTo to="/dashboard" icon="fa-arrow-left" />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    snippets: state.snippets.snippetArray,
    currentSnippet: state.current
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentSnip: value => dispatch(currentActions.setCurrentSnip(value)),
  editCurrentSnipTilte: value => dispatch(currentActions.editCurrentSnipTilte(value)),
  editCurrentSnipCode: value => dispatch(currentActions.editCurrentSnipCode(value)),
  editCurrentSnipPrivacy: value => dispatch(currentActions.editCurrentSnipPrivacy(value)),
  editCurrentSnipCategory: value => dispatch(currentActions.editCurrentSnipCategory(value)),
  addCurrentSnipCategory: value => dispatch(currentActions.addCurrentSnipCategory(value)),
  removeCurrentSnipCategory: value => dispatch(currentActions.removeCurrentSnipCategory(value)),
  editCurrentSnipLanguage: value => dispatch(currentActions.editCurrentSnipLanguage(value)),
  // addCurrentSnipLanguage: value => dispatch(currentActions.addCurrentSnipLanguage(value)),
  clearCurrentSnip: value => dispatch(currentActions.clearCurrentSnip(value)),
  fbRemoveSnip: value => dispatch(fbRemoveSnip(value)),
  fbEditSnip: (id, value) => dispatch(fbEditSnip(id, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditSnip);
