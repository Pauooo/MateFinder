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
import Login from 'src/containers/Login';
import SignUp from 'src/containers/SignUp';
import Password from 'src/components/Password';
import MatchingForm from 'src/containers/MatchingForm';
import MatchingSearch from 'src/containers/MatchingSearch';
import NavBar from 'src/containers/NavBar';
import Footer from 'src/components/Footer';
import Mentions from 'src/components/Mentions';
import Contact from 'src/components/Contact';
import Profil from 'src/containers/Profil';
import Chatroom from 'src/containers/Chatroom';

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
        <img src="/img/title.png" alt="title" id="mate-finder-img" />
        <ToastContainer pauseOnHover={false} />
        <main>
          {!loggedIn && <Route
            path="/"
            exact
            component={Login}
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
            path="/profil"
            exact
            component={Profil}
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
          <Route
            path="/chatroom"
            exact
            component={Chatroom}
          />
          <Route
            path="/mentions"
            exact
            component={Mentions}
          />
          <Route
            path="/contact"
            exact
            component={Contact}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

/**
 * Export
 */
export default App;
