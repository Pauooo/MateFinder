/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import axios from 'axios';
// import classNames from 'classnames';

/**
 * Local import
 */

/**
 * Code
 */

class MatchingSearch extends React.Component {
  static propTypes = {
    // matchingFound: PropTypes.bool.isRequired,
    // matchingAccepted: PropTypes.bool.isRequired,
    // matchAccepted: PropTypes.func.isRequired,
    // matchRefuse: PropTypes.func.isRequired,
    // numberOfAcceptedUsers: PropTypes.number.isRequired,
    // format: PropTypes.number.isRequired,
    matchingLoading: PropTypes.bool.isRequired,
    selectsMatching: PropTypes.object.isRequired,
  }

  state = {
    contentLoading: false,
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: 'https://api.twitch.tv/kraken/streams',
      params: {
        client_id: 'nga9r4bt2wb60jd0v7lh1ujfh7w6kd',
        limit: 3,
        game: this.props.selectsMatching.game,
        language: this.props.selectsMatching.lang,
      },
    })
      .then((resp) => {
        console.log(resp.data.streams);
        this.setState({
          streams: [...resp.data.streams],
          contentLoading: true,
        });
      });

    // axios({
    //   method: 'get',
    //   url: 'https://api-endpoint.igdb.com/games/',
    //   headers: { 'user-key': 'ee3ee465baaf30227734736b02e125e7' },
    // })
    //   .then((resp) => {
    //     console.log(resp);
    //     // this.setState({
    //     //   news: [...resp.data.streams],
    //     //   contentLoading: true,
    //     // });
    //   });

    // const client = igdb('ee3ee465baaf30227734736b02e125e7');
    //
    // client.games({
    //   fields: '*', // Return all fields
    //   limit: 5, // Limit to 5 results
    //   offset: 15, // Index offset for results
    // }).then((response) => {
    //   console.log(response);
    //   // response.body contains the parsed JSON response to this query
    // }).catch((error) => {
    //   throw error;
    // });
  }

  render() {
    const {
      // matchingFound,
      // matchingAccepted,
      // matchAccepted,
      // matchRefuse,
      // numberOfAcceptedUsers,
      // format,
      matchingLoading,
      selectsMatching,
    } = this.props;
    if (!matchingLoading) {
      return (
        <Redirect to="/" />
      );
    }
    else if (!this.state.contentLoading) {
      return (
        <p>Chargement</p>
      );
    }
    // else if (matchingFound) {
    //   return (
    //     <div id="matchingloading" >
    //       <h1>Une partie a été trouvée !</h1>
    //       {(!matchingAccepted &&
    //         <div>
    //           <button onClick={matchAccepted}>Accepter</button>
    //           <button onClick={matchRefuse}>Annuler</button>
    //         </div>
    //       )}
    //       {(matchingAccepted && <h1>{`${numberOfAcceptedUsers}/${format}`}</h1>)}
    //     </div>
    //   );
    // }
    return (
      <div id="content">
        <div>
          <p><span id="infoqueue">Tu es actuellement dans la file</span> pour jouer à <span id="game">{selectsMatching.game}</span></p>
          <p>voici du contenu qui te plaira sans doute !</p>
        </div>
        <h1>Streaming</h1>
        <div id="streamspanel" >
          {this.state.streams.map(stream => (
            <div className="stream">
              <h3>TWITCH - {stream.channel.display_name}</h3>
              <a target="_blank" href={stream.channel.url}>
                <img src={stream.preview.medium} alt="" />
              </a>
            </div>
          ))}
        </div>

      </div>
    );
  }
}

/**
 * Export
 */
export default MatchingSearch;
