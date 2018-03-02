/**
 * Npm import
 */
import React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer, style } from 'react-toastify';
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

style({
  colorDefault: '#505F79',
  colorInfo: '#505F79',
  colorSuccess: '#505F79',
  colorWarning: '#505F79',
  colorError: '#505F79',
  mobile: 'only screen and (max-width : 480px)',
  fontFamily: 'sans-serif',
  zIndex: 9999,
  TOP_RIGHT: {
    top: '5em',
    right: '1em',
  },
});

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
