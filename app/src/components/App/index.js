/**
 * Npm import
 */
import React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

/**
 * Local import
 */
import Landing from 'src/components/Landing';
import Login from 'src/containers/Login';
import SignUp from 'src/containers/SignUp';
import Password from 'src/components/Password';
import MatchingForm from 'src/containers/MatchingForm';
import MatchingSearch from 'src/containers/MatchingSearch';
import NavBar from 'src/containers/NavBar';
/**
 * Code
 */
class App extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  }
  state = {}
  render() {
    const { loggedIn } = this.props;
    return (
      <div id="app">
        <NavBar />
        <img src="/img/title.png" alt="title" />
        <ToastContainer pauseOnHover={false} />
        {!loggedIn && <Route
          path="/"
          exact
          component={Landing}
        />}
        {loggedIn && <Route
          path="/"
          exact
          component={MatchingForm}
        />}
        <Route
          path="/signup"
          exact
          component={SignUp}
        />
        <Route
          path="/login"
          exact
          component={Login}
        />
        <Route
          path="/password"
          exact
          component={Password}
        />
        <Route
          path="/matching"
          exact
          component={MatchingForm}
        />
        <Route
          path="/loading"
          exact
          component={MatchingSearch}
        />
      </div>
    );
  }
}

/**
 * Export
 */
export default App;
