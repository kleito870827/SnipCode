import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import createHistory from 'history/createBrowserHistory';
import { firebase } from './firebase/firebase';
import { login, logout } from './redux/actions/auth';
import AddSnip from './components/AddSnip';
import PrivateRoute from './routes/PrivateRoute';

const history = createHistory();

import store from './redux/store/store';

// components
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';

import './styles/styles.scss';

const jsx = (
  <div>
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={LoginPage} exact={true} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/addsnip" component={AddSnip} />
            <Route path="/signup" component={SignUp} />
          </Switch>
          <Footer />
        </div>
      </Router>
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

store.subscribe(() => console.log(store.getState()));

firebase.auth().onAuthStateChanged((user) => {
  if(user){
    store.dispatch(login(user.uid));
    // console.log('uid', user.uid);
    renderApp();
    if(history.location.pathname === '/'){
      history.push('/dashboard');
    }
  }else{
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})
