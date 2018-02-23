/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Redirect } from 'react-router';

/**
 * Local import
 */

/**
 * Code
 */
class Matching extends React.Component {
  static propTypes = {
    team: PropTypes.bool.isRequired,
    gameSelected: PropTypes.string.isRequired,
    langSelected: PropTypes.string.isRequired,
    formatSelected: PropTypes.number.isRequired,
    gameList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    langList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    teamCount: PropTypes.number.isRequired,
    changeMatchingSelect: PropTypes.func.isRequired,
    changeTeamStatus: PropTypes.func.isRequired,
    changeTeamCount: PropTypes.func.isRequired,
    startMatch: PropTypes.func.isRequired,
    matchingLoading: PropTypes.bool.isRequired,
  }

  state = {}

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.startMatch();
    console.log('Submit du match');
  }

  handleChange = (evt) => {
    this.props.changeMatchingSelect(evt.target.id, evt.target.value);
  }

  handleTeamCountChange = (evt) => {
    this.props.changeTeamCount(evt.target.value);
  }

  render() {
    const {
      team,
      gameSelected,
      langSelected,
      formatSelected,
      changeTeamStatus,
      teamCount,
      gameList,
      langList,
      matchingLoading,
    } = this.props;
    const { formats, playerMax } = gameList.filter(game => game.name === gameSelected)[0];
    const GameTeamCount = [];
    for (let i = 2; i < playerMax; i += 1) {
      GameTeamCount.push(<option key={i} value={i}>{i} joueurs</option>);
    }
    if (matchingLoading) {
      return (
        <Redirect to="/loading" />
      );
    }
    return (
      <form id="matchingform" onSubmit={this.handleSubmit}>

        <div id="labelswitch">
          <div className="switch">
            <span className={classNames({ nochoice: team })}>SOLO</span>
            <input type="checkbox" id="switch" defaultChecked={team} onChange={changeTeamStatus} />
            <label htmlFor="switch" />
            <span className={classNames({ nochoice: !team })} id="team">TEAM</span>
          </div>
        </div>

        {(team &&
          <label htmlFor="game">
            <p className="label">Nous sommes</p>
            <div className="test">
              <select id="game" value={teamCount} onChange={this.handleTeamCountChange}>
                {GameTeamCount}
              </select>
            </div>
          </label>
        )}

        <label htmlFor="game">
          <p className="label">{(team && 'Nous jouons à')}{(!team && 'Je veux jouer à')}</p>
          <div className="test">
            <select id="game" value={gameSelected} onChange={this.handleChange}>
              {gameList.map(game => <option key={game.name} value={game.name}>{game.name}</option>)}
            </select>
          </div>
        </label>

        <label htmlFor="lang">
          <p className="label">En</p>
          <div className="test">
            <select id="lang" value={langSelected} onChange={this.handleChange}>
              {langList.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
        </label>

        <label htmlFor="format">
          <p className="label">Dans ce format</p>
          <div className="test">
            <select id="format" value={formatSelected} onChange={this.handleChange}>
              {formats.map((format, index) => <option key={index} value={format.value}>{format.name}</option>)}
            </select>
          </div>
        </label>

        <button>
          BOOM!
          <i className="fas fa-bomb" />
        </button>
      </form>
    );
  }
}

/**
 * Export
 */
export default Matching;
