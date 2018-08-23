import React, {Component} from 'react';
import { connect } from 'react-redux';
import InputForm from './InputForm';
import * as currentActions from '../redux/actions/currentSnippet';
import { fbRemoveSnip, fbEditSnip } from '../redux/actions/snippets';

class EditSnip extends Component {

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

  OnChangeLanguage = (e) => {
    this.props.editCurrentSnipLanguage(e.target.value);
  }

  OnKeyDownLanguage = (e) => {
    e.keyCode === 13 && this.OnClickAddLanguage();
  }

  OnClickAddLanguage = () => {
    const language = this.props.currentSnippet.currentLanguage;
    if(language) {
      this.props.addCurrentSnipLanguage(language);
      this.props.editCurrentSnipLanguage('');
    }else {
      console.log('language not add');
    }
  }

  OnClickRemoveSnip = () => {
    // console.log(this.props.match.params.id);
    this.props.fbRemoveSnip(this.props.match.params.id);
    this.props.history.push('/dashboard');
  }

  OnClickEditSnip = () => {
    this.props.fbEditSnip(this.props.match.params.id, this.props.currentSnippet);
    this.props.history.push('/dashboard');
  }


  render(){
    // console.log(this.props.currentSnippet.language.length);
    return (
        <div>
          <InputForm id="title" name="Title" type="text" change={this.OnChangeTitle} value={this.props.currentSnippet.title} required />
          <label htmlFor="code">Code</label>
          <textarea id="code" onChange={this.OnChangeCode} value={this.props.currentSnippet.code}></textarea>
          <InputForm id="private" name="Private" change={this.OnChangePrivacy} type="checkbox" value={this.props.currentSnippet.privacy} check={this.props.currentSnippet.privacy} />
          <InputForm id="category" keyDown={this.OnKeyDownCategory} name="Category" type="text" change={this.OnChangeCategory} value={this.props.currentSnippet.currentCategory} />
          <input type="submit" onClick={this.OnClickAddCategoty} value="add category"/>
          {this.props.currentSnippet.category && (
            <ul>
              {this.props.currentSnippet.category.map((e, i) => {
                return <li key={i}>{e}</li>
              })}
            </ul>
          )}
          <InputForm id="language" keyDown={this.OnKeyDownLanguage} name="Language" type="text" change={this.OnChangeLanguage} value={this.props.currentSnippet.currentLanguage} />
          <input type="submit" onClick={this.OnClickAddLanguage} value="add language"/>
          {this.props.currentSnippet.language && (
            <ul>
              {this.props.currentSnippet.language.map((e, i) => {
                return <li key={i}>{e}</li>
              })}
            </ul>
          )}
          <input type="submit" onClick={this.OnClickEditSnip} value="edit Snippet" />
          <button onClick={this.OnClickRemoveSnip}>remove</button>
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
  editCurrentSnipLanguage: value => dispatch(currentActions.editCurrentSnipLanguage(value)),
  addCurrentSnipLanguage: value => dispatch(currentActions.addCurrentSnipLanguage(value)),
  clearCurrentSnip: value => dispatch(currentActions.clearCurrentSnip(value)),
  fbRemoveSnip: value => dispatch(fbRemoveSnip(value)),
  fbEditSnip: (id, value) => dispatch(fbEditSnip(id, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditSnip);
