/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Redirect } from 'react-router';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Field from 'src/containers/Field';
import { Manager, Target, Popper, Arrow } from 'react-popper';
import { Picker, Formatizer } from 'formatizer';

/**
 * Local import
 */

/**
 * Code
 */
class Chatroom extends React.Component {
  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    inputMessage: PropTypes.string.isRequired,
    addEmoji: PropTypes.func.isRequired,
  }

  state = {
    timeout: null,
    pickerIsActive: false,
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.inputMessage !== '') {
      this.props.sendMessage();
      if (!this.state.timeout) {
        document.getElementsByClassName('fa-space-shuttle')[0].classList.add('animfusee');
        this.setState({
          timeout: setTimeout(() => {
            document.getElementsByClassName('fa-space-shuttle')[0].classList.remove('animfusee');
            this.setState({
              timeout: null,
            });
          }, 1000),
        });
      }
    }
  }

  handlePicker = () => {
    this.setState({
      pickerIsActive: !this.state.pickerIsActive,
    });
  }

  choiceEmoji = (data) => {
    this.props.addEmoji(data.shortname);
  }

  render() {
    const { messages, users, username } = this.props;
    return (
      <div id="chatroom">
        <div id="chat">
          <div id="messages">
            {messages.map(msg => (
              <div className={classNames('message', { ownermsg: msg.username === username })}>
                <p className="username" >{msg.username}</p>
                <p key={msg._id} className="content"><Formatizer>{msg.message}</Formatizer></p>
              </div>
            ))}
          </div>
          <form id="sendmessage" onSubmit={this.handleSubmit}>
            <Manager>
              <Target>
                <FontAwesomeIcon onClick={this.handlePicker} className="icons" icon="smile" />
              </Target>
              {this.state.pickerIsActive && (
                <Popper placement="top" className="popper" style={{ width: '10em', height: '10em', marginBottom: '.5em' }}>
                  <Picker onChange={data => this.choiceEmoji(data)} />
                  <Arrow className="popper__arrow" />
                </Popper>
              )}
            </Manager>
            <Field context="chatroom" key="inputMessage" name="inputMessage" placeholder="Ecrire un message..." />
            <FontAwesomeIcon onClick={this.handleSubmit} className="icons" icon="space-shuttle" />
          </form>
        </div>
        <div id="users">
          <ul>
            {users.map(user => <li>{user.username}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

/**
 * Export
 */
export default Chatroom;
