/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    formatSelected: PropTypes.string.isRequired,
    gameList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    langList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    formatList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    teamCount: PropTypes.number.isRequired,
    changeMatchingSelect: PropTypes.func.isRequired,
    changeTeamStatus: PropTypes.func.isRequired,
    changeTeamCount: PropTypes.func.isRequired,
  }

  state = {}

  handleSubmit = (evt) => {
    evt.preventDefault();
  }

  handleChange = (evt) => {
    this.props.changeMatchingSelect(evt.target.id, evt.target.value);
  }

  handleTeamCountChange = (evt) => {
    this.props.changeTeamCount(evt.target.value);
  }

  render() {
    const {
      team, gameSelected, langSelected, formatSelected, changeTeamStatus, teamCount, gameList, langList, formatList,
    } = this.props;
    return (
      <form id="matchingform" onSubmit={this.handleSubmit}>

        <div id="labelswitch">
          <p className="label">Tu es :</p>
          <div className="switch">
            <span className={classNames({ nochoice: team })}>Seul</span>
            <input type="checkbox" id="switch" defaultChecked={team} onChange={changeTeamStatus} />
            <label htmlFor="switch">Toggle</label>
            <span className={classNames({ nochoice: !team })} id="team">En équipe</span>
          </div>
        </div>

        {(team &&
          <label htmlFor="game">
            <p className="label">Vous êtes :</p>
            <div className="test">
              <select id="game" value={teamCount} onChange={this.handleTeamCountChange}>
                <option value="2">2 joueurs</option>
                <option value="3">3 joueurs</option>
                <option value="4">4 joueurs</option>
                <option value="5">5 joueurs</option>
              </select>
            </div>
          </label>
        )}

        <label htmlFor="game">
          <p className="label">Jeu :</p>
          <div className="test">
            <select id="game" value={gameSelected} onChange={this.handleChange}>
              {gameList.map(game => <option value={game}>{game}</option>)}
            </select>
          </div>
        </label>

        <label htmlFor="lang">
          <p className="label">Langue :</p>
          <div className="test">
            <select id="lang" value={langSelected} onChange={this.handleChange}>
              {langList.map(lang => <option value={lang}>{lang}</option>)}
            </select>
          </div>
        </label>

        <label htmlFor="format">
          <p className="label">Format :</p>
          <div className="test">
            <select id="format" value={formatSelected} onChange={this.handleChange}>
              {formatList.map(format => <option value={format}>{format}</option>)}
            </select>
          </div>
        </label>

        <button>Valider</button>
      </form>
    );
  }
}

/**
 * Export
 */
export default Matching;
