import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Dashboard extends React.Component {
  render(){
    return(
      <div>
        <h1>caleo</h1>
        {this.props.snippet.map((snip) => {
          return (
              <div key={snip.id}>
                <Link to={`edit/${snip.id}`}>{snip.title}</Link>
              </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    snippet: state.snippets.snippetArray
  }
}

export default connect(mapStateToProps)(Dashboard);
