import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import database, { firebase } from './firebase/firebase';
import { login, logout } from './redux/actions/auth';
import { fbSetSnip } from './redux/actions/snippets';
import AppRouter, { history } from './routes/AppRouter';
import AppLoading from './components/AppLoading';
/* yarn run build:run */
/* yarn start */


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

// console.log(process.env.DATA_BASE_URL);
store.subscribe(() => console.log(store.getState()));


firebase.auth().onAuthStateChanged((user) => {
  if(user){
    if(!user.displayName){
      // console.log("not user name ", user.displayName);
      // console.log(store.getState().auth.userName);
      const userName = store.getState().auth.userName ? store.getState().auth.userName : 'Anonymous';
      const photoURL = user.photoURL ? user.photoURL : '/images/no_user.jpg';
      database.ref(`user/${user.uid}/userSetting`).once('value').then((snap) => {
        if(!snap.val()){
          const createUser = {
            userName,
            photoURL
          }
          database.ref(`user/${user.uid}/userSetting`).update(createUser)
        }
      }).then(() => {
        store.dispatch(login(user.uid, userName, photoURL));
      }).then(() => {
        store.dispatch(fbSetSnip(), store).then(() => {
          renderApp();
          // console.log(store.getState().snippets.snippetArray.length);
          if(history.location.pathname === '/' || history.location.pathname === '/signup'){
            history.push('/dashboard');
          }else{
            history.push(history.location.pathname);
          }
            // history.location.pathname === '/'
        })
        .catch((err) => {
          console.log(err);
        })
      })
    }else{
      // console.log("si user name ", user.displayName);
      const wihtphotoURL = user.photoURL ? user.photoURL : '/images/no_user.jpg';
      database.ref(`user/${user.uid}/userSetting`).once('value').then((snap) => {
        if(!snap.val()){
          const createUser = {
            userName: user.displayName,
            photoURL: wihtphotoURL
          }
          database.ref(`user/${user.uid}/userSetting`).update(createUser)
        }else{
          const createUser = {
            userName: user.displayName,
            photoURL: wihtphotoURL
          }
          database.ref(`user/${user.uid}/userSetting`).update(createUser)
        }
      }).then(() => {
        store.dispatch(login(user.uid, user.displayName, wihtphotoURL));
      }).then(() => {
        store.dispatch(fbSetSnip(), store).then(() => {
          renderApp();
          // console.log(store.getState().snippets.snippetArray.length);
          if(history.location.pathname === '/' || history.location.pathname === '/signup'){
            history.push('/dashboard');
          }else{
            history.push(history.location.pathname);
          }
            // history.location.pathname === '/'
        })
        .catch((err) => {
          console.log(err);
        })
      })
    }

  }else{
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})
