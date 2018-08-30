import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as filterActions from '../redux/actions/filters';

class FilterSnip extends Component {

  OnChangeKeyword = (e) => {
    this.props.editFilterKeyword(e.target.value);
  }

  OnChangeLanguage = (e) => {
    this.props.editFilterLanguage(e.target.value);
  }

  OnChangeCategory = (e) => {
    this.props.editCurrentFilterCategories(e.target.value);
  }

  OnClickAddCategory = () => {
    const newCategory = this.props.filters.currentCategory;
    if(newCategory){
      this.props.addFilterCategories(newCategory);
      this.props.editCurrentFilterCategories('');
    }else{
      console.log('add category');
    }
  }

  onKeyDownAddCategory = (e) => {
    e.keyCode === 13 && this.OnClickAddCategory();
  }

  OnClickRemoveCategory = (index) => {
    this.props.removeCurrentFilterCategory(index);
  }

  render() {
    return (
      <div className="filterSnip">
        <div className="filterSnip__search">
          <label htmlFor="filter-search">Search</label>
          <input id="filter-search" placeholder="Search..." type="text" onChange={this.OnChangeKeyword} value={this.props.filters.keyword}/>
        </div>
        <div className="filterSnip__language">
          <label htmlFor="filter-language">Languages</label>
          <input id="filter-language" placeholder="Language..." type="text" onChange={this.OnChangeLanguage} value={this.props.filters.language}/>
        </div>
        <div className="filterSnip__category">
          <label htmlFor="filter-category">Categories</label>
          <div className="filterSnip__category__input">
            <input id="filter-category" placeholder="Category..." type="text" onKeyDown={this.onKeyDownAddCategory} onChange={this.OnChangeCategory} value={this.props.filters.currentCategory}/>
            <span onClick={this.OnClickAddCategory} className="filterSnip__category__input__add"><i className="fa fa-plus" aria-hidden="true"></i></span>
          </div>
        </div>
        <div className="filterSnip__category-loop">
          {this.props.filters.category && (
            <ul className="filterSnip__category-loop__ul">
              {this.props.filters.category.map((e, i) => {
                return <li key={i}><div><span>{e}</span><span onClick={() => this.OnClickRemoveCategory(i)}><i className="fa fa-trash-o" aria-hidden="true"></i></span></div></li>
              })}
            </ul>
          )}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

const mapDispatchToProps = (dispatch) => ({
  editFilterKeyword: value => dispatch(filterActions.editFilterKeyword(value)),
  editFilterLanguage: value => dispatch(filterActions.editFilterLanguage(value)),
  editCurrentFilterCategories: value => dispatch(filterActions.editCurrentFilterCategories(value)),
  addFilterCategories: value => dispatch(filterActions.addFilterCategories(value)),
  removeCurrentFilterCategory: value => dispatch(filterActions.removeCurrentFilterCategory(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterSnip);
