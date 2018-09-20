import React from 'react';
import { connect } from 'react-redux';


import SnipBox from './SnipBox';
import selectSnippet from '../selectors/snippets';
import FilterSnip from './FilterSnip';
import LinkGetTo from './LinkGetTo';
import Spin from './Spin';
import { addSnippetAmount } from '../redux/actions/auth';


class Dashboard extends React.Component {
  state = {
      menuLeft: window.matchMedia('(max-width: 700px)').matches ? '-300px' : '0',
      snippetsMargin: window.matchMedia('(max-width: 700px)').matches ? '0' : '300px',
      loadFinish: false
    }

  OnClickToggleMenu = () => {
    this.state.menuLeft === '0' ? this.setState({menuLeft: '-300px', snippetsMargin: '0'}) : this.setState({menuLeft: '0', snippetsMargin: '300px'});
  }

  componentDidUpdate(prevProps, prevState) {
    // if(this.props.amount == this.props.snippetAmount && !prevState.loadFinish){
    //     this.setState({loadFinish: true});
    // }
    window.matchMedia('(max-width: 700px)').onchange = (e) => {
      if( e.matches ){
        if(this.state.menuLeft === '0' || this.state.snippetsMargin === '300px'){
          this.setState({menuLeft: '-300px', snippetsMargin: '0'})
        }
      } else {
        if(this.state.menuLeft === '-300px' || this.state.snippetsMargin === '0'){
          this.setState({menuLeft: '0', snippetsMargin: '300px'})
        }
      }
    }
  }
  componentWillUnmount(){
      this.props.addSnippetAmount(this.props.amount);
  }

  // componentWillUpdate(nextProps, nextState){
  //   console.log(this.props.amount);
  //   console.log(this.props.snippetAmount);
  //   if(this.props.amount == this.props.snippetAmount && !nextState.loadFinish){
  //       this.setState({loadFinish: true});
  //   }
  // }

  componentDidMount() {
    window.scrollTo(0, 0);
    if(this.props.amount > 0 && this.props.snippetAmount > 0){
      if(this.props.amount === this.props.snippetAmount && !this.state.loadFinish){
        setTimeout(() => {
          this.setState({loadFinish: true});
        }, 100);
      }
    }else{
      this.setState({loadFinish: true});
    }
  }


  render(){
    let snipBoxArray = this.state.loadFinish ? this.props.snippet : this.props.snippet.slice(0, 3);
    return(
      <div className="dashboard">
        <div style={{left: this.state.menuLeft}} className="dashboard__filter">
            <div onClick={this.OnClickToggleMenu} className={`dashboard__filter__toggle-menu dashboard__filter__toggle-menu--open`}>
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </div>
            <FilterSnip />
        </div>
        <div style={{marginLeft: this.state.snippetsMargin}} className="dashboard__snippets">
          {this.props.snippet.length === 0 && <Spin /> }
          {snipBoxArray.map((snip) => {
            let isUser = true;
            if(snip.user && (snip.user !== this.props.user)){
              isUser = false;
            }
            return (
              <div key={snip.id}>
                <SnipBox
                  id = {snip.id}
                  title = {snip.title}
                  code = {snip.code}
                  date = {snip.date}
                  category = {snip.category}
                  language = {snip.language}
                  privacy = {snip.privacy}
                  userEdit = {isUser}
                  userName = {snip.userName}
                  photoURL = {snip.photoURL} />
              </div>
            )
          })}
        </div>
        <LinkGetTo to="/addsnip" icon="fa-plus" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    snippet: selectSnippet(state.snippets.snippetArray, state.filters),
    user: state.auth.uid,
    snippetAmount: state.auth.snippetAmount,
    amount: state.snippets.snippetArray.length
  }
}

const mapDispatchToProps = dispatch => ({
  addSnippetAmount: value => dispatch(addSnippetAmount(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
