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
    matchingLoading: PropTypes.bool.isRequired,
    selectsMatching: PropTypes.object.isRequired,
    listnews: PropTypes.array.isRequired,
    inRoom: PropTypes.bool.isRequired,
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
        this.setState({
          streams: [...resp.data.streams],
          contentLoading: true,
        });
      });
  }

  render() {
    const {
      matchingLoading,
      selectsMatching,
      listnews,
      inRoom,
    } = this.props;
    if (!matchingLoading && !inRoom) {
      return (
        <Redirect to="/" />
      );
    }
    if (inRoom) {
      return (
        <Redirect to="/chatroom" />
      );
    }
    else if (!this.state.contentLoading || listnews === []) {
      return (
        <p>Chargement</p>
      );
    }
    return (
      <div id="content">
        <div className="search-text">
          <div className="cssload-bell2">
            <div className="cssload-circle">
              <div className="cssload-inner" />
            </div>
            <div className="cssload-circle">
              <div className="cssload-inner" />
            </div>
            <div className="cssload-circle">
              <div className="cssload-inner" />
            </div>
            <div className="cssload-circle">
              <div className="cssload-inner" />
            </div>
            <div className="cssload-circle">
              <div className="cssload-inner" />
            </div>
          </div>
          <p className="searchinprogress">Recherche en cours</p>
          <p><span id="infoqueue">Tu es actuellement dans la file</span> pour jouer à <span id="game">{selectsMatching.game}</span>.</p>
          <p>Voici du contenu qui te plaira sans doute !</p>
        </div>
        <h1>Streaming</h1>
        <div id="streamspanel" >
          {this.state.streams.map(stream => (
            <div key={stream.channel.display_name} className="stream">
              <h3>TWITCH - {stream.channel.display_name}</h3>
              <a target="_blank" href={stream.channel.url}>
                <img src={stream.preview.medium} alt="" />
              </a>
            </div>
          ))}
        </div>
        <h1>Actu</h1>
        <div id="actupanel" >
          {listnews.map(news => (
            <div key={news.id} className="articles">
              <img src={news.image} alt="" />
              <div className="content">
                <h3>{news.title}</h3>
                <p className="extract">{`${news.summary.substring(0, 250)}...`}</p>
                <a target="_blank" className="text-yellow" href={news.url}>
                  En savoir plus
                </a>
              </div>
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
