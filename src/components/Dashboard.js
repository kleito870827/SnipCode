import React from 'react';
import { connect } from 'react-redux';

import SnipBox from './SnipBox';
import selectSnippet from '../selectors/snippets';
import FilterSnip from './FilterSnip';


class Dashboard extends React.Component {
  render(){
    return(
      <div className="dashboard">
        <div className="dashboard__filter">
          <FilterSnip />
        </div>
        <div className="dashboard__snippets">
          {this.props.snippet.map((snip) => {
            return (
              <div key={snip.id}>
                <SnipBox id={snip.id} title={snip.title} code={snip.code} date={snip.date} category={snip.category} language={snip.language} privacy={snip.privacy} />
              </div>
            )
          })}
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
