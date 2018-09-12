import React from 'react';
import { connect } from 'react-redux';


import SnipBox from './SnipBox';
import selectSnippet from '../selectors/snippets';
import FilterSnip from './FilterSnip';
import LinkGetTo from './LinkGetTo';


class Dashboard extends React.Component {
  constructor () {
    super();
    this.state = {
      menuLeft: window.matchMedia('(max-width: 700px)').matches ? '-300px' : '0',
      snippetsMargin: window.matchMedia('(max-width: 700px)').matches ? '0' : '300px'
    }
  }
  OnClickToggleMenu = () => {
    this.state.menuLeft === '0' ? this.setState({menuLeft: '-300px', snippetsMargin: '0'}) : this.setState({menuLeft: '0', snippetsMargin: '300px'});
  }

  componentDidUpdate(prevProps, prevState) {
    // One possible fix...
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
    // if(window.matchMedia('(max-width: 700px)').matches){
    //     this.setState({menuLeft: '-300px', snippetsMargin: '0'})
    //   } else {
    //     this.setState({menuLeft: '0', snippetsMargin: '300px'})
    //   }
  }

  render(){
    return(
      <div className="dashboard">
        <div style={{left: this.state.menuLeft}} className="dashboard__filter">
            <div onClick={this.OnClickToggleMenu} className={`dashboard__filter__toggle-menu dashboard__filter__toggle-menu--open`}>
              {/* <i className="fa fa-arrow-left" aria-hidden="true"></i> */}
              <i className="fa fa-angle-left" aria-hidden="true"></i>
              {/* <i className="fa fa-chevron-left" aria-hidden="true"></i> */}
            </div>
            <FilterSnip />
        </div>
        <div style={{marginLeft: this.state.snippetsMargin}} className="dashboard__snippets">
          {this.props.snippet.map((snip) => {
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
    user: state.auth.uid
  }
}

export default connect(mapStateToProps)(Dashboard);
