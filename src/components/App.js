import React from 'react';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();


export default class App extends React.Component {
  render(){
    return(
      <div>
        <h1>React - Redux Initial Template</h1>
      </div>
    )
  }
}
