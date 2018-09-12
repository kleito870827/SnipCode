import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import createHistory from 'history/createBrowserHistory';

// components
import Dashboard from '../components/Dashboard';
import LoginPage from '../components/LoginPage';
import SignUp from '../components/SignUp';
import PrivateRoute from './PrivateRoute';
import AddSnip from '../components/AddSnip';
import EditSnip from '../components/EditSnip';
import Setting from '../components/Setting';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/usersetting" component={Setting} />
        <PrivateRoute path="/addsnip" component={AddSnip} />
        <PrivateRoute path="/edit/:id" component={EditSnip} />
        <Route path="/signup" component={SignUp} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
