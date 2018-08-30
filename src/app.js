import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import { login, logout } from './redux/actions/auth';
import { fbSetSnip } from './redux/actions/snippets';
import AppRouter, { history } from './routes/AppRouter';
import AppLoading from './components/AppLoading';


import store from './redux/store/store';

import './styles/styles.scss';

const jsx = (
  <div>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </div>
);


let hasRendered = false;
const renderApp = () => {
  if(!hasRendered){
    ReactDOM.render( jsx, document.getElementById('app') );
    hasRendered = true;
  }
}
ReactDOM.render( <AppLoading />, document.getElementById('app') );

store.subscribe(() => console.log(store.getState()));

firebase.auth().onAuthStateChanged((user) => {
  if(user){
    store.dispatch(login(user.uid));
    // console.log('uid', user.uid);
    store.dispatch(fbSetSnip()).then(() => {
      renderApp();
      if(history.location.pathname === '/'){
        history.push('/dashboard');
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }else{
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})
