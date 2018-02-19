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
    game: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
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
      team, game, lang, format, changeTeamStatus, teamCount,
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
            <select id="game" value={game} onChange={this.handleChange}>
              <option value="test">test</option>
              <option value="test2">test2</option>
              <option value="test3">test3</option>
              <option value="test4">test4</option>
            </select>
          </div>
        </label>

        <label htmlFor="lang">
          <p className="label">Langue :</p>
          <div className="test">
            <select id="lang" value={lang} onChange={this.handleChange}>
              <option value="test">test</option>
              <option value="test2">test2</option>
              <option value="test3">test3</option>
              <option value="test4">test4</option>
            </select>
          </div>
        </label>

        <label htmlFor="format">
          <p className="label">Format :</p>
          <div className="test">
            <select id="format" value={format} onChange={this.handleChange}>
              <option value="test">test</option>
              <option value="test2">test2</option>
              <option value="test3">test3</option>
              <option value="test4">test4</option>
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
