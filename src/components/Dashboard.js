import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SnipBox from './SnipBox';
import selectSnippet from '../selectors/snippets';
import FilterSnip from './FilterSnip';


class Dashboard extends React.Component {
  constructor () {
    super();
    this.state = {
      menuLeft: '0',
      snippetsMargin: '300px'
    }
  }
  OnClickToggleMenu = () => {
    this.state.menuLeft === '0' ? this.setState({menuLeft: '-300px', snippetsMargin: '0'}) : this.setState({menuLeft: '0', snippetsMargin: '300px'});
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
            return (
              <div key={snip.id}>
                <SnipBox id={snip.id} title={snip.title} code={snip.code} date={snip.date} category={snip.category} language={snip.language} privacy={snip.privacy} />
              </div>
            )
          })}
        </div>
        <div className="dashboard__addsnip">
          <Link to="/addsnip" className="dashboard__addsnip__btn"><i className="fa fa-plus" aria-hidden="true"></i></Link>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    snippet: selectSnippet(state.snippets.snippetArray, state.filters)
  }
}

export default connect(mapStateToProps)(Dashboard);
